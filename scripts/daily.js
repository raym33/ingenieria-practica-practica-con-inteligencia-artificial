import { run, todayStamp } from "./lib.js";

const stamp = process.argv[2] || todayStamp();
const steps = [
  ["node", ["scripts/sync-chapters.js"]],
  ["node", ["scripts/ingest.js"]],
  ["node", ["scripts/classify.js", stamp]],
  ["node", ["scripts/propose-changes.js", stamp]],
  ["node", ["scripts/build-book.js", stamp]],
  ["node", ["scripts/publish.js", stamp]],
  ["node", ["scripts/dashboard.js"]]
];

for (const [command, args] of steps) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  run(command, args, { stdio: "inherit" });
}

