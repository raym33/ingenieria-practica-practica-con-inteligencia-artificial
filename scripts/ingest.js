import fs from "node:fs";
import path from "node:path";
import { fetchText, hash, parseRss, readJson, ROOT, todayStamp, writeJson } from "./lib.js";

const sources = readJson("config/sources.json", {});
const stamp = todayStamp();
const items = [];
const errors = [];
const maxAgeDays = Number(process.env.MAX_AGE_DAYS || sources.defaults?.maxAgeDays || 14);
const maxItemsPerSource = Number(process.env.MAX_ITEMS_PER_SOURCE || sources.defaults?.maxItemsPerSource || 25);

function recentEnough(item) {
  const rawDate = item.publishedAt || "";
  const time = Date.parse(rawDate);
  if (!Number.isFinite(time)) return true;
  const ageMs = Date.now() - time;
  return ageMs <= maxAgeDays * 24 * 60 * 60 * 1000;
}

function keepFresh(sourceItems) {
  return sourceItems.filter(recentEnough).slice(0, maxItemsPerSource);
}

for (const source of sources.rss || []) {
  if (source.enabled === false) continue;
  try {
    const xml = await fetchText(source.url);
    items.push(...keepFresh(parseRss(xml, source)));
  } catch (error) {
    errors.push({ source: source.id, type: "rss", error: String(error.message || error) });
  }
}

for (const source of sources.github || []) {
  if (source.enabled === false) continue;
  try {
    const json = JSON.parse(await fetchText(`https://api.github.com/repos/${source.repo}/releases?per_page=5`));
    for (const release of json.slice(0, maxItemsPerSource)) {
      items.push({
        rawId: hash(`${source.id}:${release.html_url}`),
        sourceId: source.id,
        sourceName: source.repo,
        sourceType: "github-release",
        title: release.name || release.tag_name,
        url: release.html_url,
        publishedAt: release.published_at,
        summary: release.body || "",
        tags: source.tags || []
      });
    }
  } catch (error) {
    errors.push({ source: source.id, type: "github", error: String(error.message || error) });
  }
}

for (const source of sources.huggingfaceModels || []) {
  if (source.enabled === false) continue;
  try {
    const params = new URLSearchParams();
    if (source.filter) params.set("filter", source.filter);
    if (source.search) params.set("search", source.search);
    if (source.sort) params.set("sort", source.sort);
    if (source.direction) params.set("direction", String(source.direction));
    params.set("limit", String(source.limit || maxItemsPerSource));

    const models = JSON.parse(await fetchText(`https://huggingface.co/api/models?${params.toString()}`));
    const minDownloads = Number(source.minDownloads || 0);
    for (const model of models.slice(0, source.limit || maxItemsPerSource)) {
      const downloads = Number(model.downloads || 0);
      if (downloads < minDownloads) continue;
      const modelId = model.modelId || model.id;
      const modelTags = [...new Set([...(source.tags || []), ...inferHuggingFaceTags(model)])];
      items.push({
        rawId: hash(`${source.id}:${modelId}:${model.lastModified || model.createdAt || ""}`),
        sourceId: source.id,
        sourceName: source.name,
        sourceType: "huggingface-model",
        title: modelId,
        url: `https://huggingface.co/${modelId}`,
        publishedAt: model.lastModified || model.createdAt || stamp,
        summary: summarizeHuggingFaceModel(model),
        tags: modelTags
      });
    }
  } catch (error) {
    errors.push({ source: source.id, type: "huggingface-model", error: String(error.message || error) });
  }
}

for (const source of sources.arxiv || []) {
  if (source.enabled === false) continue;
  try {
    await sleep(3500);
    const query = encodeURIComponent(`all:${source.query}`);
    const xml = await fetchText(`https://export.arxiv.org/api/query?search_query=${query}&sortBy=submittedDate&sortOrder=descending&max_results=${source.maxResults || 10}`);
    items.push(...keepFresh(parseRss(xml, {
      id: source.id,
      name: `arXiv: ${source.query}`,
      tags: source.tags || []
    }).map((item) => ({ ...item, sourceType: "arxiv" }))));
  } catch (error) {
    errors.push({ source: source.id, type: "arxiv", error: String(error.message || error) });
  }
}

function inferHuggingFaceTags(model) {
  const text = `${model.modelId || model.id || ""} ${(model.tags || []).join(" ")} ${model.pipeline_tag || ""} ${model.library_name || ""}`.toLowerCase();
  const tags = [];
  const add = (tag, words) => {
    if (words.some((word) => text.includes(word))) tags.push(tag);
  };
  add("gguf", ["gguf"]);
  add("mlx", ["mlx"]);
  add("ollama", ["ollama"]);
  add("cuantizacion", ["quant", "q4", "q5", "q6", "q8", "awq", "gptq", "gguf"]);
  add("embeddings", ["embedding", "sentence-similarity"]);
  add("reranking", ["rerank", "reranker"]);
  add("multimodal", ["vision", "vlm", "image-text-to-text", "multimodal"]);
  add("codigo", ["code", "coder", "programming"]);
  add("audio", ["audio", "speech", "whisper"]);
  add("seguridad", ["guard", "safety", "moderation"]);
  return tags;
}

function summarizeHuggingFaceModel(model) {
  const fields = [
    `Modelo: ${model.modelId || model.id}`,
    model.pipeline_tag ? `pipeline: ${model.pipeline_tag}` : "",
    model.library_name ? `librería: ${model.library_name}` : "",
    Number.isFinite(Number(model.downloads)) ? `descargas: ${model.downloads}` : "",
    Number.isFinite(Number(model.likes)) ? `likes: ${model.likes}` : "",
    model.lastModified ? `última modificación: ${model.lastModified}` : "",
    (model.tags || []).length ? `tags: ${(model.tags || []).slice(0, 16).join(", ")}` : ""
  ].filter(Boolean);
  return fields.join(". ");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const manualDir = path.join(ROOT, "knowledge/manual");
if (fs.existsSync(manualDir)) {
  for (const file of fs.readdirSync(manualDir).filter((name) => name.endsWith(".json"))) {
    const manual = JSON.parse(fs.readFileSync(path.join(manualDir, file), "utf8"));
    items.push({
      rawId: manual.rawId || hash(`${manual.title}:${manual.url || file}`),
      sourceId: "manual",
      sourceName: "Manual inbox",
      sourceType: "manual",
      title: manual.title,
      url: manual.url || "",
      publishedAt: manual.publishedAt || stamp,
      summary: manual.summary || manual.notes || "",
      tags: manual.tags || []
    });
  }
}

const unique = [...new Map(items.map((item) => [item.rawId, item])).values()];
writeJson(`knowledge/raw/${stamp}.json`, { stamp, count: unique.length, errors, items: unique });
console.log(`Ingested ${unique.length} raw items. Errors: ${errors.length}. Window: ${maxAgeDays} days, ${maxItemsPerSource}/source.`);
