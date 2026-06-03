import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.js";

const downloads = "/Users/mac/Downloads";
const target = path.join(ROOT, "book/chapters");
fs.mkdirSync(target, { recursive: true });

const files = fs.readdirSync(downloads)
  .filter((file) => /^[0-9]{2}-.*\.md$/.test(file))
  .sort();

for (const file of files) {
  fs.copyFileSync(path.join(downloads, file), path.join(target, file));
}

console.log(`Synced ${files.length} chapter files into book/chapters.`);

