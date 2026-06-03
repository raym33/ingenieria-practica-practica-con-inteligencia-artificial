import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const ROOT = path.resolve(new URL("..", import.meta.url).pathname);

export function readJson(relativePath, fallback = null) {
  const file = path.join(ROOT, relativePath);
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeJson(relativePath, value) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function todayStamp(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: process.env.BOOK_TIME_ZONE || "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(date);
}

export function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

export function hash(input) {
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 16);
}

export function listFiles(relativeDir, pattern = /.*/) {
  const dir = path.join(ROOT, relativeDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => pattern.test(file)).sort();
}

export function stripTags(html = "") {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchText(url, timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "living-book-radar/0.1" }
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

export function parseRss(xml, source) {
  const chunks = [...xml.matchAll(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/g)].map((m) => m[0]);
  return chunks.map((chunk) => {
    const pick = (...names) => {
      for (const name of names) {
        const match = chunk.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
        if (match) return stripTags(match[1]);
      }
      return "";
    };
    const href = chunk.match(/<link[^>]+href="([^"]+)"/i)?.[1];
    const link = pick("link") || href || "";
    return {
      rawId: hash(`${source.id}:${link || pick("title")}`),
      sourceId: source.id,
      sourceName: source.name,
      sourceType: "rss",
      title: pick("title"),
      url: link,
      publishedAt: pick("pubDate", "published", "updated"),
      summary: pick("description", "summary", "content"),
      tags: source.tags || []
    };
  }).filter((item) => item.title);
}

export async function ollamaGenerate(prompt, options = {}) {
  const config = readJson("config/book.json", {});
  if (!config.ollama?.enabled) return null;
  const host = process.env.OLLAMA_HOST || config.ollama.host;
  const model = process.env.OLLAMA_MODEL || options.model || config.ollama.model;
  const body = {
    model,
    prompt,
    stream: false,
    options: { temperature: options.temperature ?? 0.2, num_ctx: options.numCtx ?? 8192 }
  };
  try {
    const response = await fetch(`${host}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok && config.ollama.fallbackModel && config.ollama.fallbackModel !== model) {
      return ollamaGenerate(prompt, { ...options, model: config.ollama.fallbackModel });
    }
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const json = await response.json();
    return json.response?.trim() || null;
  } catch (error) {
    return null;
  }
}

export function extractJsonObject(text) {
  if (!text) return null;
  const fenced = text.match(/```json\s*([\s\S]*?)```/i)?.[1];
  const raw = fenced || text.match(/\{[\s\S]*\}/)?.[0];
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: ROOT,
    stdio: options.stdio || "pipe",
    encoding: "utf8"
  });
}
