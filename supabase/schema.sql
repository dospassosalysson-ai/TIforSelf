create extension if not exists pgcrypto;

create or replace function public.normalize_student_name(value text)
returns text
language sql
immutable
as $$
  select lower(regexp_replace(trim(coalesce(value, '')), '\s+', ' ', 'g'));
$$;

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  normalized_name text not null,
  cpf_hash text not null,
  class_name text,
  active boolean not null default true,
  unique (normalized_name)
);

create table if not exists public.student_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  token_hash text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '12 hours')
);

create index if not exists student_sessions_token_hash_idx on public.student_sessions(token_hash);
create index if not exists student_sessions_student_id_idx on public.student_sessions(student_id);

create or replace function public.set_student_normalized_name()
returns trigger
language plpgsql
as $$
begin
  new.normalized_name := public.normalize_student_name(new.full_name);
  return new;
end;
$$;

drop trigger if exists students_set_normalized_name on public.students;
create trigger students_set_normalized_name
before insert or update of full_name on public.students
for each row execute function public.set_student_normalized_name();

alter table public.students enable row level security;
alter table public.student_sessions enable row level security;

drop policy if exists "Authenticated users can read students" on public.students;
create policy "Authenticated users can read students"
on public.students
for select
to authenticated
using (true);

create table if not exists public.lesson_attempts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  course_slug text not null default 'curso-ti-basico-bloco-1',
  student_id uuid not null references public.students(id) on delete cascade,
  lesson_id text not null,
  lesson_title text not null,
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions > 0),
  percentage integer not null check (percentage >= 0 and percentage <= 100),
  passed boolean not null default false,
  answers jsonb not null default '{}'::jsonb,
  wrong_items jsonb not null default '[]'::jsonb
);

create table if not exists public.lesson_progress (
  student_id uuid not null references public.students(id) on delete cascade,
  course_slug text not null default 'curso-ti-basico-bloco-1',
  lesson_id text not null,
  lesson_title text not null,
  completed_at timestamptz not null default now(),
  best_score integer not null check (best_score >= 0),
  total_questions integer not null check (total_questions > 0),
  percentage integer not null check (percentage >= 0 and percentage <= 100),
  attempts_count integer not null default 1,
  primary key (student_id, course_slug, lesson_id)
);

alter table public.lesson_attempts enable row level security;
alter table public.lesson_progress enable row level security;

drop policy if exists "Authenticated users can read lesson attempts" on public.lesson_attempts;
create policy "Authenticated users can read lesson attempts"
on public.lesson_attempts
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read lesson progress" on public.lesson_progress;
create policy "Authenticated users can read lesson progress"
on public.lesson_progress
for select
to authenticated
using (true);

create table if not exists public.retention_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  course_slug text not null default 'curso-ti-basico-bloco-1',
  student_id uuid references public.students(id),
  student_name text not null,
  class_name text,
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions > 0),
  correct_count integer not null check (correct_count >= 0),
  wrong_count integer not null check (wrong_count >= 0),
  missing_count integer not null check (missing_count >= 0),
  percentage integer not null check (percentage >= 0 and percentage <= 100),
  answers jsonb not null default '{}'::jsonb,
  review_items jsonb not null default '[]'::jsonb,
  user_agent text,
  page_url text
);

alter table public.retention_submissions
add column if not exists student_id uuid references public.students(id);

alter table public.retention_submissions enable row level security;

drop policy if exists "Public can insert retention submissions" on public.retention_submissions;

drop policy if exists "Authenticated users can read retention submissions" on public.retention_submissions;
create policy "Authenticated users can read retention submissions"
on public.retention_submissions
for select
to authenticated
using (true);

create or replace function public.authenticate_student(p_full_name text, p_cpf text)
returns table (
  student_id uuid,
  full_name text,
  class_name text,
  session_token text,
  session_expires_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  cleaned_cpf text;
  new_token text;
  found_student public.students%rowtype;
begin
  cleaned_cpf := regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g');

  select *
  into found_student
  from public.students s
  where s.active = true
    and s.normalized_name = public.normalize_student_name(p_full_name)
    and s.cpf_hash = crypt(cleaned_cpf, s.cpf_hash)
  limit 1;

  if found_student.id is null then
    return;
  end if;

  new_token := gen_random_uuid()::text || replace(gen_random_uuid()::text, '-', '');

  insert into public.student_sessions (student_id, token_hash)
  values (found_student.id, encode(digest(new_token, 'sha256'), 'hex'))
  returning expires_at into session_expires_at;

  student_id := found_student.id;
  full_name := found_student.full_name;
  class_name := found_student.class_name;
  session_token := new_token;
  return next;
end;
$$;

grant execute on function public.authenticate_student(text, text) to anon;

create or replace function public.student_from_session(p_session_token text)
returns public.students
language plpgsql
security definer
set search_path = public
as $$
declare
  found_student public.students%rowtype;
begin
  select s.*
  into found_student
  from public.student_sessions ss
  join public.students s on s.id = ss.student_id
  where ss.token_hash = encode(digest(coalesce(p_session_token, ''), 'sha256'), 'hex')
    and ss.expires_at > now()
    and s.active = true
  limit 1;

  return found_student;
end;
$$;

create or replace function public.get_student_progress(p_session_token text)
returns table (
  lesson_id text,
  lesson_title text,
  completed_at timestamptz,
  best_score integer,
  total_questions integer,
  percentage integer,
  attempts_count integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_student public.students%rowtype;
begin
  current_student := public.student_from_session(p_session_token);

  if current_student.id is null then
    return;
  end if;

  return query
  select lp.lesson_id, lp.lesson_title, lp.completed_at, lp.best_score, lp.total_questions, lp.percentage, lp.attempts_count
  from public.lesson_progress lp
  where lp.student_id = current_student.id
    and lp.course_slug = 'curso-ti-basico-bloco-1'
  order by lp.lesson_id;
end;
$$;

grant execute on function public.get_student_progress(text) to anon;

create or replace function public.submit_lesson_attempt(
  p_session_token text,
  p_lesson_id text,
  p_lesson_title text,
  p_score integer,
  p_total_questions integer,
  p_answers jsonb,
  p_wrong_items jsonb
)
returns table (
  passed boolean,
  percentage integer,
  completed_lessons integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_student public.students%rowtype;
  computed_percentage integer;
  did_pass boolean;
begin
  current_student := public.student_from_session(p_session_token);

  if current_student.id is null then
    raise exception 'Sessao do aluno invalida ou expirada.';
  end if;

  if p_total_questions <= 0 then
    raise exception 'Total de perguntas invalido.';
  end if;

  computed_percentage := round((p_score::numeric / p_total_questions::numeric) * 100);
  did_pass := p_score = p_total_questions;

  insert into public.lesson_attempts (
    course_slug, student_id, lesson_id, lesson_title, score, total_questions,
    percentage, passed, answers, wrong_items
  )
  values (
    'curso-ti-basico-bloco-1', current_student.id, p_lesson_id, p_lesson_title,
    p_score, p_total_questions, computed_percentage, did_pass,
    coalesce(p_answers, '{}'::jsonb), coalesce(p_wrong_items, '[]'::jsonb)
  );

  if did_pass then
    insert into public.lesson_progress (
      student_id, course_slug, lesson_id, lesson_title, completed_at,
      best_score, total_questions, percentage, attempts_count
    )
    values (
      current_student.id, 'curso-ti-basico-bloco-1', p_lesson_id, p_lesson_title,
      now(), p_score, p_total_questions, computed_percentage, 1
    )
    on conflict (student_id, course_slug, lesson_id)
    do update set
      completed_at = now(),
      best_score = greatest(public.lesson_progress.best_score, excluded.best_score),
      total_questions = excluded.total_questions,
      percentage = greatest(public.lesson_progress.percentage, excluded.percentage),
      attempts_count = public.lesson_progress.attempts_count + 1;
  end if;

  select count(*)::integer
  into completed_lessons
  from public.lesson_progress lp
  where lp.student_id = current_student.id
    and lp.course_slug = 'curso-ti-basico-bloco-1';

  passed := did_pass;
  percentage := computed_percentage;
  return next;
end;
$$;

grant execute on function public.submit_lesson_attempt(text, text, text, integer, integer, jsonb, jsonb) to anon;

create or replace function public.submit_retention_submission(
  p_session_token text,
  p_score integer,
  p_total_questions integer,
  p_correct_count integer,
  p_wrong_count integer,
  p_missing_count integer,
  p_percentage integer,
  p_answers jsonb,
  p_review_items jsonb,
  p_user_agent text,
  p_page_url text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_student public.students%rowtype;
begin
  current_student := public.student_from_session(p_session_token);

  if current_student.id is null then
    raise exception 'Sessao do aluno invalida ou expirada.';
  end if;

  insert into public.retention_submissions (
    course_slug, student_id, student_name, class_name, score, total_questions,
    correct_count, wrong_count, missing_count, percentage, answers, review_items,
    user_agent, page_url
  )
  values (
    'curso-ti-basico-bloco-1', current_student.id, current_student.full_name, current_student.class_name,
    p_score, p_total_questions, p_correct_count, p_wrong_count, p_missing_count, p_percentage,
    coalesce(p_answers, '{}'::jsonb), coalesce(p_review_items, '[]'::jsonb),
    p_user_agent, p_page_url
  );
end;
$$;

grant execute on function public.submit_retention_submission(text, integer, integer, integer, integer, integer, integer, jsonb, jsonb, text, text) to anon;

create or replace view public.teacher_lesson_difficulty as
select
  lesson_id,
  lesson_title,
  count(*)::integer as attempts,
  round(avg(percentage))::integer as average_percentage,
  round(avg(case when passed then 1 else 0 end) * 100)::integer as pass_rate,
  count(*) filter (where not passed)::integer as failed_attempts
from public.lesson_attempts
group by lesson_id, lesson_title
order by lesson_id;

create or replace view public.teacher_student_summary as
select
  s.id as student_id,
  s.full_name,
  s.class_name,
  count(distinct lp.lesson_id)::integer as completed_lessons,
  coalesce(round(avg(lp.percentage))::integer, 0) as average_lesson_percentage,
  coalesce(max(rs.percentage), 0) as best_retention_percentage,
  max(greatest(coalesce(lp.completed_at, '-infinity'::timestamptz), coalesce(rs.created_at, '-infinity'::timestamptz))) as last_activity
from public.students s
left join public.lesson_progress lp on lp.student_id = s.id
left join public.retention_submissions rs on rs.student_id = s.id
group by s.id, s.full_name, s.class_name
order by s.full_name;

grant select on public.students to authenticated;
grant select on public.lesson_attempts to authenticated;
grant select on public.lesson_progress to authenticated;
grant select on public.retention_submissions to authenticated;
grant select on public.teacher_lesson_difficulty to authenticated;
grant select on public.teacher_student_summary to authenticated;

-- Exemplo para cadastrar o primeiro aluno.
-- Troque NOME COMPLETO DO ALUNO e 00000000000 pelos dados reais antes de executar.
-- O CPF sera salvo como hash, nao como texto puro.
--
-- insert into public.students (full_name, cpf_hash, class_name)
-- values (
--   'NOME COMPLETO DO ALUNO',
--   crypt(regexp_replace('00000000000', '\D', '', 'g'), gen_salt('bf')),
--   'Bloco 1'
-- );
