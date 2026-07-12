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
  return `
    <div class="lesson-gate" data-lesson-gate="${lesson.id}">
      <h3>Check da aula</h3>
      <p>Para liberar a proxima aula, acerte todas as perguntas abaixo.</p>
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
