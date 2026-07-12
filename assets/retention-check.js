const quizForm = document.querySelector("#retentionQuiz");
const quizResult = document.querySelector("#quizResult");
const resetQuiz = document.querySelector("#resetQuiz");
const studentName = document.querySelector("#studentName");
const className = document.querySelector("#className");

function getSupabaseConfig() {
  return window.COURSE_CONFIG || {};
}

function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.supabaseUrl && config.supabaseAnonKey);
}

async function submitToSupabase(payload) {
  const config = getSupabaseConfig();
  const endpoint = `${config.supabaseUrl.replace(/\/$/, "")}/rest/v1/retention_submissions`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": config.supabaseAnonKey,
      "Authorization": `Bearer ${config.supabaseAnonKey}`,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Erro HTTP ${response.status}`);
  }
}

function clearQuizState() {
  document.querySelectorAll(".quiz-question").forEach((question) => {
    question.classList.remove("correct", "wrong", "missing");
    const feedback = question.querySelector(".question-feedback");
    if (feedback) feedback.remove();
  });
}

function getReviewMessage(percent) {
  if (percent >= 85) {
    return "Muito bom. Voce ja reteve a maior parte do Bloco 1 e pode seguir praticando no projeto final.";
  }

  if (percent >= 60) {
    return "Bom caminho. Revise as perguntas erradas e refaca as praticas antes de avancar.";
  }

  return "Ainda precisa revisar com calma. Volte nas aulas indicadas, refaca os passos e tente o check outra vez.";
}

if (quizForm && quizResult) {
  quizForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearQuizState();

    const questions = Array.from(quizForm.querySelectorAll(".quiz-question"));
    let correct = 0;
    let missing = 0;
    const wrongItems = [];
    const answers = {};

    questions.forEach((question, index) => {
      const answer = question.dataset.answer;
      const selected = question.querySelector("input[type='radio']:checked");
      const feedback = document.createElement("p");
      feedback.className = "question-feedback";
      const questionNumber = index + 1;

      if (!selected) {
        missing += 1;
        question.classList.add("missing");
        feedback.textContent = "Voce ainda nao respondeu esta pergunta.";
        wrongItems.push(`Pergunta ${questionNumber}: nao respondida.`);
        answers[`q${questionNumber}`] = {
          selected: null,
          correctAnswer: answer,
          status: "missing"
        };
      } else if (selected.value === answer) {
        correct += 1;
        question.classList.add("correct");
        feedback.textContent = "Resposta correta.";
        answers[`q${questionNumber}`] = {
          selected: selected.value,
          correctAnswer: answer,
          status: "correct"
        };
      } else {
        question.classList.add("wrong");
        feedback.textContent = "Resposta incorreta. Revise este assunto na apostila.";
        wrongItems.push(`Pergunta ${questionNumber}: resposta incorreta.`);
        answers[`q${questionNumber}`] = {
          selected: selected.value,
          correctAnswer: answer,
          status: "wrong"
        };
      }

      question.appendChild(feedback);
    });

    const total = questions.length;
    const wrong = total - correct;
    const percent = Math.round((correct / total) * 100);
    const reviewList = wrongItems.length
      ? `<ul>${wrongItems.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "<p>Nenhum erro encontrado. Excelente retencao.</p>";

    const payload = {
      course_slug: getSupabaseConfig().courseSlug || "curso-ti-basico-bloco-1",
      student_name: studentName?.value.trim() || "Aluno sem nome",
      class_name: className?.value.trim() || null,
      score: correct,
      total_questions: total,
      correct_count: correct,
      wrong_count: wrong,
      missing_count: missing,
      percentage: percent,
      answers,
      review_items: wrongItems,
      user_agent: navigator.userAgent,
      page_url: window.location.href
    };

    let submissionMessage = "";
    if (isSupabaseConfigured()) {
      try {
        await submitToSupabase(payload);
        submissionMessage = "<p class=\"submission-ok\">Resultado enviado para o professor.</p>";
      } catch (error) {
        submissionMessage = `<p class=\"submission-error\">O resultado foi corrigido, mas nao foi enviado ao professor. Erro: ${error.message}</p>`;
      }
    } else {
      submissionMessage = "<p class=\"submission-warning\">Supabase ainda nao configurado. O resultado apareceu na tela, mas nao foi enviado ao professor.</p>";
    }

    quizResult.innerHTML = `
      <h3>Resultado do check</h3>
      <div class="score-board">
        <span><strong>${correct}</strong> acertos</span>
        <span><strong>${wrong}</strong> erros</span>
        <span><strong>${missing}</strong> sem resposta</span>
        <span><strong>${percent}%</strong> aproveitamento</span>
      </div>
      <p>${getReviewMessage(percent)}</p>
      ${submissionMessage}
      <h4>Pontos para revisar</h4>
      ${reviewList}
    `;

    quizResult.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  resetQuiz?.addEventListener("click", () => {
    quizForm.reset();
    clearQuizState();
    quizResult.textContent = "Responda as perguntas e clique em corrigir para ver seu resultado.";
  });
}
