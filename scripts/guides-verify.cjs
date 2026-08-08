#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { buildGuideVerificationReport, validateVerificationDossier } = require("../src/lib/guides-verification.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function mapGuide(guide) {
  return { id: guide.id, slug: guide.slug, title: guide.title, category: guide.category, locationTags: guide.locationTags, sourceStatus: guide.sourceStatus, publishedOn: guide.publishedOn };
}

function main() {
  const dossierPath = path.join(root, "src/content/guides/provenance/verification-pilot.json");
  const dossier = JSON.parse(fs.readFileSync(dossierPath, "utf8"));
  validateVerificationDossier(dossier);
  const selectedGuide = readArg("--guide");
  if (process.argv.includes("--refresh")) throw new Error("--refresh is intentionally unavailable; record bounded evidence explicitly in the sidecar");
  const report = buildGuideVerificationReport(guideArticles.map(mapGuide), dossier, selectedGuide);
  const output = readArg("--out") ?? path.join(root, "build/guides-verification/guides-verification.json");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log("GUIDE VERIFICATION (BOUNDED READ-ONLY PILOT)");
  console.log(`observed: ${report.observedDate}`);
  console.log(`guides: ${report.guides.length}`);
  for (const guide of report.guides) console.log(`- ${guide.guideSlug}: ${guide.confirmedClaimCount}/${guide.claimCount} confirmed`);
  console.log(`change proposals: ${report.changeProposals.length}`);
  console.log(`json: ${path.relative(root, output)}`);
  console.log("Action required: review proposals; this command does not rewrite or publish guides.");
}

main();
