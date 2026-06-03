import { run, todayStamp } from "./lib.js";

const stamp = process.argv[2] || todayStamp();
const steps = [
  ["node", ["scripts/ingest.js"]],
  ["node", ["scripts/classify.js", stamp]],
  ["node", ["scripts/propose-changes.js", stamp]],
  ["npm", ["run", "site:build"]],
  ["node", ["scripts/dashboard.js"]]
];

for (const [command, args] of steps) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  run(command, args, { stdio: "inherit" });
}
