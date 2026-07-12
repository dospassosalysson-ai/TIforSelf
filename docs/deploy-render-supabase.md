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

Os alunos poderao enviar respostas, mas nao poderao ler as respostas dos outros alunos pela API publica.

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
