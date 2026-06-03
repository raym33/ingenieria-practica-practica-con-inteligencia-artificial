import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

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
  .filter((item) => item.sourceType === "huggingface-model" || (item.tags || []).some((tag) => ["modelos", "modelos-locales", "gguf", "mlx", "embeddings"].includes(tag)))
  .sort((a, b) => {
    const sourceScore = (item) => item.sourceType === "huggingface-model" ? 0 : 1;
    return sourceScore(a) - sourceScore(b) || String(b.createdAt || b.publishedAt).localeCompare(String(a.createdAt || a.publishedAt));
  })
  .slice(0, 80);

fs.writeFileSync(path.join(dataDir, "models.json"), JSON.stringify(modelRadar, null, 2));

const latestRelease = path.join(projectRoot, "releases/latest");
if (fs.existsSync(latestRelease)) {
  const pdf = fs.readdirSync(latestRelease).find((file) => file.endsWith(".pdf"));
  if (pdf) fs.copyFileSync(path.join(latestRelease, pdf), path.join(downloadsDir, "de-preguntar-a-construir.pdf"));
}

console.log(`Generated ${chapters.length} chapters, ${radar.length} radar items and ${modelRadar.length} model items.`);
