#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { buildGuideHealthReport } = require("../src/lib/guides-health.ts");
const verificationDossier = require("../src/content/guides/provenance/verification-pilot.json");

function readArg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function todayKey() {
  const value = readArg("--today");
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : new Date().toISOString().slice(0, 10);
}

function mapGuide(guide) {
  return {
    id: guide.id,
    slug: guide.slug,
    title: guide.title,
    category: guide.category,
    locationTags: guide.locationTags,
    sourceStatus: guide.sourceStatus,
    publishedOn: guide.publishedOn,
    sections: guide.sections.map((section) => ({ heading: section.heading, body: section.body })),
  };
}

function main() {
  const report = buildGuideHealthReport(guideArticles.map(mapGuide), { today: todayKey(), verificationRecords: verificationDossier.pilotGuides });
  const output = readArg("--out") ?? path.join(root, "build/guides-health/guides-health.json");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);

  console.log("GUIDE HEALTH (REPORT ONLY)");
  console.log(`observed: ${report.observedDate}`);
  console.log(`guides: ${report.summary.total}`);
  console.log(`statuses: ${JSON.stringify(report.summary.statuses)}`);
  console.log(`localization: complete=${report.localization.complete} incomplete=${report.localization.incomplete} drift=${report.localization.drift}`);
  console.log("HIGH PRIORITY REVIEW");
  for (const item of report.priorityReview.slice(0, 10)) console.log(`- ${item.slug} [${item.status}] [${item.volatility}] ${item.reason}`);
  if (!report.priorityReview.length) console.log("- none");
  console.log(`json: ${path.relative(root, output)}`);
  console.log("Action required: review evidence gaps; this command does not rewrite or publish guides.");
}

main();
