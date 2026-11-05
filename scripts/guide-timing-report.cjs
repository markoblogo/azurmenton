#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

const duration = (...values) => values.find(value => typeof value === "number" && Number.isFinite(value) && value >= 0) ?? null;
function summarize(slug, timing, checks) {
  const totalWallMs = duration(timing.totalWallMs, timing.totalObservedElapsedMs, timing.totalElapsedMs);
  const qaMs = duration(checks.durationMs);
  const nonQaWallMs = totalWallMs !== null && qaMs !== null && qaMs <= totalWallMs ? totalWallMs - qaMs : null;
  return {
    slug, totalWallMs, qaMs, nonQaWallMs,
    activeLabourMs: duration(timing.activeLabourMs), ownerWaitMs: duration(timing.ownerWaitMs),
    qaRemovalUpperBound: nonQaWallMs > 0 ? totalWallMs / nonQaWallMs : null,
    initialFingerprintMs: duration(checks.initialFingerprintMs), finalFingerprintMs: duration(checks.finalFingerprintMs),
    checks: (checks.checks ?? []).map(check => ({ id: check.id, status: check.status, reused: check.reused === true, recordedDurationMs: duration(check.durationMs) })),
    note: "Non-QA wall time is not active labour. Reused gate durations describe their original executions. QA-removal ratio is a theoretical upper bound, not permission to skip checks or a forecast.",
  };
}
function report(directory) {
  const rows = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const folder = path.join(directory, entry.name);
    const read = file => {
      try { return JSON.parse(fs.readFileSync(path.join(folder, file), "utf8")); }
      catch (error) { if (error.code === "ENOENT") return null; throw error; }
    };
    const timing = read("publication-timing.json");
    const checks = read("workflow/checks.json");
    if (timing && checks) rows.push(summarize(entry.name, timing, checks));
  }
  return { generatedAt: new Date().toISOString(), publication: "not-performed", sampleSize: rows.length, rows };
}
module.exports = { summarize, report };
if (require.main === module) {
  try { console.log(JSON.stringify(report(path.join(__dirname, "../build/guide-intake")), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
