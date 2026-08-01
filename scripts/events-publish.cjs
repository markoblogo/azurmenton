#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { publishEventBatch, readPreparedBatch } = require("../src/lib/events-publication/workflow.ts");

function parseArgs(argv) {
  const args = { dryRun: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--batch") args.batch = argv[++index];
    else if (value === "--all") args.all = true;
    else if (value === "--city") args.city = argv[++index];
    else if (value === "--ids") args.ids = argv[++index].split(",").map((item) => item.trim()).filter(Boolean);
    else if (value === "--exclude") args.exclude = argv[++index].split(",").map((item) => item.trim()).filter(Boolean);
    else if (value === "--dry-run") args.dryRun = true;
    else if (value === "--root") args.root = path.resolve(argv[++index]);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.batch) {
    console.error("Missing --batch <batch-id>");
    process.exit(1);
  }
  const rootDir = args.root ?? root;
  const batch = await readPreparedBatch(args.batch, rootDir);
  if (!batch) {
    console.error(`Batch not found: ${args.batch}`);
    process.exit(1);
  }
  const summary = await publishEventBatch({
    batch,
    rootDir,
    selection: {
      all: args.all,
      city: args.city,
      ids: args.ids,
      exclude: args.exclude,
      dryRun: args.dryRun,
    },
    maxBatchAgeDays: 45,
  });
  console.log(`Batch: ${summary.batchId}`);
  console.log(`Dry run: ${summary.dryRun}`);
  console.log(`Selected: ${summary.selected}`);
  console.log(`Created: ${summary.created.join(", ") || "none"}`);
  console.log(`Updated: ${summary.updated.join(", ") || "none"}`);
  console.log(`Files: ${summary.filesToWrite.join(", ") || "none"}`);
  if (summary.warnings.length) console.log(`Warnings: ${summary.warnings.join("; ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
