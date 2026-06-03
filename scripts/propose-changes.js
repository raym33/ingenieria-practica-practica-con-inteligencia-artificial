import fs from "node:fs";
import path from "node:path";
import { listFiles, ollamaGenerate, readJson, ROOT, todayStamp } from "./lib.js";

const stamp = process.argv[2] || todayStamp();
const chapterMap = readJson("config/chapter-map.json", {});
const raw = readJson(`knowledge/raw/${stamp}.json`, { items: [] });
const rawUrls = new Set(raw.items.map((item) => item.url).filter(Boolean));
const rawTitles = new Set(raw.items.map((item) => item.title).filter(Boolean));
const items = listFiles("knowledge/items", /\.json$/)
  .map((file) => readJson(`knowledge/items/${file}`))
  .filter((item) => rawUrls.has(item.url) || rawTitles.has(item.title))
  .filter((item) => item.status !== "archivado");

function targetChapters(item) {
  const chapters = new Set();
  for (const tag of item.tags || []) {
    for (const chapter of chapterMap[tag] || []) chapters.add(chapter);
  }
  return [...chapters].slice(0, 5);
}

const proposals = [];
const maxAiCalls = Number(process.env.MAX_AI_PROPOSALS || 6);
let aiCalls = 0;
for (const item of items) {
  const chapters = targetChapters(item);
  if (!chapters.length || item.relevance === "baja") continue;
  const prompt = `Eres editor de un libro vivo sobre IA. Propón un cambio editorial breve.
No escribas el capítulo entero. Responde en español con:
- tipo de cambio
- capítulo destino
- texto sugerido de 1 a 3 párrafos
- cautelas o fuentes que revisar

Novedad: ${item.title}
Resumen: ${item.summary}
Importancia: ${item.whyItMatters || ""}
URL: ${item.url}
Capítulos candidatos: ${chapters.join(", ")}`;
  const shouldAskAi = aiCalls < maxAiCalls && item.relevance !== "baja";
  const aiText = shouldAskAi ? await ollamaGenerate(prompt, { temperature: 0.25, numCtx: 8192 }) : null;
  if (shouldAskAi) aiCalls += 1;
  proposals.push({
    itemId: item.id,
    title: item.title,
    url: item.url,
    relevance: item.relevance,
    confidence: item.confidence,
    editorialAction: item.editorialAction,
    tags: item.tags || [],
    targetChapters: chapters,
    suggestion: aiText || `Añadir una nota breve sobre "${item.title}" en ${chapters[0]}. Revisar la fuente antes de incorporarla a la edición pública.`
  });
}

const reportLines = [
  `# Informe editorial diario - ${stamp}`,
  "",
  `Items revisados: ${items.length}`,
  `Propuestas generadas: ${proposals.length}`,
  "",
  "## Propuestas",
  ""
];

for (const proposal of proposals) {
  reportLines.push(`### ${proposal.title}`);
  reportLines.push("");
  reportLines.push(`- Relevancia: ${proposal.relevance}`);
  reportLines.push(`- Confianza: ${proposal.confidence}`);
  reportLines.push(`- Acción: ${proposal.editorialAction}`);
  reportLines.push(`- Capítulos: ${proposal.targetChapters.join(", ")}`);
  if (proposal.url) reportLines.push(`- Fuente: ${proposal.url}`);
  reportLines.push("");
  reportLines.push(proposal.suggestion.trim());
  reportLines.push("");
}

const reportPath = path.join(ROOT, `editorial/daily-reports/${stamp}.md`);
const proposalPath = path.join(ROOT, `editorial/change-proposals/${stamp}.json`);
fs.writeFileSync(reportPath, `${reportLines.join("\n")}\n`);
fs.writeFileSync(proposalPath, `${JSON.stringify({ stamp, proposals }, null, 2)}\n`);
console.log(`Created ${proposals.length} proposals. AI calls: ${aiCalls}.`);
console.log(reportPath);
