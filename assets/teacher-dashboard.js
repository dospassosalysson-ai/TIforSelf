const teacherLoginForm = document.querySelector("#teacherLoginForm");
const teacherLogin = document.querySelector("#teacherLogin");
const teacherDashboard = document.querySelector("#teacherDashboard");
const teacherLoginMessage = document.querySelector("#teacherLoginMessage");
const teacherSessionName = document.querySelector("#teacherSessionName");
const teacherLogout = document.querySelector("#teacherLogout");
const TEACHER_SESSION_KEY = "cursoTiTeacherSession";

function teacherConfig() {
  return window.COURSE_CONFIG || {};
}

function teacherEndpoint(path) {
  return `${teacherConfig().supabaseUrl.replace(/\/$/, "")}${path}`;
}

function getTeacherSession() {
  try {
    const raw = sessionStorage.getItem(TEACHER_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setTeacherSession(session) {
  sessionStorage.setItem(TEACHER_SESSION_KEY, JSON.stringify(session));
  applyTeacherSession(session);
}

function clearTeacherSession() {
  sessionStorage.removeItem(TEACHER_SESSION_KEY);
  applyTeacherSession(null);
}

function applyTeacherSession(session) {
  const loggedIn = Boolean(session?.teacher_id && session?.session_token);
  teacherLogin.style.display = loggedIn ? "none" : "block";
  teacherDashboard.style.display = loggedIn ? "block" : "none";
  teacherSessionName.textContent = loggedIn ? `Professor: ${session.full_name || "autenticado"}` : "";

  if (loggedIn) {
    loadTeacherDashboard();
  }
}

function supabaseRpcHeaders() {
  return {
    "Content-Type": "application/json",
    "apikey": teacherConfig().supabaseAnonKey,
    "Authorization": `Bearer ${teacherConfig().supabaseAnonKey}`
  };
}

async function loginTeacher(fullName, cpf) {
  const response = await fetch(teacherEndpoint("/rest/v1/rpc/authenticate_teacher"), {
    method: "POST",
    headers: supabaseRpcHeaders(),
    body: JSON.stringify({
      p_full_name: fullName,
      p_cpf: cpf
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function fetchTeacherDashboard() {
  const session = getTeacherSession();
  const response = await fetch(teacherEndpoint("/rest/v1/rpc/get_teacher_dashboard"), {
    method: "POST",
    headers: supabaseRpcHeaders(),
    body: JSON.stringify({
      p_session_token: session.session_token
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

function renderTable(table, headers, rows) {
  table.innerHTML = `
    <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
    <tbody>${rows.length ? rows.join("") : `<tr><td colspan="${headers.length}">Nenhum dado encontrado.</td></tr>`}</tbody>
  `;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("pt-BR");
}

async function loadTeacherDashboard() {
  try {
    const dashboard = await fetchTeacherDashboard();
    const students = dashboard.students || [];
    const difficulty = dashboard.difficulty || [];
    const attempts = dashboard.attempts || [];
    const retention = dashboard.retention || [];

    const avgRetention = retention.length
      ? Math.round(retention.reduce((sum, item) => sum + Number(item.percentage || 0), 0) / retention.length)
      : 0;

    document.querySelector("#teacherSummary").innerHTML = `
      <div>
        <span class="eyebrow">Resumo</span>
        <h2>Acompanhamento do Bloco 1</h2>
        <p>Use estes dados para identificar quem esta progredindo e quais aulas precisam de reforco.</p>
      </div>
      <div class="stats">
        <div><strong>${students.length}</strong><span>alunos</span></div>
        <div><strong>${avgRetention}%</strong><span>media final</span></div>
        <div><strong>${attempts.length}</strong><span>tentativas recentes</span></div>
      </div>
    `;

    renderTable(
      document.querySelector("#studentSummaryTable"),
      ["Aluno", "Turma", "Aulas concluidas", "Media aulas", "Check final", "Ultima atividade"],
      students.map((student) => `
        <tr>
          <td>${student.full_name}</td>
          <td>${student.class_name || "-"}</td>
          <td>${student.completed_lessons || 0}/13</td>
          <td>${student.average_lesson_percentage || 0}%</td>
          <td>${student.best_retention_percentage || 0}%</td>
          <td>${formatDate(student.last_activity)}</td>
        </tr>
      `)
    );

    renderTable(
      document.querySelector("#lessonDifficultyTable"),
      ["Aula", "Tentativas", "Media", "Taxa de liberacao", "Tentativas com erro"],
      difficulty.map((lesson) => `
        <tr>
          <td>${lesson.lesson_title}</td>
          <td>${lesson.attempts}</td>
          <td>${lesson.average_percentage || 0}%</td>
          <td>${lesson.pass_rate || 0}%</td>
          <td>${lesson.failed_attempts || 0}</td>
        </tr>
      `)
    );

    renderTable(
      document.querySelector("#attemptsTable"),
      ["Data", "Aluno", "Aula", "Nota", "Status", "Dificuldade"],
      attempts.map((attempt) => {
        const wrong = Array.isArray(attempt.wrong_items)
          ? attempt.wrong_items.map((item) => `P${item.question}`).join(", ")
          : "-";

        return `
          <tr>
            <td>${formatDate(attempt.created_at)}</td>
            <td>${attempt.student_name || "-"}</td>
            <td>${attempt.lesson_title}</td>
            <td>${attempt.score}/${attempt.total_questions} (${attempt.percentage}%)</td>
            <td>${attempt.passed ? "Liberou" : "Revisar"}</td>
            <td>${wrong || "-"}</td>
          </tr>
        `;
      })
    );
  } catch (error) {
    teacherLoginMessage.textContent = `Erro ao carregar painel: ${error.message}`;
    teacherLoginMessage.className = "login-message error";
  }
}

teacherLoginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  teacherLoginMessage.textContent = "Entrando...";
  teacherLoginMessage.className = "login-message";

  try {
    const session = await loginTeacher(
      document.querySelector("#teacherFullName").value.trim(),
      document.querySelector("#teacherCpf").value
    );

    if (!session?.teacher_id) {
      throw new Error("Nome ou CPF invalidos.");
    }

    setTeacherSession(session);
    document.querySelector("#teacherCpf").value = "";
  } catch (error) {
    teacherLoginMessage.textContent = `Nao foi possivel entrar. ${error.message}`;
    teacherLoginMessage.className = "login-message error";
  }
});

teacherLogout?.addEventListener("click", clearTeacherSession);
applyTeacherSession(getTeacherSession());
