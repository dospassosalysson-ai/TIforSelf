const quizForm = document.querySelector("#retentionQuiz");
const quizResult = document.querySelector("#quizResult");
const resetQuiz = document.querySelector("#resetQuiz");
const studentName = document.querySelector("#studentName");
const className = document.querySelector("#className");
const studentLoginForm = document.querySelector("#studentLoginForm");
const loginFullName = document.querySelector("#loginFullName");
const loginCpf = document.querySelector("#loginCpf");
const loginMessage = document.querySelector("#loginMessage");
const studentSessionName = document.querySelector("#studentSessionName");
const logoutStudent = document.querySelector("#logoutStudent");
const SESSION_KEY = "cursoTiStudentSession";
const REMEMBERED_SESSION_KEY = "cursoTiRememberedStudentSession";

function getSupabaseConfig() {
  return window.COURSE_CONFIG || {};
}

function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(window.location.protocol.startsWith("http") || (config.supabaseUrl && config.supabaseAnonKey));
}

function supabaseEndpoint(path) {
  const config = getSupabaseConfig();
  return `${config.supabaseUrl.replace(/\/$/, "")}${path}`;
}

function supabaseHeaders(prefer = "return=representation") {
  const config = getSupabaseConfig();
  return {
    "Content-Type": "application/json",
    "apikey": config.supabaseAnonKey,
    "Authorization": `Bearer ${config.supabaseAnonKey}`,
    "Prefer": prefer
  };
}

async function courseApiRequest(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.error || text || `Erro HTTP ${response.status}`);
  }

  return data;
}

window.courseApiRequest = courseApiRequest;

async function submitToSupabase(payload) {
  await courseApiRequest("/api/student/retention", {
    sessionToken: payload.session_token,
    score: payload.score,
    totalQuestions: payload.total_questions,
    correctCount: payload.correct_count,
    wrongCount: payload.wrong_count,
    missingCount: payload.missing_count,
    percentage: payload.percentage,
    answers: payload.answers,
    reviewItems: payload.review_items,
    userAgent: payload.user_agent,
    pageUrl: payload.page_url
  });
}

async function authenticateStudent(fullName, cpf) {
  return courseApiRequest("/api/student/login", {
    fullName,
    cpf
  });
}

function getCurrentStudent() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(REMEMBERED_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCurrentStudent(student) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(student));
  localStorage.setItem(REMEMBERED_SESSION_KEY, JSON.stringify(student));
  applyStudentSession(student);
  window.dispatchEvent(new CustomEvent("student-session-changed"));
}

function clearCurrentStudent() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(REMEMBERED_SESSION_KEY);
  applyStudentSession(null);
  window.dispatchEvent(new CustomEvent("student-session-changed"));
}

function applyStudentSession(student) {
  const loggedIn = Boolean(student?.student_id && student?.session_token);
  document.body.classList.toggle("is-authenticated", loggedIn);

  if (studentSessionName) {
    studentSessionName.textContent = loggedIn
      ? `Aluno: ${student.full_name}`
      : "Aluno nao autenticado";
  }

  if (studentName) {
    studentName.value = loggedIn ? student.full_name : "";
    studentName.readOnly = loggedIn;
  }

  if (className) {
    className.value = loggedIn ? (student.class_name || "") : "";
    className.readOnly = loggedIn && Boolean(student.class_name);
  }

  if (loginMessage && loggedIn) {
    loginMessage.textContent = "Acesso liberado. Voce ja pode estudar e responder o check final.";
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
    const currentStudent = getCurrentStudent();

    if (!currentStudent?.student_id || !currentStudent?.session_token) {
      quizResult.innerHTML = "<p class=\"submission-error\">Entre com nome completo e CPF antes de enviar o check.</p>";
      document.querySelector("#student-login")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

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
      student_id: currentStudent.student_id,
      session_token: currentStudent.session_token,
      student_name: currentStudent.full_name,
      class_name: currentStudent.class_name || className?.value.trim() || null,
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

studentLoginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isSupabaseConfigured()) {
    loginMessage.textContent = "Supabase ainda nao configurado no Render. Configure as variaveis de ambiente antes de usar login.";
    loginMessage.className = "login-message error";
    return;
  }

  loginMessage.textContent = "Validando acesso...";
  loginMessage.className = "login-message";

  try {
    const student = await authenticateStudent(loginFullName.value.trim(), loginCpf.value.trim());

    if (!student?.student_id) {
      throw new Error("Nome ou CPF invalidos.");
    }

    setCurrentStudent(student);
    loginCpf.value = "";
    loginMessage.className = "login-message success";
    document.querySelector(".course-intro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    clearCurrentStudent();
    loginMessage.textContent = `Nao foi possivel entrar. ${error.message}`;
    loginMessage.className = "login-message error";
  }
});

logoutStudent?.addEventListener("click", () => {
  clearCurrentStudent();
  document.querySelector("#student-login")?.scrollIntoView({ behavior: "smooth", block: "center" });
});

applyStudentSession(getCurrentStudent());
