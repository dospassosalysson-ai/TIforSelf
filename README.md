# Curso de TI Basico

Curso introdutorio de tecnologia da informacao, criado em blocos.

## Estrutura

- **Bloco 1:** Excel e programas do Office
- **Bloco 2:** a definir depois que o Bloco 1 estiver fechado
- **Bloco 3:** a definir

## Objetivo geral

Ensinar fundamentos praticos de informatica para pessoas que precisam ganhar seguranca no uso do computador, organizar documentos, criar planilhas, preparar apresentacoes e trabalhar com ferramentas comuns de escritorio.

## Publico-alvo

Iniciantes em informatica, estudantes, profissionais administrativos, pequenos empreendedores e qualquer pessoa que precise usar ferramentas de escritorio no dia a dia.

## Metodologia

- Aulas curtas e praticas.
- Explicacao simples, seguida de exercicios guiados.
- Atividades com situacoes reais: lista de compras, controle financeiro, relatorios, cartas, curriculos e apresentacoes.
- Revisao ao final de cada modulo.

## Bloco atual

O material inicial esta em [bloco-1-office-excel/plano-do-bloco.md](C:/Users/ArT/Documents/CURSO%20DE%20TI/bloco-1-office-excel/plano-do-bloco.md).

## Plataforma local

Abra o arquivo [index.html](C:/Users/ArT/Documents/CURSO%20DE%20TI/index.html) no navegador para acessar a plataforma do curso.

Para abrir direto a apostila do aluno, use [curso.html](C:/Users/ArT/Documents/CURSO%20DE%20TI/curso.html).

Se preferir usar por servidor local, execute na pasta do projeto:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Depois acesse:

```text
http://127.0.0.1:4173/
```

Na propria plataforma, use o botao **Imprimir** para salvar o curso em PDF.

## Material do aluno

O arquivo principal para ensinar quem nao sabe e:

- [curso.html](C:/Users/ArT/Documents/CURSO%20DE%20TI/curso.html)

Ele contem explicacoes, passos e praticas para cada aula. A apostila considera um aluno iniciante usando notebook, entao inclui:

- Aula 00 sobre notebook, touchpad, teclado, Fn, bateria, Wi-Fi e teclas essenciais.
- Passos detalhados para criar pastas, abrir programas e salvar arquivos.
- Aulas de Word, Excel e PowerPoint explicadas desde o primeiro clique.
- Prints reais/oficiais de telas do Windows e do Office.
- Caixas com erros comuns, cuidados e exercicios guiados.
- Check de retencao interativo no final, com 15 perguntas, correcao automatica, acertos, erros e pontos para revisar.
- Login de aluno com nome completo e CPF, validado pelo Supabase com CPF salvo como hash.
- Bloqueio de avanco: cada aula tem um check e a proxima aula so libera com 100% de acerto.
- Painel do professor em [professor.html](C:/Users/ArT/Documents/CURSO%20DE%20TI/professor.html), com aderencia, progresso por aluno e dificuldade por aula.

PDF atualizado:

- [apostila-curso-ti-bloco-1.pdf](C:/Users/ArT/Documents/CURSO%20DE%20TI/apostila-curso-ti-bloco-1.pdf)

## Deploy e recebimento das respostas

O projeto esta preparado para:

- Hospedar a plataforma no Render.
- Enviar respostas do check final para o Supabase.
- Registrar nome do aluno, turma, acertos, erros, porcentagem e respostas por pergunta.

Arquivos principais:

- [render.yaml](C:/Users/ArT/Documents/CURSO%20DE%20TI/render.yaml)
- [supabase/schema.sql](C:/Users/ArT/Documents/CURSO%20DE%20TI/supabase/schema.sql)
- [supabase/add-student.example.sql](C:/Users/ArT/Documents/CURSO%20DE%20TI/supabase/add-student.example.sql)
- [docs/deploy-render-supabase.md](C:/Users/ArT/Documents/CURSO%20DE%20TI/docs/deploy-render-supabase.md)
