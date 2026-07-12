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

drop policy if exists "Authenticated users can read students" on public.students;
create policy "Authenticated users can read students"
on public.students
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
create policy "Public can insert retention submissions"
on public.retention_submissions
for insert
to anon
with check (
  course_slug = 'curso-ti-basico-bloco-1'
  and student_id is not null
  and length(trim(student_name)) between 2 and 120
  and total_questions = 15
  and score = correct_count
  and correct_count + wrong_count = total_questions
);

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
  class_name text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  cleaned_cpf text;
begin
  cleaned_cpf := regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g');

  return query
  select s.id, s.full_name, s.class_name
  from public.students s
  where s.active = true
    and s.normalized_name = public.normalize_student_name(p_full_name)
    and s.cpf_hash = crypt(cleaned_cpf, s.cpf_hash)
  limit 1;
end;
$$;

grant execute on function public.authenticate_student(text, text) to anon;

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
