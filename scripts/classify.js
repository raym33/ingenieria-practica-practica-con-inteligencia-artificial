import fs from "node:fs";
import path from "node:path";
import { extractJsonObject, hash, listFiles, ollamaGenerate, readJson, ROOT, slugify, stripTags, todayStamp, writeJson } from "./lib.js";

const stamp = process.argv[2] || todayStamp();
const rawPath = path.join(ROOT, `knowledge/raw/${stamp}.json`);
if (!fs.existsSync(rawPath)) {
  console.error(`No raw ingest file found for ${stamp}. Run npm run ingest first.`);
  process.exit(1);
}

const existingUrls = new Set();
for (const file of listFiles("knowledge/items", /\.json$/)) {
  const item = readJson(`knowledge/items/${file}`);
  if (item?.url) existingUrls.add(item.url);
}

const raw = JSON.parse(fs.readFileSync(rawPath, "utf8"));
const created = [];
const maxAiCalls = Number(process.env.MAX_AI_CLASSIFY || 6);
let aiCalls = 0;

function heuristic(item) {
  const text = `${item.title} ${item.summary} ${(item.tags || []).join(" ")}`.toLowerCase();
  const tags = new Set(item.tags || []);
  const addIf = (tag, words) => {
    if (words.some((word) => text.includes(word))) tags.add(tag);
  };
  addIf("modelos", ["model", "llm", "gpt", "claude", "gemini", "llama", "mistral", "qwen"]);
  addIf("modelos-locales", ["gguf", "ollama", "lm studio", "mlx", "llama.cpp", "local model"]);
  addIf("hardware", ["gpu", "nvidia", "amd", "apple silicon", "vram", "mlx", "hardware", "cuda", "metal"]);
  addIf("rag", ["rag", "retrieval", "embedding", "embeddings", "vector", "rerank"]);
  addIf("embeddings", ["embedding", "embeddings", "sentence-similarity"]);
  addIf("reranking", ["rerank", "reranker"]);
  addIf("gguf", ["gguf"]);
  addIf("mlx", ["mlx"]);
  addIf("cuantizacion", ["quant", "quantization", "cuantizacion", "q4", "q5", "q6", "q8", "awq", "gptq"]);
  addIf("inferencia", ["inference", "inferencia", "vllm", "tgi", "sglang", "llama.cpp"]);
  addIf("agentes", ["agent", "agents", "tool use", "computer use", "codex"]);
  addIf("codex", ["codex"]);
  addIf("claude", ["claude", "anthropic"]);
  addIf("openai", ["openai", "gpt"]);
  return {
    type: item.sourceType === "arxiv" ? "paper" : item.sourceType === "huggingface-model" ? "model" : item.sourceType.includes("github") ? "repo_release" : "news",
    relevance: tags.size > (item.tags || []).length ? "media" : "baja",
    confidence: item.sourceType === "manual" ? "media" : item.sourceType === "arxiv" ? "media" : "alta",
    volatility: ["modelos", "hardware"].some((tag) => tags.has(tag)) ? "alta" : "media",
    tags: [...tags],
    editorialAction: "guardar_para_contexto",
    summary: stripTags(item.summary).slice(0, 900)
  };
}

for (const item of raw.items) {
  if (item.url && existingUrls.has(item.url)) continue;

  const base = heuristic(item);
  const shouldAskAi = aiCalls < maxAiCalls && base.relevance !== "baja";
  const prompt = `Eres editor técnico de un libro vivo sobre ingeniería con IA.
Clasifica esta novedad y responde SOLO JSON válido con:
type: news|paper|repo_release|x_post|benchmark|hardware|model|tool
relevance: alta|media|baja
confidence: alta|media|baja
volatility: alta|media|baja
tags: array corto
editorialAction: ignorar|guardar_para_contexto|nota_breve|actualizar_seccion|nueva_subseccion|revision_humana
summary: resumen en español de 2 frases
whyItMatters: una frase

Novedad:
Titulo: ${item.title}
Fuente: ${item.sourceName}
URL: ${item.url}
Tags iniciales: ${(item.tags || []).join(", ")}
Resumen: ${stripTags(item.summary).slice(0, 2500)}`;

  const ai = shouldAskAi ? extractJsonObject(await ollamaGenerate(prompt, { temperature: 0.1, numCtx: 8192 })) : null;
  if (shouldAskAi) aiCalls += 1;
  const classified = { ...base, ...(ai || {}) };
  const id = `${stamp}-${slugify(item.title || item.rawId)}-${hash(item.rawId)}`;
  const knowledgeItem = {
    id,
    createdAt: new Date().toISOString(),
    sourceId: item.sourceId,
    sourceName: item.sourceName,
    sourceType: item.sourceType,
    title: item.title,
    url: item.url,
    publishedAt: item.publishedAt,
    ...classified,
    rawSummary: stripTags(item.summary).slice(0, 3000),
    status: classified.editorialAction === "ignorar" ? "archivado" : "pendiente_revision"
  };
  writeJson(`knowledge/items/${id}.json`, knowledgeItem);
  created.push(knowledgeItem);
}

console.log(`Classified ${created.length} new knowledge items for ${stamp}. AI calls: ${aiCalls}.`);
