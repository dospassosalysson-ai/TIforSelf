const LESSON_GATES = [
  {
    id: "aula-00",
    title: "Aula 00 - Notebook",
    questions: [
      {
        text: "Qual tecla costuma ativar funcoes especiais do notebook, como brilho e volume?",
        options: ["Enter", "Fn", "Backspace"],
        answer: 1
      },
      {
        text: "No touchpad, dois dedos geralmente servem para:",
        options: ["Rolar a pagina", "Desligar o notebook", "Apagar arquivos"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-01",
    title: "Aula 01 - Primeiros passos",
    questions: [
      {
        text: "O Explorador de Arquivos e representado muitas vezes por um icone de:",
        options: ["Pasta", "Grafico", "Alto-falante"],
        answer: 0
      },
      {
        text: "Para confirmar o nome de uma pasta depois de digitar, usamos:",
        options: ["Esc", "Enter", "Caps Lock"],
        answer: 1
      }
    ]
  },
  {
    id: "aula-02",
    title: "Aula 02 - Arquivos e atalhos",
    questions: [
      {
        text: "Qual atalho salva o arquivo?",
        options: ["Ctrl+C", "Ctrl+V", "Ctrl+S"],
        answer: 2
      },
      {
        text: "Um arquivo XLSX normalmente abre em qual programa?",
        options: ["Excel", "PowerPoint", "Bloco de notas"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-03",
    title: "Aula 03 - Word basico",
    questions: [
      {
        text: "O Word e usado principalmente para criar:",
        options: ["Documentos de texto", "Senhas de Wi-Fi", "Pastas do Windows"],
        answer: 0
      },
      {
        text: "Para criar espaco e ir para uma nova linha no Word, usamos:",
        options: ["Enter", "Delete", "Fn"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-04",
    title: "Aula 04 - Curriculo e tabelas",
    questions: [
      {
        text: "Um curriculo bom deve ser:",
        options: ["Confuso e cheio de cores", "Simples, claro e verdadeiro", "Sem telefone ou e-mail"],
        answer: 1
      },
      {
        text: "Para inserir uma tabela no Word, normalmente usamos a guia:",
        options: ["Inserir", "Volume", "Bateria"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-05",
    title: "Aula 05 - Excel inicial",
    questions: [
      {
        text: "No Excel, cada quadradinho da planilha se chama:",
        options: ["Slide", "Celula", "Pasta"],
        answer: 1
      },
      {
        text: "A celula A1 fica na:",
        options: ["Coluna A e linha 1", "Coluna 1 e linha A", "Aba numero 1"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-06",
    title: "Aula 06 - Formulas",
    questions: [
      {
        text: "Toda formula no Excel deve comecar com:",
        options: ["=", "@", "#"],
        answer: 0
      },
      {
        text: "O simbolo * no Excel significa:",
        options: ["Somar", "Multiplicar", "Salvar"],
        answer: 1
      }
    ]
  },
  {
    id: "aula-07",
    title: "Aula 07 - Tabelas e filtros",
    questions: [
      {
        text: "Filtros servem para:",
        options: ["Encontrar dados especificos", "Quebrar a planilha", "Desligar o Excel"],
        answer: 0
      },
      {
        text: "Antes de transformar dados em tabela, a primeira linha deve ter:",
        options: ["Cabecalhos", "Fotos", "Senhas"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-08",
    title: "Aula 08 - Graficos",
    questions: [
      {
        text: "Grafico de colunas e bom para:",
        options: ["Comparar valores", "Digitar senha", "Criar pasta"],
        answer: 0
      },
      {
        text: "Um grafico precisa ter:",
        options: ["Titulo claro", "Muitas cores sem sentido", "Texto minusculo"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-09",
    title: "Aula 09 - PowerPoint inicial",
    questions: [
      {
        text: "PowerPoint e usado para criar:",
        options: ["Apresentacoes em slides", "Pastas do Windows", "Formulas automaticas"],
        answer: 0
      },
      {
        text: "Um slide deve ter:",
        options: ["Uma ideia principal", "Um texto enorme", "Todas as aulas juntas"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-10",
    title: "Aula 10 - Apresentacao oral",
    questions: [
      {
        text: "Uma boa apresentacao deve ter texto:",
        options: ["Curto e legivel", "Pequeno demais", "Da mesma cor do fundo"],
        answer: 0
      },
      {
        text: "Antes de apresentar, o aluno deve:",
        options: ["Treinar", "Apagar os slides", "Fechar o notebook"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-11",
    title: "Aula 11 - Integracao e PDF",
    questions: [
      {
        text: "Para copiar algo, usamos:",
        options: ["Ctrl+C", "Ctrl+S", "Ctrl+A"],
        answer: 0
      },
      {
        text: "PDF ajuda a:",
        options: ["Enviar mantendo melhor a formatacao", "Apagar o arquivo original", "Trocar o Wi-Fi"],
        answer: 0
      }
    ]
  },
  {
    id: "aula-12",
    title: "Aula 12 - Projeto final",
    questions: [
      {
        text: "Antes de entregar o projeto final, o aluno deve:",
        options: ["Abrir e conferir os arquivos", "Deixar tudo sem nome", "Apagar o PDF"],
        answer: 0
      },
      {
        text: "O projeto final deve reunir:",
        options: ["Word, Excel, PowerPoint e PDF", "Apenas uma foto", "Somente o carregador"],
        answer: 0
      }
    ]
  }
];

const LESSON_EXTRA_CONTENT = {
  "aula-00": {
    videos: [
      { title: "Como usar o mouse e touchpad no notebook", url: "https://www.youtube.com/watch?v=cGdCuLyfXys" },
      { title: "Curso basico Windows 11 para iniciantes", url: "https://www.youtube.com/playlist?list=PLwfXdA-l72X_nb90zgLeNFSxqBLSsJXkD" }
    ],
    questions: [
      { text: "Antes de ligar o notebook, o ideal e colocar o equipamento em:", options: ["Uma mesa firme", "Uma cama mole", "Perto de liquidos"], answer: 0 },
      { text: "Se a bateria estiver baixa, o aluno deve:", options: ["Conectar o carregador", "Apertar varias teclas", "Fechar a tela com forca"], answer: 0 },
      { text: "O botao power serve para:", options: ["Ligar o notebook", "Criar uma pasta", "Abrir uma planilha"], answer: 0 },
      { text: "Para clicar com o touchpad, geralmente usamos:", options: ["Um toque leve", "A tecla Caps Lock", "O carregador"], answer: 0 },
      { text: "Para abrir algo, muitas vezes usamos:", options: ["Dois cliques/toques", "Desligar a tela", "Apertar Fn sem parar"], answer: 0 },
      { text: "A tecla Backspace normalmente serve para:", options: ["Apagar o caractere anterior", "Aumentar volume sempre", "Salvar arquivo"], answer: 0 },
      { text: "A tecla Esc costuma ajudar a:", options: ["Sair/cancelar uma acao", "Comprar programas", "Formatar o computador"], answer: 0 },
      { text: "Se errar uma acao simples, um atalho comum para desfazer e:", options: ["Ctrl+Z", "Ctrl+P", "Alt+F4 sempre"], answer: 0 }
    ]
  },
  "aula-01": {
    videos: [
      { title: "Windows 11 para iniciantes", url: "https://www.youtube.com/watch?v=OrqgunmQioo" },
      { title: "Guia rapido Windows 11 para iniciantes", url: "https://www.youtube.com/watch?v=NtxOfo87jhg" }
    ],
    questions: [
      { text: "A area de trabalho e o local onde aparecem:", options: ["Icones e atalhos", "Somente formulas", "Apenas videos"], answer: 0 },
      { text: "O menu Iniciar ajuda a:", options: ["Encontrar programas", "Carregar a bateria", "Limpar a tela fisicamente"], answer: 0 },
      { text: "A barra de tarefas fica normalmente:", options: ["Na parte inferior da tela", "Dentro do carregador", "Na tecla Fn"], answer: 0 },
      { text: "Para fechar uma janela, usamos geralmente:", options: ["O X no canto", "A tecla A", "O cabo HDMI"], answer: 0 },
      { text: "Minimizar uma janela significa:", options: ["Guardar na barra sem fechar", "Apagar o programa", "Desinstalar o Windows"], answer: 0 },
      { text: "Uma pasta serve para:", options: ["Organizar arquivos", "Aumentar a internet", "Trocar a senha do notebook"], answer: 0 },
      { text: "Um nome de pasta deve ser:", options: ["Claro e facil de entender", "Cheio de simbolos confusos", "Sempre vazio"], answer: 0 },
      { text: "Para localizar arquivos no Windows, usamos principalmente:", options: ["Explorador de Arquivos", "Calculadora", "Lixeira"], answer: 0 }
    ]
  },
  "aula-02": {
    videos: [
      { title: "Curso basico Windows 11 passo a passo", url: "https://www.youtube.com/playlist?list=PLwfXdA-l72X_nb90zgLeNFSxqBLSsJXkD" },
      { title: "Teclado e dicas no Windows 11", url: "https://www.youtube.com/watch?v=RmTDD9LY4sc" }
    ],
    questions: [
      { text: "Ctrl+C serve para:", options: ["Copiar", "Salvar", "Imprimir"], answer: 0 },
      { text: "Ctrl+V serve para:", options: ["Colar", "Fechar", "Renomear"], answer: 0 },
      { text: "Ctrl+X serve para:", options: ["Recortar", "Aumentar brilho", "Abrir Wi-Fi"], answer: 0 },
      { text: "Ctrl+P normalmente abre:", options: ["Impressao", "Planilha nova", "Bluetooth"], answer: 0 },
      { text: "Um atalho na area de trabalho geralmente:", options: ["Abre um arquivo/programa sem ser o arquivo original", "Apaga o original", "Desliga a internet"], answer: 0 },
      { text: "A extensao .docx costuma ser de:", options: ["Documento do Word", "Apresentacao do PowerPoint", "Imagem do celular"], answer: 0 },
      { text: "A extensao .pptx costuma ser de:", options: ["PowerPoint", "Excel", "Lixeira"], answer: 0 },
      { text: "Para evitar perder trabalho, o aluno deve:", options: ["Salvar com frequencia", "Nunca nomear arquivos", "Usar somente a Lixeira"], answer: 0 }
    ]
  },
  "aula-03": {
    videos: [
      { title: "Curso de Word para iniciantes", url: "https://www.youtube.com/watch?v=D_wlDUELSyM" },
      { title: "Word basico: tabelas e ferramentas", url: "https://www.youtube.com/watch?v=p-4_1QZj508" }
    ],
    questions: [
      { text: "Para deixar um texto em negrito, usamos geralmente:", options: ["Botao B ou Ctrl+B", "Delete", "Fn+Wi-Fi"], answer: 0 },
      { text: "Para selecionar todo o texto, usamos:", options: ["Ctrl+A", "Ctrl+S", "Ctrl+P"], answer: 0 },
      { text: "Alinhamento centralizado coloca o texto:", options: ["No centro da linha", "Na Lixeira", "Em outra pasta"], answer: 0 },
      { text: "Fonte e o nome dado ao:", options: ["Tipo de letra", "Cabo do notebook", "Nome da pasta"], answer: 0 },
      { text: "Tamanho da fonte controla:", options: ["O tamanho das letras", "A bateria", "A velocidade da internet"], answer: 0 },
      { text: "Salvar como ajuda a:", options: ["Escolher nome e local do arquivo", "Apagar o teclado", "Criar uma conta"], answer: 0 },
      { text: "Para corrigir uma palavra, o aluno pode:", options: ["Clicar no local e editar", "Fechar sem salvar sempre", "Desligar o notebook"], answer: 0 },
      { text: "Um documento bem feito deve ter:", options: ["Texto legivel e organizado", "Tudo misturado", "Letras minusculas demais"], answer: 0 }
    ]
  },
  "aula-04": {
    videos: [
      { title: "Como criar curriculo no Word", url: "https://www.youtube.com/watch?v=4dP9Cd_lQ3g" },
      { title: "Como fazer tabela no Word", url: "https://www.youtube.com/watch?v=15oovZD3D6M" }
    ],
    questions: [
      { text: "Um curriculo deve conter dados de contato:", options: ["Corretos e atualizados", "Inventados", "Ocultos"], answer: 0 },
      { text: "Experiencias no curriculo devem ser:", options: ["Verdadeiras", "Falsas para impressionar", "Sempre apagadas"], answer: 0 },
      { text: "Tabela no Word ajuda a:", options: ["Organizar informacoes em linhas e colunas", "Aumentar a bateria", "Criar Wi-Fi"], answer: 0 },
      { text: "Para inserir imagem no Word, usamos geralmente:", options: ["Inserir > Imagens", "Delete > Arquivo", "Fn > Enter"], answer: 0 },
      { text: "Antes de enviar um curriculo, devemos:", options: ["Revisar erros e conferir contatos", "Trocar todo texto por simbolos", "Apagar o nome"], answer: 0 },
      { text: "Um titulo no curriculo deve ser:", options: ["Claro", "Ilegivel", "Sem relacao"], answer: 0 },
      { text: "Espacamento ajuda o documento a ficar:", options: ["Mais facil de ler", "Mais pesado sem motivo", "Sem texto"], answer: 0 },
      { text: "Ao usar tabela, linha e coluna servem para:", options: ["Separar informacoes", "Desligar o Word", "Esconder o arquivo"], answer: 0 }
    ]
  },
  "aula-05": {
    videos: [
      { title: "Excel basico do zero", url: "https://www.youtube.com/watch?v=GorNlHirLko" },
      { title: "Excel: conhecimentos basicos", url: "https://www.youtube.com/watch?v=hrCOOF_z6mc" }
    ],
    questions: [
      { text: "No Excel, as colunas sao identificadas por:", options: ["Letras", "Apenas cores", "Senhas"], answer: 0 },
      { text: "No Excel, as linhas sao identificadas por:", options: ["Numeros", "Icones", "Pastas"], answer: 0 },
      { text: "Uma celula e encontrada pelo encontro de:", options: ["Coluna e linha", "Mouse e carregador", "Wi-Fi e senha"], answer: 0 },
      { text: "Uma pasta de trabalho do Excel pode ter:", options: ["Varias planilhas", "Somente uma tecla", "Apenas imagens"], answer: 0 },
      { text: "Para ajustar largura de uma coluna, podemos:", options: ["Arrastar a borda da coluna", "Apertar Esc sempre", "Desligar o monitor"], answer: 0 },
      { text: "Dados em uma planilha devem ficar:", options: ["Organizados em cabecalhos e linhas", "Espalhados sem ordem", "Todos na mesma celula"], answer: 0 },
      { text: "Texto e numero no Excel podem ser:", options: ["Digitados em celulas", "Digitados no carregador", "Salvos na tecla Fn"], answer: 0 },
      { text: "Para editar uma celula, podemos:", options: ["Clicar nela e digitar", "Apagar a planilha inteira", "Fechar sem salvar"], answer: 0 }
    ]
  },
  "aula-06": {
    videos: [
      { title: "Formulas e funcoes basicas no Excel", url: "https://www.youtube.com/watch?v=gHJs9mMiOrA" },
      { title: "Excel basico: formulas", url: "https://www.youtube.com/watch?v=47nJsZ97sz0" }
    ],
    questions: [
      { text: "Para somar A1 e A2, uma formula correta seria:", options: ["=A1+A2", "A1+A2", "Somar A1 A2"], answer: 0 },
      { text: "O simbolo / no Excel significa:", options: ["Dividir", "Somar", "Salvar"], answer: 0 },
      { text: "O simbolo - no Excel significa:", options: ["Subtrair", "Copiar", "Imprimir"], answer: 0 },
      { text: "A funcao SOMA ajuda a:", options: ["Somar varios valores", "Criar slide", "Formatar notebook"], answer: 0 },
      { text: "Se uma formula mostra erro, o aluno deve:", options: ["Conferir referencias e sinais", "Apagar o Windows", "Ignorar sempre"], answer: 0 },
      { text: "Referencia A1 aponta para:", options: ["Coluna A, linha 1", "Linha A, coluna 1", "Aba 1 apenas"], answer: 0 },
      { text: "Parenteses em formulas ajudam a:", options: ["Definir ordem de calculo", "Trocar teclado", "Abrir a Lixeira"], answer: 0 },
      { text: "Depois de digitar formula, usamos:", options: ["Enter", "Caps Lock", "Power"], answer: 0 }
    ]
  },
  "aula-07": {
    videos: [
      { title: "Curso Excel basico", url: "https://www.youtube.com/playlist?list=PLi2AXhb5g8o_-_Kji5EvzGifOf8kj2ePT" },
      { title: "Excel nivel basico", url: "https://www.youtube.com/playlist?list=PLxjKFMYkZ9OciqkeAGy7w9Rc3CoO80MpK" }
    ],
    questions: [
      { text: "Cabecalho de tabela e:", options: ["Nome das colunas", "Senha do arquivo", "Imagem de fundo"], answer: 0 },
      { text: "Filtro permite mostrar:", options: ["Somente dados que atendem a um criterio", "Apenas a tela preta", "Todas as senhas"], answer: 0 },
      { text: "Classificar A a Z serve para:", options: ["Ordenar textos", "Apagar formulas", "Fechar o Excel"], answer: 0 },
      { text: "Classificar do maior para o menor serve para:", options: ["Ordenar numeros", "Criar imagem", "Aumentar volume"], answer: 0 },
      { text: "Antes de aplicar filtro, a tabela deve estar:", options: ["Bem organizada", "Sem cabecalhos", "Com tudo em uma celula"], answer: 0 },
      { text: "Uma tabela facilita:", options: ["Leitura e analise dos dados", "Esconder erros", "Desligar a impressora"], answer: 0 },
      { text: "Se filtrar errado, o aluno pode:", options: ["Limpar/remover o filtro", "Apagar o notebook", "Retirar a bateria"], answer: 0 },
      { text: "Dados repetidos ou confusos podem atrapalhar:", options: ["A analise da planilha", "O cabo HDMI", "O touchpad fisico"], answer: 0 }
    ]
  },
  "aula-08": {
    videos: [
      { title: "Excel basico: tabelas e graficos", url: "https://www.youtube.com/watch?v=I2taMQ3j6qo" },
      { title: "Curso Excel basico", url: "https://www.youtube.com/playlist?list=PLi2AXhb5g8o_-_Kji5EvzGifOf8kj2ePT" }
    ],
    questions: [
      { text: "Antes de criar grafico, devemos selecionar:", options: ["Os dados corretos", "A Lixeira", "O carregador"], answer: 0 },
      { text: "Grafico de pizza e mais indicado para:", options: ["Partes de um total", "Texto longo", "Senhas"], answer: 0 },
      { text: "Grafico de linhas e bom para:", options: ["Evolucao ao longo do tempo", "Criar pasta", "Formatar texto no Word"], answer: 0 },
      { text: "Titulo do grafico deve explicar:", options: ["O que esta sendo mostrado", "A senha do aluno", "O modelo do carregador"], answer: 0 },
      { text: "Legenda ajuda a identificar:", options: ["Series ou categorias", "Teclas quebradas", "Arquivos apagados"], answer: 0 },
      { text: "Cores no grafico devem ser:", options: ["Claras e com sentido", "Aleatorias e confusas", "Todas iguais ao fundo"], answer: 0 },
      { text: "Um grafico sem dados corretos pode:", options: ["Passar informacao errada", "Melhorar sozinho", "Virar PDF automaticamente"], answer: 0 },
      { text: "Depois de criar grafico, devemos:", options: ["Conferir se ele representa os dados", "Apagar a tabela", "Fechar sem salvar"], answer: 0 }
    ]
  },
  "aula-09": {
    videos: [
      { title: "PowerPoint do zero ate a apresentacao", url: "https://www.youtube.com/watch?v=KUpH10BMKQE" },
      { title: "Tutorial PowerPoint para iniciantes", url: "https://www.youtube.com/watch?v=I4p7QllUIsw" }
    ],
    questions: [
      { text: "Uma apresentacao e formada por:", options: ["Slides", "Celulas", "Pastas compactadas"], answer: 0 },
      { text: "O primeiro slide costuma ser:", options: ["Capa/titulo", "Lixeira", "Formula"], answer: 0 },
      { text: "Layout do slide ajuda a:", options: ["Organizar texto e imagens", "Trocar a senha", "Criar cabos"], answer: 0 },
      { text: "Em um slide, o texto deve ser:", options: ["Curto e legivel", "Muito pequeno", "Todo colado"], answer: 0 },
      { text: "Imagem no slide deve:", options: ["Ajudar a explicar a ideia", "Tampar todo texto", "Ser usada sem motivo"], answer: 0 },
      { text: "Para apresentar, usamos o modo:", options: ["Apresentacao de slides", "Explorador", "Lixeira"], answer: 0 },
      { text: "Um bom slide deve ter:", options: ["Uma ideia principal", "Todas as ideias do curso", "Somente efeitos"], answer: 0 },
      { text: "Salvar a apresentacao evita:", options: ["Perder o trabalho", "Aumentar brilho", "Desligar Wi-Fi"], answer: 0 }
    ]
  },
  "aula-10": {
    videos: [
      { title: "PowerPoint completo do zero", url: "https://www.youtube.com/watch?v=jqoKbne_sZE" },
      { title: "Curso PowerPoint gratis", url: "https://www.youtube.com/playlist?list=PLhNntNZaA1Vtrx8Q9tV3hH4h61ceg7cNp" }
    ],
    questions: [
      { text: "Antes de apresentar, o aluno deve conhecer:", options: ["A ordem dos slides", "A senha dos colegas", "O codigo do sistema"], answer: 0 },
      { text: "Durante a fala, e melhor:", options: ["Falar com calma", "Ler tudo correndo", "Ficar em silencio"], answer: 0 },
      { text: "Olhar para o publico ajuda a:", options: ["Criar conexao e seguranca", "Apagar o slide", "Fechar o arquivo"], answer: 0 },
      { text: "Texto muito pequeno no slide:", options: ["Dificulta a leitura", "Ajuda sempre", "Nao importa"], answer: 0 },
      { text: "Contraste entre texto e fundo deve ser:", options: ["Bom para leitura", "Muito fraco", "Invisivel"], answer: 0 },
      { text: "Animacoes devem ser usadas:", options: ["Com moderacao", "Em excesso sempre", "Para esconder conteudo"], answer: 0 },
      { text: "Se errar uma palavra apresentando, o melhor e:", options: ["Continuar com calma", "Apagar tudo", "Desligar o notebook"], answer: 0 },
      { text: "Treinar a apresentacao ajuda a:", options: ["Ganhar confianca", "Perder o arquivo", "Criar virus"], answer: 0 }
    ]
  },
  "aula-11": {
    videos: [
      { title: "Word para iniciantes", url: "https://www.youtube.com/watch?v=D_wlDUELSyM" },
      { title: "PowerPoint do zero", url: "https://www.youtube.com/watch?v=KUpH10BMKQE" },
      { title: "Excel basico do zero", url: "https://www.youtube.com/watch?v=GorNlHirLko" }
    ],
    questions: [
      { text: "Integrar arquivos significa:", options: ["Usar informacoes entre programas", "Apagar tudo", "Trocar a bateria"], answer: 0 },
      { text: "Um grafico do Excel pode ser usado em:", options: ["Word ou PowerPoint", "Somente na Lixeira", "Apenas no teclado"], answer: 0 },
      { text: "Ctrl+A normalmente serve para:", options: ["Selecionar tudo", "Salvar", "Colar"], answer: 0 },
      { text: "Ao copiar e colar, devemos conferir:", options: ["Se a informacao ficou correta", "Se o carregador mudou", "Se o Wi-Fi sumiu"], answer: 0 },
      { text: "Exportar em PDF ajuda a:", options: ["Enviar com formato mais preservado", "Editar formulas melhor", "Apagar imagens"], answer: 0 },
      { text: "Antes de gerar PDF, e importante:", options: ["Revisar o documento", "Apagar o nome", "Desorganizar as paginas"], answer: 0 },
      { text: "Um arquivo PDF geralmente e bom para:", options: ["Compartilhamento e impressao", "Criar formulas", "Mexer no touchpad"], answer: 0 },
      { text: "Nomear arquivos corretamente ajuda a:", options: ["Encontrar depois", "Perder mais rapido", "Bloquear o teclado"], answer: 0 }
    ]
  },
  "aula-12": {
    videos: [
      { title: "Excel basico do zero", url: "https://www.youtube.com/watch?v=GorNlHirLko" },
      { title: "Word para iniciantes", url: "https://www.youtube.com/watch?v=D_wlDUELSyM" },
      { title: "PowerPoint do zero", url: "https://www.youtube.com/watch?v=KUpH10BMKQE" }
    ],
    questions: [
      { text: "O projeto final deve estar em uma pasta:", options: ["Organizada e identificada", "Sem nome", "Dentro da Lixeira"], answer: 0 },
      { text: "O documento do Word deve explicar:", options: ["O planejamento/projeto", "A senha do CPF", "Como apagar Windows"], answer: 0 },
      { text: "A planilha deve conter:", options: ["Dados, formulas e grafico quando solicitado", "Somente uma palavra", "Apenas imagem"], answer: 0 },
      { text: "A apresentacao deve resumir:", options: ["As ideias principais", "Todos os menus do Windows", "Nada"], answer: 0 },
      { text: "Antes da entrega, devemos abrir os arquivos para:", options: ["Conferir se funcionam", "Trocar extensao aleatoriamente", "Apagar o conteudo"], answer: 0 },
      { text: "Uma versao em PDF ajuda na entrega porque:", options: ["Preserva melhor a visualizacao", "Substitui todo estudo", "Cria senhas"], answer: 0 },
      { text: "O nome dos arquivos deve ser:", options: ["Claro e relacionado ao projeto", "Qualquer letra sem sentido", "Sempre igual para todos"], answer: 0 },
      { text: "Se faltar algum arquivo, o aluno deve:", options: ["Voltar, completar e conferir", "Entregar incompleto sem avisar", "Excluir a pasta"], answer: 0 }
    ]
  }
};

LESSON_GATES.forEach((lesson) => {
  const extra = LESSON_EXTRA_CONTENT[lesson.id];
  if (!extra) return;

  lesson.videos = extra.videos;
  lesson.questions = [...lesson.questions, ...extra.questions];
});

const progressState = {
  completed: new Set(),
  loaded: false
};

function getSessionToken() {
  return getCurrentStudent()?.session_token || "";
}

async function fetchStudentProgress() {
  if (!isSupabaseConfigured() || !getSessionToken()) return [];

  const response = await fetch(supabaseEndpoint("/rest/v1/rpc/get_student_progress"), {
    method: "POST",
    headers: supabaseHeaders(),
    body: JSON.stringify({ p_session_token: getSessionToken() })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

async function submitLessonAttempt(lesson, score, answers, wrongItems) {
  const response = await fetch(supabaseEndpoint("/rest/v1/rpc/submit_lesson_attempt"), {
    method: "POST",
    headers: supabaseHeaders(),
    body: JSON.stringify({
      p_session_token: getSessionToken(),
      p_lesson_id: lesson.id,
      p_lesson_title: lesson.title,
      p_score: score,
      p_total_questions: lesson.questions.length,
      p_answers: answers,
      p_wrong_items: wrongItems
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

function renderLessonGate(lesson) {
  const supportVideos = lesson.videos?.length
    ? `
      <div class="gate-support">
        <strong>Videos de apoio para revisar antes de responder:</strong>
        <ul>
          ${lesson.videos.map((video) => `
            <li><a href="${video.url}" target="_blank" rel="noopener noreferrer">${video.title}</a></li>
          `).join("")}
        </ul>
      </div>
    `
    : "";

  return `
    <div class="lesson-gate" data-lesson-gate="${lesson.id}">
      <h3>Check da aula</h3>
      <p>Para liberar a proxima aula, acerte todas as perguntas abaixo.</p>
      ${supportVideos}
      <form class="lesson-gate-form">
        ${lesson.questions.map((question, questionIndex) => `
          <fieldset class="gate-question" data-question-index="${questionIndex}">
            <legend>${questionIndex + 1}. ${question.text}</legend>
            ${question.options.map((option, optionIndex) => `
              <label>
                <input type="radio" name="${lesson.id}-q${questionIndex}" value="${optionIndex}">
                ${option}
              </label>
            `).join("")}
          </fieldset>
        `).join("")}
        <button class="quiz-button" type="submit">Verificar e liberar proxima aula</button>
      </form>
      <div class="gate-result" aria-live="polite"></div>
    </div>
  `;
}

function setupLessonGates() {
  LESSON_GATES.forEach((lesson, index) => {
    const section = document.querySelector(`#${lesson.id}`);
    if (!section || section.querySelector(".lesson-gate")) return;

    section.dataset.lessonIndex = String(index);
    section.insertAdjacentHTML("beforeend", renderLessonGate(lesson));
  });
}

function ensureProgressPanel() {
  if (document.querySelector("#lessonProgressPanel")) return;

  const sessionBar = document.querySelector("#student-session");
  sessionBar?.insertAdjacentHTML("afterend", `
    <section id="lessonProgressPanel" class="lesson-progress-panel">
      <h2>Progresso do aluno</h2>
      <div id="lessonProgressList" class="lesson-progress-list"></div>
    </section>
  `);
}

function renderProgressPanel() {
  const list = document.querySelector("#lessonProgressList");
  if (!list) return;

  list.innerHTML = LESSON_GATES.map((lesson, index) => {
    const completed = progressState.completed.has(lesson.id);
    const unlockedIndex = getUnlockedLessonIndex();
    const current = index === unlockedIndex && !completed;
    const state = completed ? "Concluida" : current ? "Liberada" : "Bloqueada";

    return `
      <a href="#${lesson.id}" class="lesson-progress-item ${completed ? "done" : ""} ${current ? "current" : ""}">
        <strong>${index + 1}</strong>
        <span>${lesson.title}</span>
        <em>${state}</em>
      </a>
    `;
  }).join("");
}

function getUnlockedLessonIndex() {
  const firstLocked = LESSON_GATES.findIndex((lesson) => !progressState.completed.has(lesson.id));
  return firstLocked === -1 ? LESSON_GATES.length : firstLocked;
}

function applyLessonLocks() {
  const unlockedIndex = getUnlockedLessonIndex();

  LESSON_GATES.forEach((lesson, index) => {
    const section = document.querySelector(`#${lesson.id}`);
    if (!section) return;

    const completed = progressState.completed.has(lesson.id);
    const locked = index > unlockedIndex;
    section.classList.toggle("lesson-complete", completed);
    section.classList.toggle("lesson-locked", locked);

    let lockMessage = section.querySelector(".lesson-lock-message");
    if (locked && !lockMessage) {
      lockMessage = document.createElement("div");
      lockMessage.className = "lesson-lock-message";
      lockMessage.innerHTML = "<strong>Aula bloqueada.</strong> Conclua o check da aula anterior com 100% de acerto para liberar esta aula.";
      section.prepend(lockMessage);
    }

    if (!locked && lockMessage) {
      lockMessage.remove();
    }
  });

  const retention = document.querySelector("#check-retencao");
  const finalUnlocked = progressState.completed.size === LESSON_GATES.length;
  retention?.classList.toggle("lesson-locked", !finalUnlocked);
  if (retention && !finalUnlocked && !retention.querySelector(".lesson-lock-message")) {
    retention.insertAdjacentHTML("afterbegin", "<div class=\"lesson-lock-message\"><strong>Check final bloqueado.</strong> Conclua todas as aulas para liberar a avaliacao final.</div>");
  }
  if (retention && finalUnlocked) {
    retention.querySelector(".lesson-lock-message")?.remove();
  }

  renderProgressPanel();
}

async function loadProgressForCurrentStudent() {
  progressState.completed.clear();

  if (!getCurrentStudent()?.session_token) {
    applyLessonLocks();
    return;
  }

  try {
    const progress = await fetchStudentProgress();
    progress.forEach((item) => progressState.completed.add(item.lesson_id));
  } catch (error) {
    console.warn("Nao foi possivel carregar progresso", error);
  }

  progressState.loaded = true;
  applyLessonLocks();
}

function setupGateSubmission() {
  document.addEventListener("submit", async (event) => {
    const form = event.target.closest(".lesson-gate-form");
    if (!form) return;

    event.preventDefault();

    const gate = form.closest(".lesson-gate");
    const lesson = LESSON_GATES.find((item) => item.id === gate?.dataset.lessonGate);
    const result = gate?.querySelector(".gate-result");

    if (!lesson || !result) return;

    if (!getCurrentStudent()?.session_token) {
      result.innerHTML = "<p class=\"submission-error\">Entre no curso antes de responder o check da aula.</p>";
      return;
    }

    const answers = {};
    const wrongItems = [];
    let score = 0;

    lesson.questions.forEach((question, index) => {
      const selected = form.querySelector(`input[name="${lesson.id}-q${index}"]:checked`);
      const selectedIndex = selected ? Number(selected.value) : null;
      const status = selectedIndex === question.answer ? "correct" : selectedIndex === null ? "missing" : "wrong";

      if (status === "correct") {
        score += 1;
      } else {
        wrongItems.push({
          question: index + 1,
          text: question.text,
          selected: selectedIndex === null ? null : question.options[selectedIndex],
          expected: question.options[question.answer],
          status
        });
      }

      answers[`q${index + 1}`] = {
        selected: selectedIndex === null ? null : question.options[selectedIndex],
        correctAnswer: question.options[question.answer],
        status
      };
    });

    result.innerHTML = "<p>Enviando tentativa...</p>";

    try {
      const attempt = await submitLessonAttempt(lesson, score, answers, wrongItems);

      if (attempt?.passed) {
        progressState.completed.add(lesson.id);
        result.innerHTML = "<p class=\"submission-ok\">Perfeito. Aula concluida e proxima aula liberada.</p>";
        applyLessonLocks();
        const nextIndex = LESSON_GATES.findIndex((item) => item.id === lesson.id) + 1;
        const nextLesson = LESSON_GATES[nextIndex];
        if (nextLesson) {
          document.querySelector(`#${nextLesson.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        result.innerHTML = `
          <p class="submission-error">Voce acertou ${score} de ${lesson.questions.length}. Revise os pontos abaixo e tente novamente.</p>
          <ul>${wrongItems.map((item) => `<li>Pergunta ${item.question}: resposta correta - ${item.expected}</li>`).join("")}</ul>
        `;
      }
    } catch (error) {
      result.innerHTML = `<p class="submission-error">Nao foi possivel salvar sua tentativa. ${error.message}</p>`;
    }
  });
}

setupLessonGates();
ensureProgressPanel();
setupGateSubmission();
window.addEventListener("student-session-changed", loadProgressForCurrentStudent);
loadProgressForCurrentStudent();
