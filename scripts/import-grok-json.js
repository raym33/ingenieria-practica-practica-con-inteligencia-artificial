import fs from "node:fs";
import path from "node:path";
import { hash, ROOT, slugify, todayStamp, writeJson } from "./lib.js";

const [inputPath] = process.argv.slice(2);
if (!inputPath) {
  console.error("Usage: node scripts/import-grok-json.js path/to/grok-items.json");
  process.exit(1);
}

const absolute = path.isAbsolute(inputPath) ? inputPath : path.join(ROOT, inputPath);
if (!fs.existsSync(absolute)) {
  console.error(`File not found: ${absolute}`);
  process.exit(1);
}

const parsed = JSON.parse(fs.readFileSync(absolute, "utf8"));
const items = Array.isArray(parsed) ? parsed : parsed.items || parsed.signals || [];
if (!Array.isArray(items) || items.length === 0) {
  console.error("Expected a JSON array, or an object with items/signals array.");
  process.exit(1);
}

let count = 0;
for (const item of items) {
  if (!item.title || !item.summary) continue;
  const publishedAt = item.publishedAt || todayStamp();
  const file = `${publishedAt}-${slugify(item.title)}-${hash(`${item.title}:${item.url || count}`)}.json`;
  writeJson(`knowledge/manual/${file}`, {
    rawId: hash(`grok:${item.title}:${item.url || item.summary}`),
    title: item.title,
    url: item.url || "",
    publishedAt,
    summary: item.summary,
    notes: item.target ? `Destino sugerido: ${item.target}` : "",
    tags: [...new Set(["x", "grok", ...(item.tags || [])])],
    relevance: item.relevance,
    confidence: item.confidence,
    editorialAction: item.editorialAction
  });
  count += 1;
}

console.log(`Imported ${count} Grok/X items into knowledge/manual.`);
