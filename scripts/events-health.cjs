#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { eventSources } = require("../src/content/event-sources.ts");
const { publishedEventRecords } = require("../src/content/events/published/index.ts");
const { buildEventHealthReport } = require("../src/lib/events-health.ts");

function arg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function dateOnly(value) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

function sourceObservations() {
  const batchesRoot = path.join(root, "src/content/events/batches");
  const observations = {};
  if (!fs.existsSync(batchesRoot)) return observations;

  for (const batchId of fs.readdirSync(batchesRoot).sort()) {
    const file = path.join(batchesRoot, batchId, "batch.json");
    if (!fs.existsSync(file)) continue;
    const batch = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const run of batch.sourceRuns ?? []) {
      const current = observations[run.sourceId];
      if (!current || run.fetchedAt > current.lastObservedAt) {
        observations[run.sourceId] = { lastObservedAt: run.fetchedAt, candidateCount: run.candidateCount };
      }
    }
  }
  return observations;
}

function main() {
  const today = dateOnly(arg("--today")) ?? new Date().toISOString().slice(0, 10);
  const output = arg("--out") ?? path.join(root, "build/events-health/events-health.json");
  const report = buildEventHealthReport(publishedEventRecords, eventSources, { today, observations: sourceObservations() });

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);

  console.log("EVENT HEALTH (REPORT ONLY)");
  console.log(`observed: ${report.observedDate}`);
  console.log(`events: ${JSON.stringify(report.summary.eventCounts)}`);
  console.log(`sources: ${JSON.stringify(report.summary.sourceCounts)}`);
  for (const [window, value] of Object.entries(report.coverage)) {
    console.log(`${window}: total=${value.total} ${Object.entries(value.byCity).map(([city, count]) => `${city}=${count}`).join(" ")}`);
  }
  console.log(`json: ${path.relative(root, output)}`);
  console.log("Action required: inspect STALE, SOURCE_STALE, NEEDS_REVIEW and UNKNOWN items; zero events is not proof of no events.");
}

main();
