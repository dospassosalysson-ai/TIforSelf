-- Copie este arquivo no SQL Editor do Supabase para cadastrar um aluno.
-- Troque os valores abaixo antes de executar.
-- O CPF sera salvo com hash usando pgcrypto, nao como texto puro.

insert into public.students (full_name, cpf_hash, class_name)
values (
  'NOME COMPLETO DO ALUNO',
  crypt(regexp_replace('00000000000', '\D', '', 'g'), gen_salt('bf')),
  'Bloco 1'
);
