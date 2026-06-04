import { articles } from "./articles";

export const TAG_VOCAB = [
  "Apple Silicon",
  "NVIDIA RTX",
  "AMD",
  "Ollama",
  "MLX",
  "llama.cpp",
  "vLLM",
  "RAG",
  "Agentes",
  "SaaS",
  "Benchmarks",
  "Inferencia local",
  "Modelos locales",
  "Seguridad",
  "Hardware",
  "Compra"
];

export function tagSlug(name) {
  return String(name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllTags() {
  const counts = new Map();
  for (const article of articles) {
    for (const tag of article.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return TAG_VOCAB
    .filter((name) => counts.has(name))
    .map((name) => ({ name, slug: tagSlug(name), count: counts.get(name) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "es"));
}

export function getArticlesByTag(slug) {
  return articles.filter((article) => (article.tags || []).some((tag) => tagSlug(tag) === slug));
}
