import fs from "node:fs";
import path from "node:path";
import { readJson, ROOT, run, todayStamp } from "./lib.js";

const config = readJson("config/book.json", {});
const stamp = process.argv[2] || todayStamp();
const chaptersDir = path.join(ROOT, "book/chapters");
const buildDir = path.join(ROOT, "build", stamp);
fs.mkdirSync(buildDir, { recursive: true });

function stripFrontMatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n+/, "");
}

function normalizeHeadings(text) {
  const lines = text.split("\n");
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

const chapterFiles = fs.readdirSync(chaptersDir)
  .filter((file) => /^[0-9]{2}-.*\.md$/.test(file))
  .sort();

const markdown = chapterFiles.map((file) => {
  const source = fs.readFileSync(path.join(chaptersDir, file), "utf8");
  return normalizeHeadings(stripFrontMatter(source).trim());
}).join("\n\n\\newpage\n\n");

const combinedMd = path.join(buildDir, "book.md");
const bodyTex = path.join(buildDir, "book-body.tex");
const mainTex = path.join(buildDir, "book-main.tex");
const styleTex = path.join(buildDir, "book-style.tex");
fs.writeFileSync(combinedMd, markdown);
fs.copyFileSync(path.join(ROOT, "templates/latex/book-style.tex"), styleTex);

run("pandoc", [
  combinedMd,
  "--from", "markdown+yaml_metadata_block+smart",
  "--to", "latex",
  "--top-level-division=chapter",
  "--listings",
  "-o", bodyTex
]);

fs.writeFileSync(mainTex, `\\documentclass[11pt,twoside,openright]{book}
\\input{book-style.tex}
\\begin{document}
\\frontmatter
\\BookCover
\\cleardoublepage
\\thispagestyle{empty}
\\vspace*{35mm}
{\\sffamily\\bfseries\\Huge\\color{DeepBlue} ${config.title}\\par}
\\vspace{6mm}
{\\sffamily\\Large\\color{Teal} ${config.subtitle}\\par}
\\vspace{18mm}
{\\sffamily\\large ${config.author}\\par}
{\\sffamily ${config.email}\\par}
\\vfill
{\\small Derechos: ${config.rights}.}
\\cleardoublepage
\\tableofcontents
\\mainmatter
\\input{book-body.tex}
\\backmatter
\\chapter*{Créditos}
\\addcontentsline{toc}{chapter}{Créditos}
Autor: ${config.author}\\\\
Email: ${config.email}\\\\
Derechos: ${config.rights}\\\\
Edición local: ${stamp}
\\end{document}
`);

run("tectonic", ["-X", "compile", mainTex, "--outdir", buildDir], { stdio: "inherit" });
const pdf = path.join(buildDir, "book-main.pdf");
const finalPdf = path.join(buildDir, `de-preguntar-a-construir-${stamp}.pdf`);
if (fs.existsSync(pdf)) fs.copyFileSync(pdf, finalPdf);
console.log(finalPdf);

