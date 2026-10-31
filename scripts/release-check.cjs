#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { projectChecks } = require("./lib/project-checks.cjs");
const { runCheckSuite, repositoryFingerprint } = require("./lib/guide-workflow.cjs");

async function main(args = process.argv.slice(2)) {
  if (args.some(arg => arg !== "--webpack") || args.length > 1) throw Error("Usage: npm run release:check -- [--webpack]");
  const root = path.resolve(__dirname, "..");
  const receiptPath = path.join(root, "build/release/checks.json");
  const receipt = await runCheckSuite({
    receiptPath, checks: projectChecks(root, { release: true, webpack: args.includes("--webpack") }),
    fingerprint: () => repositoryFingerprint(root),
    onStep: (id, status) => console.log(`${id}: ${status}`),
    execute: ({ id, argv }) => {
      const env = { ...process.env, ...(id === "browser" ? { PLAYWRIGHT_REUSE_SERVER: "0", PLAYWRIGHT_BASE_URL: "http://127.0.0.1:3100", PLAYWRIGHT_WEB_SERVER_COMMAND: "npm run start -- --hostname 127.0.0.1 --port 3100" } : {}) };
      try { return { code: 0, output: execFileSync(argv[0], argv.slice(1), { cwd: root, env, encoding: "utf8", timeout: 1_800_000, maxBuffer: 20_000_000 }) }; }
      catch (error) { return { code: typeof error.status === "number" ? error.status : 1, output: `${error.stdout ?? ""}${error.stderr ?? ""}\n${error.signal ?? error.message}` }; }
    },
  });
  console.log(`Release checks: ${receipt.ok ? "PASS" : "FAILED/STALE"}; build/release/checks.json. No commit, push, tag, deployment or release performed.`);
  return receipt.ok;
}
module.exports = { main };
if (require.main === module) main().then(ok => { if (!ok) process.exitCode = 1; }).catch(error => { console.error(error.message); process.exitCode = 1; });
