const fs = require("fs");
const path = require("path");

const config = {
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  courseSlug: process.env.COURSE_SLUG || "curso-ti-basico-bloco-1"
};

const target = path.join(__dirname, "..", "assets", "runtime-config.js");
const contents = `window.COURSE_CONFIG = ${JSON.stringify(config, null, 2)};\n`;

fs.writeFileSync(target, contents, "utf8");
console.log(`Runtime config written to ${target}`);
