import fs from "node:fs";
import path from "node:path";
import { ROOT, todayStamp } from "./lib.js";

const stamp = process.argv[2] || todayStamp();
const buildDir = path.join(ROOT, "build", stamp);
const releaseDir = path.join(ROOT, "releases", stamp);
fs.mkdirSync(releaseDir, { recursive: true });

const wanted = [
  `de-preguntar-a-construir-${stamp}.pdf`,
  "book.md",
  "book-main.tex",
  "book-style.tex",
  "book-body.tex"
];

for (const file of wanted) {
  const source = path.join(buildDir, file);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(releaseDir, file));
}

const latestDir = path.join(ROOT, "releases", "latest");
fs.rmSync(latestDir, { recursive: true, force: true });
fs.mkdirSync(latestDir, { recursive: true });
for (const file of fs.readdirSync(releaseDir)) {
  fs.copyFileSync(path.join(releaseDir, file), path.join(latestDir, file));
}

console.log(`Published local release: ${releaseDir}`);

