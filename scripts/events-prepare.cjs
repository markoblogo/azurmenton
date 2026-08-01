#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { eventSources } = require("../src/content/event-sources.ts");
const { rivieraEvents } = require("../src/content/riviera-events.ts");
const { candidateFromRaw } = require("../src/lib/events-ingestion/normalize.ts");
const { prepareEventBatch, writePreparedBatch } = require("../src/lib/events-publication/workflow.ts");

function parseArgs(argv) {
  const args = { latest: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--latest") args.latest = true;
    else if (value === "--source") args.source = argv[++index];
    else if (value === "--city") args.city = argv[++index];
    else if (value === "--from") args.from = argv[++index];
    else if (value === "--to") args.to = argv[++index];
    else if (value === "--input") args.input = argv[++index];
    else if (value === "--output-root") args.outputRoot = argv[++index];
  }
  return args;
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function loadManualInbox(nowIso) {
  const inboxDir = path.join(root, "src", "content", "events", "manual-inbox");
  let entries = [];
  try {
    entries = await fs.readdir(inboxDir);
  } catch {
    return [];
  }
  const records = [];
  for (const entry of entries.filter((name) => name.endsWith(".json"))) {
    const value = await readJson(path.join(inboxDir, entry), []);
    const items = Array.isArray(value) ? value : [value];
    for (const item of items) {
      if (!item?.title || !item?.sourceUrl) continue;
      records.push(candidateFromRaw({
        sourceId: item.sourceId ?? `manual-${item.city ?? "menton"}`,
        sourceEventId: item.sourceEventId,
        title: item.title,
        sourceUrl: item.sourceUrl,
        startDate: item.startDate,
        endDate: item.endDate,
        city: item.city ?? "menton",
        venue: item.venue,
        categoryLabel: item.categoryLabel,
        imageUrl: item.imageUrl,
        rawPayload: item,
      }, nowIso));
    }
  }
  return records;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outputRoot = args.outputRoot ? path.resolve(args.outputRoot) : root;
  const ingestionDir = args.input ? path.resolve(args.input) : path.join(root, "build", "events-ingestion");
  const store = await readJson(path.join(ingestionDir, "events-ingestion-store.json"), { candidates: [], sourceHealth: [] });
  const report = await readJson(path.join(ingestionDir, "events-ingestion-report.json"), { results: [] });
  const nowIso = new Date().toISOString();
  const manualCandidates = await loadManualInbox(nowIso);
  const sourceNames = Object.fromEntries(eventSources.map((source) => [source.id, source.name]));
  const candidates = [...(store.candidates ?? []), ...manualCandidates]
    .filter((candidate) => !args.source || candidate.sourceId === args.source)
    .filter((candidate) => !args.city || candidate.city === args.city)
    .filter((candidate) => !args.from || !candidate.startDate || candidate.startDate >= args.from)
    .filter((candidate) => !args.to || !candidate.startDate || candidate.startDate <= args.to);

  const batch = prepareEventBatch({
    candidates,
    existingEvents: rivieraEvents,
    sourceNames,
    sourceRuns: (report.results ?? []).map((result) => ({
      sourceId: result.sourceId,
      fetchedAt: result.fetchedAt,
      candidateCount: result.parsedCount ?? 0,
    })),
  });
  const paths = await writePreparedBatch(batch, outputRoot);
  console.log(`Batch ready: ${batch.id}`);
  console.log(`Prepared: ${batch.candidates.length}`);
  console.log(`Borderline: ${batch.borderline.length}`);
  console.log(`Excluded: ${batch.excluded.length}`);
  console.log(`Duplicates: ${batch.duplicates.length}`);
  console.log(`JSON: ${paths.jsonPath}`);
  console.log(`Report: ${paths.reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
