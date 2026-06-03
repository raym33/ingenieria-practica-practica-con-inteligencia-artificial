import fs from "node:fs";
import path from "node:path";
import { listFiles, readJson, ROOT } from "./lib.js";

const items = listFiles("knowledge/items", /\.json$/)
  .map((file) => readJson(`knowledge/items/${file}`))
  .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
  .slice(0, 80);

const reports = listFiles("editorial/daily-reports", /\.md$/).reverse().slice(0, 20);
const releases = fs.existsSync(path.join(ROOT, "releases"))
  ? fs.readdirSync(path.join(ROOT, "releases")).filter((name) => /^\d{4}-\d{2}-\d{2}$/.test(name)).sort().reverse()
  : [];

const html = `<!doctype html>
<html lang="es">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Radar vivo - De preguntar a construir</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:0;color:#172033;background:#fffdf8}
header{background:#12355b;color:#fffdf8;padding:28px 36px;border-bottom:6px solid #f2b84b}
main{padding:28px 36px;max-width:1180px;margin:auto}
h1,h2{margin:0 0 12px} h2{color:#0e7c7b;margin-top:28px}
.grid{display:grid;grid-template-columns:1.5fr 1fr;gap:24px}.card{border:1px solid #c8d6e5;border-radius:6px;padding:14px 16px;background:#f5f7fa;margin:10px 0}
.meta{font-size:13px;color:#475569}.tag{display:inline-block;background:#e6f4f1;color:#0e7c7b;padding:2px 7px;border-radius:4px;margin:2px;font-size:12px}
a{color:#12355b}@media(max-width:800px){.grid{grid-template-columns:1fr}main,header{padding:20px}}
</style>
<header><h1>Radar vivo</h1><div>De preguntar a construir - sistema editorial local</div></header>
<main>
<div class="grid">
<section><h2>Últimos items de conocimiento</h2>
${items.map((item) => `<article class="card"><h3>${escapeHtml(item.title)}</h3><div class="meta">${escapeHtml(item.sourceName || "")} · ${escapeHtml(item.relevance || "")} · ${escapeHtml(item.confidence || "")}</div><p>${escapeHtml(item.summary || item.rawSummary || "").slice(0, 420)}</p><div>${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>${item.url ? `<p><a href="${escapeHtml(item.url)}">Fuente</a></p>` : ""}</article>`).join("\n")}
</section>
<aside><h2>Informes</h2>${reports.map((file) => `<p><a href="../editorial/daily-reports/${file}">${file}</a></p>`).join("")}<h2>Releases</h2>${releases.map((dir) => `<p><a href="../releases/${dir}/">${dir}</a></p>`).join("")}</aside>
</div>
</main></html>`;

fs.writeFileSync(path.join(ROOT, "dashboard/index.html"), html);
console.log(path.join(ROOT, "dashboard/index.html"));

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[ch]));
}

