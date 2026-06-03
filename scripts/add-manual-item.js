import { slugify, todayStamp, writeJson } from "./lib.js";

const [title, url = "", ...rest] = process.argv.slice(2);
if (!title) {
  console.error("Usage: npm run add -- \"Titulo\" \"https://fuente\" \"notas\"");
  process.exit(1);
}

const summary = rest.join(" ");
const file = `${todayStamp()}-${slugify(title)}.json`;
writeJson(`knowledge/manual/${file}`, {
  title,
  url,
  summary,
  tags: [],
  publishedAt: todayStamp()
});
console.log(`Added manual item: knowledge/manual/${file}`);

