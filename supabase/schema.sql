create extension if not exists pgcrypto;

create table if not exists public.retention_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  course_slug text not null default 'curso-ti-basico-bloco-1',
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

alter table public.retention_submissions enable row level security;

drop policy if exists "Public can insert retention submissions" on public.retention_submissions;
create policy "Public can insert retention submissions"
on public.retention_submissions
for insert
to anon
with check (
  course_slug = 'curso-ti-basico-bloco-1'
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
