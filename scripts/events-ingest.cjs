#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { runEventsIngestion, defaultEventsIngestionOutputDir } = require("../src/lib/events-ingestion/runner.ts");

function readArg(name, args = process.argv.slice(2)) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

async function main(args = process.argv.slice(2)) {
  const sourceId = readArg("--source", args);
  const outputDir = readArg("--out-dir", args) ?? defaultEventsIngestionOutputDir;
  const timeoutMs = Number(readArg("--timeout-ms", args) ?? 12_000);
  const report = await runEventsIngestion({ sourceId, outputDir, timeoutMs });

  console.log("Events ingestion review report");
  console.log(`source: ${report.sourceId}`);
  console.log(`output: ${path.relative(root, path.join(outputDir, "events-ingestion-report.json"))}`);
  for (const result of report.results) {
    console.log(
      [
        result.sourceId,
        `raw=${result.rawCount}`,
        `parsed=${result.parsedCount}`,
        `created=${result.createdCount}`,
        `updated=${result.updatedCount}`,
        `duplicates=${result.duplicateCount}`,
        `rejected=${result.rejectedCount}`,
        `errors=${result.errors.length}`,
      ].join(" "),
    );
  }
  console.log(`candidates: total=${report.candidateCounts.total} new=${report.candidateCounts.new} needsReview=${report.candidateCounts.needsReview} duplicates=${report.candidateCounts.duplicates} outdated=${report.candidateCounts.outdated}`);
  if (report.results.some((result) => result.errors.length > 0)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
