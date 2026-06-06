import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { articles } from "../lib/articles.js";
import { comparativas } from "../lib/comparativas.js";
import { fichas } from "../lib/fichas.js";

const siteRoot = path.resolve(new URL("..", import.meta.url).pathname);
const projectRoot = path.resolve(siteRoot, "..");
const chaptersDir = path.join(projectRoot, "book/chapters");
const dataDir = path.join(siteRoot, "public/data");
const downloadsDir = path.join(siteRoot, "public/downloads");

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(downloadsDir, { recursive: true });

marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false
});

function stripFrontMatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n+/, "");
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~\-[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeadings(markdown) {
  const lines = markdown.split("\n");
  let inFence = false;
  let firstH1Seen = false;
  return lines.map((line) => {
    if (/^```/.test(line.trim())) inFence = !inFence;
    if (inFence) return line;
    if (/^# /.test(line)) {
      if (!firstH1Seen) {
        firstH1Seen = true;
        return line;
      }
      return `## ${line.slice(2)}`;
    }
    return line;
  }).join("\n");
}

const files = fs.readdirSync(chaptersDir)
  .filter((file) => /^[0-9]{2}-.*\.md$/.test(file))
  .sort();

const chapters = files.map((file, index) => {
  const raw = fs.readFileSync(path.join(chaptersDir, file), "utf8");
  const body = normalizeHeadings(stripFrontMatter(raw).trim());
  const title = body.match(/^#\s+(.+)$/m)?.[1] || file.replace(/\.md$/, "");
  const bodyWithoutTitle = body.replace(/^#\s+.+\n+/, "");
  const text = plainText(bodyWithoutTitle);
  const html = marked.parse(body);
  const sections = [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1]);
  return {
    order: index,
    file,
    slug: file.replace(/\.md$/, ""),
    title,
    shortTitle: title.replace(/^Capítulo\s+(\d+)\s+—\s+/, "C$1 · "),
    excerpt: text.slice(0, 220),
    readingTime: Math.max(4, Math.round(text.split(/\s+/).length / 230)),
    sectionCount: sections.length,
    sections,
    searchText: text.slice(0, 12000),
    html
  };
});

fs.writeFileSync(path.join(dataDir, "chapters.json"), JSON.stringify(chapters, null, 2));

const itemDir = path.join(projectRoot, "knowledge/items");
const manualDir = path.join(projectRoot, "knowledge/manual");
const manualRadar = fs.existsSync(manualDir)
  ? fs.readdirSync(manualDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const item = JSON.parse(fs.readFileSync(path.join(manualDir, file), "utf8"));
      const publishedAt = item.publishedAt || "";
      return {
        id: item.rawId || file.replace(/\.json$/, ""),
        createdAt: item.createdAt || (publishedAt.length === 10 ? `${publishedAt}T23:59:59.000Z` : publishedAt),
        sourceId: "manual",
        sourceName: "Radar editorial",
        sourceType: "manual",
        title: item.title,
        url: item.url || "",
        publishedAt,
        type: item.type || "x_post",
        relevance: item.relevance || "media",
        confidence: item.confidence || "media",
        volatility: item.volatility || "alta",
        tags: item.tags || [],
        editorialAction: item.editorialAction || "guardar_para_contexto",
        summary: item.summary || item.notes || "",
        rawSummary: item.summary || item.notes || "",
        status: item.status || "pendiente_revision"
      };
    })
  : [];
let radar = fs.existsSync(itemDir)
  ? fs.readdirSync(itemDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(itemDir, file), "utf8")))
    .filter((item) => item.status !== "archivado")
    .sort((a, b) => String(b.createdAt || b.publishedAt).localeCompare(String(a.createdAt || a.publishedAt)))
    .slice(0, 60)
  : [];

if (manualRadar.length) {
  const seen = new Set(radar.map((item) => item.url || item.id || item.title));
  radar = [...manualRadar.filter((item) => !seen.has(item.url || item.id || item.title)), ...radar]
    .sort((a, b) => String(b.createdAt || b.publishedAt).localeCompare(String(a.createdAt || a.publishedAt)))
    .slice(0, 60);
}

if (radar.length === 0) {
  const proposalDir = path.join(projectRoot, "editorial/change-proposals");
  const latestProposal = fs.existsSync(proposalDir)
    ? fs.readdirSync(proposalDir).filter((file) => file.endsWith(".json")).sort().pop()
    : null;
  if (latestProposal) {
    const report = JSON.parse(fs.readFileSync(path.join(proposalDir, latestProposal), "utf8"));
    radar = (report.proposals || []).slice(0, 60).map((proposal) => ({
      id: proposal.itemId || proposal.title,
      title: proposal.title,
      url: proposal.url,
      summary: proposal.suggestion,
      tags: proposal.tags || []
    }));
  }
}

fs.writeFileSync(path.join(dataDir, "radar.json"), JSON.stringify(radar, null, 2));

const modelRadar = radar
  .filter((item) => item.sourceType === "huggingface-model" || (item.tags || []).some((tag) => ["modelos", "modelos locales", "modelos-locales", "gguf", "mlx", "embeddings", "reranking"].includes(String(tag).toLowerCase())))
  .sort((a, b) => {
    const sourceScore = (item) => item.sourceType === "huggingface-model" ? 0 : 1;
    return sourceScore(a) - sourceScore(b) || String(b.createdAt || b.publishedAt).localeCompare(String(a.createdAt || a.publishedAt));
  })
  .slice(0, 80);

fs.writeFileSync(path.join(dataDir, "models.json"), JSON.stringify(modelRadar, null, 2));

const cleanText = (value) => String(value || "")
  .replace(/https?:\/\/\S+/g, " ")
  .replace(/[#*_`>~]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const searchEntries = [
  ...chapters.map((chapter) => ({
    type: "Capítulo",
    title: chapter.title,
    summary: chapter.excerpt,
    href: `/leer/${chapter.slug}/`,
    tags: ["libro", "academia", ...chapter.sections.slice(0, 4).map(slugify)],
    text: cleanText(`${chapter.title} ${chapter.excerpt} ${chapter.searchText}`)
  })),
  ...articles.map((article) => ({
    type: article.section,
    title: article.title,
    summary: article.deck,
    href: `/articulos/${article.slug}/`,
    tags: [slugify(article.section), ...article.sources.map(([label]) => slugify(label)).slice(0, 4)],
    text: cleanText(`${article.title} ${article.deck} ${article.verdict} ${article.body.map((section) => `${section.heading} ${section.text}`).join(" ")}`)
  })),
  ...comparativas.map((comparativa) => ({
    type: "Comparador",
    title: comparativa.title,
    summary: comparativa.deck,
    href: `/comparar/#${comparativa.slug}`,
    tags: [slugify(comparativa.categoria), ...comparativa.opciones.map((opcion) => slugify(opcion.nombre)).slice(0, 4)],
    text: cleanText(`${comparativa.title} ${comparativa.deck} ${comparativa.veredicto} ${comparativa.comoDecidir.join(" ")} ${comparativa.opciones.map((opcion) => `${opcion.nombre} ${opcion.etiqueta} ${opcion.ideal} ${opcion.evitar}`).join(" ")}`)
  })),
  ...fichas.map((ficha) => ({
    type: "Ficha",
    title: `${ficha.marca} ${ficha.nombre}`,
    summary: ficha.veredicto,
    href: "/fichas/",
    tags: [slugify(ficha.tipo), slugify(ficha.etiqueta), ...ficha.runtimes.map(slugify).slice(0, 4)],
    text: cleanText(`${ficha.marca} ${ficha.nombre} ${ficha.tipo} ${ficha.memoria} ${ficha.aceleracion} ${ficha.usoRecomendado} ${ficha.modelos} ${ficha.limitaciones} ${ficha.veredicto}`)
  })),
  ...radar.slice(0, 40).map((item) => ({
    type: "Radar",
    title: item.title,
    summary: cleanText(item.summary || item.rawSummary).slice(0, 260),
    href: item.url || "/radar/",
    tags: item.tags || [],
    text: cleanText(`${item.title} ${item.summary || item.rawSummary || ""} ${(item.tags || []).join(" ")}`)
  })),
  ...modelRadar.slice(0, 40).map((item) => ({
    type: "Modelo",
    title: item.title,
    summary: cleanText(item.summary || item.rawSummary).slice(0, 260),
    href: item.url || "/modelos/",
    tags: item.tags || [],
    text: cleanText(`${item.title} ${item.summary || item.rawSummary || ""} ${(item.tags || []).join(" ")}`)
  }))
];

const seenSearchItems = new Set();
const searchIndex = searchEntries.filter((item) => {
  const key = `${item.href}::${item.title}`.toLowerCase();
  if (seenSearchItems.has(key)) return false;
  seenSearchItems.add(key);
  return true;
});

fs.writeFileSync(path.join(dataDir, "search.json"), JSON.stringify(searchIndex, null, 2));

const latestRelease = path.join(projectRoot, "releases/latest");
if (fs.existsSync(latestRelease)) {
  const pdf = fs.readdirSync(latestRelease).find((file) => file.endsWith(".pdf"));
  if (pdf) fs.copyFileSync(path.join(latestRelease, pdf), path.join(downloadsDir, "de-preguntar-a-construir.pdf"));
}

console.log(`Generated ${chapters.length} chapters, ${radar.length} radar items, ${modelRadar.length} model items and ${searchIndex.length} search items.`);
