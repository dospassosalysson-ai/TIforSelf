-- Copie este arquivo no SQL Editor do Supabase para cadastrar um professor.
-- Troque os valores abaixo antes de executar.
-- O CPF sera salvo com hash usando pgcrypto, nao como texto puro.

insert into public.teachers (full_name, cpf_hash, active)
values (
  'NOME COMPLETO DO PROFESSOR',
  extensions.crypt(regexp_replace('00000000000', '\D', '', 'g'), extensions.gen_salt('bf')),
  true
)
on conflict (normalized_name) do update
set
  full_name = excluded.full_name,
  cpf_hash = excluded.cpf_hash,
  active = true;
