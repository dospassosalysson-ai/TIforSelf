const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp"
};

function send(res, status, body, contentType = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": status >= 400 ? "no-store" : "no-cache"
  });
  res.end(body);
}

function sendJson(res, status, value) {
  send(res, status, JSON.stringify(value), "application/json; charset=utf-8");
}

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

function supabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase nao configurado no Render.");
  }

  return { supabaseUrl: supabaseUrl.replace(/\/$/, ""), supabaseAnonKey };
}

async function callSupabaseRpc(functionName, payload, prefer = "return=representation") {
  const { supabaseUrl, supabaseAnonKey } = supabaseConfig();
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": supabaseAnonKey,
      "Authorization": `Bearer ${supabaseAnonKey}`,
      "Prefer": prefer
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || `Erro HTTP ${response.status}`);
  }

  if (!text) return null;
  return JSON.parse(text);
}

function firstRow(value) {
  return Array.isArray(value) ? value[0] || null : value;
}

async function handleApi(req, res) {
  try {
    const body = await readJson(req);

    if (req.url === "/api/student/login") {
      const rows = await callSupabaseRpc("authenticate_student", {
        p_full_name: body.fullName,
        p_cpf: body.cpf
      });
      return sendJson(res, 200, firstRow(rows));
    }

    if (req.url === "/api/student/progress") {
      const rows = await callSupabaseRpc("get_student_progress", {
        p_session_token: body.sessionToken
      });
      return sendJson(res, 200, rows || []);
    }

    if (req.url === "/api/student/attempt") {
      const rows = await callSupabaseRpc("submit_lesson_attempt", {
        p_session_token: body.sessionToken,
        p_lesson_id: body.lessonId,
        p_lesson_title: body.lessonTitle,
        p_score: body.score,
        p_total_questions: body.totalQuestions,
        p_answers: body.answers || {},
        p_wrong_items: body.wrongItems || []
      });
      return sendJson(res, 200, firstRow(rows));
    }

    if (req.url === "/api/student/retention") {
      await callSupabaseRpc("submit_retention_submission", {
        p_session_token: body.sessionToken,
        p_score: body.score,
        p_total_questions: body.totalQuestions,
        p_correct_count: body.correctCount,
        p_wrong_count: body.wrongCount,
        p_missing_count: body.missingCount,
        p_percentage: body.percentage,
        p_answers: body.answers || {},
        p_review_items: body.reviewItems || [],
        p_user_agent: body.userAgent || "",
        p_page_url: body.pageUrl || ""
      }, "return=minimal");
      return sendJson(res, 200, { ok: true });
    }

    if (req.url === "/api/teacher/login") {
      const rows = await callSupabaseRpc("authenticate_teacher", {
        p_full_name: body.fullName,
        p_cpf: body.cpf
      });
      return sendJson(res, 200, firstRow(rows));
    }

    if (req.url === "/api/teacher/dashboard") {
      const dashboard = await callSupabaseRpc("get_teacher_dashboard", {
        p_session_token: body.sessionToken
      });
      return sendJson(res, 200, dashboard || {});
    }

    return sendJson(res, 404, { error: "Rota nao encontrada." });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Nao foi possivel conectar ao servidor do curso. Tente novamente." });
  }
}

function serveStatic(req, res) {
  const requestPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root)) {
    return send(res, 403, "Acesso negado.", "text/plain; charset=utf-8");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      return send(res, 404, "Arquivo nao encontrado.", "text/plain; charset=utf-8");
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600"
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url.startsWith("/api/")) {
    return handleApi(req, res);
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return sendJson(res, 405, { error: "Metodo nao permitido." });
  }

  return serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Curso de TI rodando na porta ${port}`);
});
