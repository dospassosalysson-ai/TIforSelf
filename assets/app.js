const lessons = [
  {
    number: 1,
    title: "Fundamentos do Computador",
    module: "Fundamentos",
    product: "Pasta organizada do curso",
    objectives: [
      "Entender as partes basicas do computador.",
      "Usar mouse, teclado, janelas e menus.",
      "Criar uma pasta para organizar os arquivos do curso."
    ],
    content: [
      "Computador, monitor, teclado, mouse e impressora.",
      "Sistema operacional, area de trabalho e janelas.",
      "Clique, duplo clique, botao direito e arrastar.",
      "Cuidados basicos com energia, senhas e arquivos importantes."
    ],
    practice: [
      "Criar a pasta Curso de TI.",
      "Criar subpastas para Word, Excel, PowerPoint e Projeto Final.",
      "Criar, renomear e mover um arquivo de anotacoes."
    ],
    activity: "Organizar uma pasta pessoal com subpastas para documentos, imagens e estudos."
  },
  {
    number: 2,
    title: "Arquivos, Pastas e Atalhos",
    module: "Fundamentos",
    product: "Estrutura de pastas e arquivo de anotacoes",
    objectives: [
      "Organizar melhor arquivos e pastas.",
      "Conhecer extensoes comuns de arquivos.",
      "Usar atalhos basicos do teclado."
    ],
    content: [
      "Tipos de arquivos: DOCX, XLSX, PPTX, PDF, JPG e PNG.",
      "Copiar, colar, recortar, excluir e restaurar.",
      "Atalhos Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, Ctrl+S e Ctrl+A."
    ],
    practice: [
      "Criar arquivos de exemplo.",
      "Separar arquivos por tipo.",
      "Copiar, renomear, excluir e restaurar arquivos."
    ],
    activity: "Organizar uma pasta baguncada simulada, separando arquivos por tipo."
  },
  {
    number: 3,
    title: "Word Basico",
    module: "Word",
    product: "Documento formatado",
    objectives: [
      "Criar, salvar e editar documentos no Word.",
      "Aplicar formatacao basica de texto.",
      "Preparar um documento simples e apresentavel."
    ],
    content: [
      "Interface do Word.",
      "Fonte, tamanho, negrito, italico e sublinhado.",
      "Alinhamento, espacamento, margens e listas."
    ],
    practice: [
      "Criar o documento apresentacao-pessoal.docx.",
      "Inserir nome, apresentacao, habilidades e objetivos.",
      "Aplicar titulo, alinhamento, lista e negrito."
    ],
    activity: "Formatar uma apresentacao pessoal com titulo, paragrafos e lista."
  },
  {
    number: 4,
    title: "Word: Documentos, Tabelas e Imagens",
    module: "Word",
    product: "Curriculo ou comunicado",
    objectives: [
      "Inserir tabelas e imagens em documentos.",
      "Criar um curriculo simples ou comunicado.",
      "Salvar documento em PDF, se disponivel."
    ],
    content: [
      "Tabelas, linhas e colunas.",
      "Imagens, cabecalho, rodape e revisao ortografica.",
      "Exportacao ou salvamento em PDF."
    ],
    practice: [
      "Criar curriculo com dados pessoais, objetivo e escolaridade.",
      "Adicionar experiencias, habilidades e formatacao limpa.",
      "Revisar e salvar com nome claro."
    ],
    activity: "Criar um comunicado com titulo, texto, data, assinatura e tabela ou imagem."
  },
  {
    number: 5,
    title: "Excel: Introducao",
    module: "Excel",
    product: "Planilha simples organizada",
    objectives: [
      "Conhecer a interface do Excel.",
      "Entender celulas, linhas, colunas e abas.",
      "Criar uma planilha simples."
    ],
    content: [
      "Pasta de trabalho, planilha, celulas, linhas e colunas.",
      "Inserir, apagar e editar dados.",
      "Ajustar largura e aplicar formatacao basica."
    ],
    practice: [
      "Criar lista-de-compras.xlsx.",
      "Montar colunas de item, quantidade, valor unitario e valor total.",
      "Aplicar titulo, bordas e formato de moeda."
    ],
    activity: "Preencher a planilha com pelo menos 10 itens."
  },
  {
    number: 6,
    title: "Excel: Formulas Basicas",
    module: "Excel",
    product: "Planilha com calculos",
    objectives: [
      "Entender o que e uma formula.",
      "Usar operacoes matematicas simples.",
      "Aplicar funcoes basicas."
    ],
    content: [
      "Toda formula comeca com sinal de igual.",
      "Soma, subtracao, multiplicacao e divisao.",
      "Funcoes SOMA, MEDIA, MAXIMO e MINIMO."
    ],
    practice: [
      "Calcular valor total de cada item.",
      "Calcular total geral, maior valor e menor valor.",
      "Usar alca de preenchimento."
    ],
    activity: "Criar uma planilha de gastos semanais com total e media."
  },
  {
    number: 7,
    title: "Excel: Tabelas, Filtros e Classificacao",
    module: "Excel",
    product: "Lista organizada com filtros",
    objectives: [
      "Organizar dados em formato de tabela.",
      "Usar filtros.",
      "Classificar informacoes."
    ],
    content: [
      "Cabecalho de tabela.",
      "Formatar como tabela.",
      "Filtros e classificacao alfabetica ou por valores."
    ],
    practice: [
      "Criar uma lista de clientes ficticios.",
      "Adicionar cidade, telefone, produto de interesse e valor estimado.",
      "Filtrar clientes por cidade e classificar por valor."
    ],
    activity: "Usar filtros para responder perguntas sobre clientes, cidades e valores."
  },
  {
    number: 8,
    title: "Excel: Graficos Basicos",
    module: "Excel",
    product: "Grafico simples com interpretacao",
    objectives: [
      "Criar graficos simples no Excel.",
      "Escolher o tipo de grafico adequado.",
      "Interpretar informacoes visuais."
    ],
    content: [
      "Grafico de colunas, barras e pizza.",
      "Titulo, legenda e rotulos.",
      "Quando usar cada tipo de grafico."
    ],
    practice: [
      "Criar uma planilha de vendas por produto.",
      "Gerar grafico de colunas para comparar vendas.",
      "Gerar grafico de pizza para participacao por produto."
    ],
    activity: "Criar um grafico a partir da planilha de gastos semanais."
  },
  {
    number: 9,
    title: "PowerPoint Basico",
    module: "PowerPoint",
    product: "Apresentacao inicial",
    objectives: [
      "Criar uma apresentacao simples.",
      "Usar layouts, temas e imagens.",
      "Organizar ideias em slides."
    ],
    content: [
      "Interface do PowerPoint.",
      "Slides, layouts, titulo e subtitulo.",
      "Imagens, formas, temas e ordem da apresentacao."
    ],
    practice: [
      "Criar apresentacao com slide de titulo.",
      "Adicionar slides sobre quem sou, objetivos e imagem.",
      "Criar slide de encerramento."
    ],
    activity: "Preparar uma apresentacao de 5 slides sobre um tema escolhido."
  },
  {
    number: 10,
    title: "PowerPoint: Visual e Apresentacao",
    module: "PowerPoint",
    product: "Apresentacao revisada",
    objectives: [
      "Melhorar a aparencia de uma apresentacao.",
      "Inserir graficos e imagens com cuidado.",
      "Treinar apresentacao oral curta."
    ],
    content: [
      "Padrao visual, contraste e legibilidade.",
      "Imagens de boa qualidade.",
      "Inserir grafico do Excel e usar transicoes simples."
    ],
    practice: [
      "Revisar textos.",
      "Padronizar fontes.",
      "Inserir imagem, grafico e testar em modo apresentacao."
    ],
    activity: "Cada aluno apresenta por 2 a 3 minutos."
  },
  {
    number: 11,
    title: "Integracao entre Office e PDF",
    module: "Integracao",
    product: "Pacote com documento, planilha e PDF",
    objectives: [
      "Usar Word, Excel e PowerPoint em conjunto.",
      "Inserir tabelas e graficos em documentos.",
      "Exportar arquivos em PDF."
    ],
    content: [
      "Copiar tabela do Excel para Word.",
      "Copiar grafico do Excel para PowerPoint.",
      "Salvar como PDF e nomear arquivos finais."
    ],
    practice: [
      "Montar pacote sobre planejamento mensal.",
      "Criar documento explicativo.",
      "Organizar planilha, apresentacao e PDF."
    ],
    activity: "Revisar os arquivos e organizar tudo na pasta Projeto Final."
  },
  {
    number: 12,
    title: "Projeto Final do Bloco 1",
    module: "Projeto",
    product: "Entrega final do Bloco 1",
    objectives: [
      "Finalizar o projeto pratico.",
      "Revisar os principais conteudos do bloco.",
      "Avaliar a autonomia do aluno no uso do Office."
    ],
    content: [
      "Documento no Word explicando o planejamento.",
      "Planilha no Excel com gastos, formulas e grafico.",
      "Apresentacao no PowerPoint com 5 a 7 slides.",
      "Pelo menos um arquivo exportado em PDF."
    ],
    practice: [
      "Revisar criterios.",
      "Finalizar arquivos.",
      "Fazer conferencia individual e apresentacao curta."
    ],
    activity: "Entregar o pacote final e explicar o projeto em 2 a 3 minutos."
  }
];

const lessonNav = document.querySelector("#lessonNav");
const lessonStage = document.querySelector("#lessonStage");
const printButton = document.querySelector("#printButton");
const expandButton = document.querySelector("#expandButton");

let expanded = false;
let activeLesson = 0;

if (new URLSearchParams(window.location.search).get("print") === "1") {
  expanded = true;
}

function formatList(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function lessonCard(lesson) {
  return `
    <article class="lesson-card" id="aula-${String(lesson.number).padStart(2, "0")}">
      <div class="lesson-head">
        <div>
          <span class="eyebrow">Aula ${String(lesson.number).padStart(2, "0")}</span>
          <h2>${lesson.title}</h2>
          <div class="lesson-meta">
            <span class="pill">${lesson.module}</span>
            <span class="pill">${lesson.product}</span>
          </div>
        </div>
      </div>
      <div class="lesson-body">
        <section class="lesson-section">
          <h3>Objetivos</h3>
          ${formatList(lesson.objectives)}
        </section>
        <section class="lesson-section">
          <h3>Conteudo</h3>
          ${formatList(lesson.content)}
        </section>
        <section class="lesson-section">
          <h3>Pratica guiada</h3>
          ${formatList(lesson.practice)}
        </section>
        <section class="lesson-section">
          <h3>Atividade</h3>
          <ul><li>${lesson.activity}</li></ul>
        </section>
      </div>
    </article>
  `;
}

function renderNav() {
  lessonNav.innerHTML = lessons
    .map((lesson, index) => `
      <button class="nav-button ${index === activeLesson ? "active" : ""}" type="button" data-lesson="${index}">
        <strong>Aula ${String(lesson.number).padStart(2, "0")}</strong>
        <span>${lesson.title}</span>
      </button>
    `)
    .join("");
}

function renderLessons() {
  const visibleLessons = expanded ? lessons : [lessons[activeLesson]];
  lessonStage.innerHTML = visibleLessons.map(lessonCard).join("");
}

function setLesson(index) {
  activeLesson = index;
  expanded = false;
  expandButton.querySelector("span").textContent = "+";
  expandButton.lastChild.textContent = " Expandir";
  renderNav();
  renderLessons();
  lessonStage.scrollIntoView({ behavior: "smooth", block: "start" });
}

lessonNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lesson]");
  if (!button) return;
  setLesson(Number(button.dataset.lesson));
});

printButton.addEventListener("click", () => {
  expanded = true;
  renderLessons();
  window.print();
});

window.addEventListener("beforeprint", () => {
  expanded = true;
  renderLessons();
});

expandButton.addEventListener("click", () => {
  expanded = !expanded;
  expandButton.querySelector("span").textContent = expanded ? "-" : "+";
  expandButton.lastChild.textContent = expanded ? " Recolher" : " Expandir";
  renderLessons();
});

renderNav();
renderLessons();
