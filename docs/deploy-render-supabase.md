# Deploy no Render com respostas no Supabase

Este projeto esta preparado para funcionar como site estatico no Render e salvar as respostas do Check de Retencao no Supabase.

## 1. Criar o banco no Supabase

1. Acesse o Supabase e crie um projeto.
2. Abra **SQL Editor**.
3. Copie o conteudo de [supabase/schema.sql](../supabase/schema.sql).
4. Execute o SQL.

Isso cria a tabela:

```text
public.retention_submissions
```

Tambem cria:

```text
public.students
public.student_sessions
public.lesson_attempts
public.lesson_progress
public.authenticate_student(nome, cpf)
public.submit_lesson_attempt(...)
public.teacher_student_summary
public.teacher_lesson_difficulty
```

Os alunos poderao entrar com nome e CPF, enviar respostas, mas nao poderao ler as respostas dos outros alunos pela API publica.

## 1.1. Cadastrar alunos

Para cadastrar um aluno, use o modelo:

[supabase/add-student.example.sql](../supabase/add-student.example.sql)

Exemplo:

```sql
insert into public.students (full_name, cpf_hash, class_name)
values (
  'Maria da Silva',
  crypt(regexp_replace('12345678900', '\D', '', 'g'), gen_salt('bf')),
  'Bloco 1'
);
```

O CPF fica salvo como hash no banco. Nao salve CPF em texto puro.

## 1.2. Criar usuario do professor

O painel do professor usa nome completo e CPF, igual o login do aluno.

Use o modelo:

```sql
insert into public.teachers (full_name, cpf_hash, active)
values (
  'NOME COMPLETO DO PROFESSOR',
  crypt(regexp_replace('00000000000', '\D', '', 'g'), gen_salt('bf')),
  true
)
on conflict (normalized_name) do update
set
  full_name = excluded.full_name,
  cpf_hash = excluded.cpf_hash,
  active = true;
```

Tambem existe um arquivo de exemplo em:

```text
supabase/add-teacher.example.sql
```

Depois acesse:

```text
/professor.html
```

O painel mostra:

- progresso por aluno;
- quantidade de aulas concluidas;
- media de aproveitamento;
- dificuldade por aula;
- ultimas tentativas com erros.

## 1.3. Bloqueio de avanco

Cada aula tem um check proprio. O aluno so libera a proxima aula quando acerta 100% do check da aula atual.

Cada tentativa fica salva em:

```text
public.lesson_attempts
```

Cada aula liberada/concluida fica salva em:

```text
public.lesson_progress
```

## 2. Pegar as chaves do Supabase

No Supabase, abra:

```text
Project Settings > API
```

Copie:

- **Project URL**
- **anon public key**

Use somente a chave **anon public** no Render. Nao coloque a service role key no frontend.

## 3. Subir o projeto para um repositorio Git

O Render precisa de um repositorio GitHub, GitLab ou Bitbucket.

Na pasta do projeto:

```powershell
git add .
git commit -m "Preparar curso para Render e Supabase"
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin master
```

Se o repositorio usar `main` em vez de `master`, ajuste o nome da branch antes de subir.

## 4. Criar o site no Render

O projeto ja tem [render.yaml](../render.yaml).

No Render:

1. Clique em **New**.
2. Escolha **Blueprint**.
3. Conecte o repositorio do projeto.
4. Confirme o blueprint.
5. Preencha as variaveis:

```text
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
COURSE_SLUG=curso-ti-basico-bloco-1
```

O Render vai rodar:

```text
npm run build
```

Esse comando gera `assets/runtime-config.js` com as configuracoes publicas do Supabase.

## 5. Testar depois do deploy

1. Abra a URL do Render.
2. Entre na apostila.
3. Preencha nome do aluno e turma.
4. Responda o check.
5. Clique em **Corrigir check**.
6. Verifique se aparece: `Resultado enviado para o professor.`
7. No Supabase, abra a tabela `retention_submissions` para ver o envio.

## 6. Onde ver as respostas

No Supabase:

```text
Table Editor > retention_submissions
```

Campos principais:

- `student_id`: aluno autenticado
- `student_name`: nome do aluno
- `class_name`: turma ou observacao
- `score`: quantidade de acertos
- `wrong_count`: quantidade de erros
- `missing_count`: perguntas sem resposta
- `percentage`: aproveitamento
- `answers`: respostas por pergunta
- `review_items`: perguntas que precisa revisar
- `created_at`: data e horario do envio

## Observacao importante

O site funciona localmente mesmo sem Supabase. Nesse caso, o aluno ve o resultado na tela, mas aparece o aviso de que o envio ao professor ainda nao esta configurado.
