#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { extractGuideIntake } = require("../src/lib/guide-intake.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function usage() {
  console.log("Usage: npm run guide:new -- --from /absolute/path/to/draft.txt [--cover /absolute/path/to/cover.png]");
}

function renderGuideScaffold(intake) {
  return [
    `slug: ${intake.slug}`,
    `title: ${intake.title}`,
    `seoTitle: ${intake.seoTitle ?? "TODO"}`,
    `metaDescription: ${intake.metaDescription ?? "TODO"}`,
    `coverPathHint: ${intake.coverPathHint ?? "TODO"}`,
    "",
    "Guide scaffold checklist",
    "- add localized title / seo / excerpt / sections in src/content/guide.ts",
    "- set publishedOn",
    "- add relatedPlaces / relatedArticles / relatedApartments",
    "- copy cover to public/images/guide/<slug>.<ext>",
    "- add cover target to scripts/generate-image-derivatives.mjs",
    "- run images:generate + content:lint + content:audit",
    "",
    "Section headings",
    ...intake.sectionHeadings.map((heading) => `- ${heading}`),
    "",
    "Related guide titles from draft",
    ...(intake.relatedGuideTitles.length ? intake.relatedGuideTitles.map((title) => `- ${title}`) : ["- none detected"]),
    "",
    "Intro hint",
    intake.intro ?? "TODO",
    "",
  ].join("\n");
}

function renderPlacesScaffold(intake) {
  return [
    `slug: ${intake.slug}`,
    "",
    "Place candidates",
    ...(intake.placeCandidates.length
      ? intake.placeCandidates.map((candidate) => `- ${candidate.name}${candidate.section ? ` [section: ${candidate.section}]` : ""}`)
      : ["- none detected"]),
    "",
    "Per place",
    "- resolve existing place vs new place",
    "- add relatedArticleIds",
    "- add guideCoverageSlugs only when this is the canonical specialist guide",
    "- set requiresMapReview or explicit exclusion when map-eligible",
    "- leave image empty if no illustration package yet",
    "",
  ].join("\n");
}

async function main() {
  const fromPath = readArg("--from");
  const coverPath = readArg("--cover");

  if (!fromPath) {
    usage();
    process.exitCode = 1;
    return;
  }

  const absoluteInput = path.resolve(fromPath);
  const raw = await fs.readFile(absoluteInput, "utf8");
  const intake = extractGuideIntake(raw, { coverPathHint: coverPath ? path.resolve(coverPath) : undefined });

  const outputDir = path.join(root, "build", "guide-intake", intake.slug);
  await fs.mkdir(outputDir, { recursive: true });

  await Promise.all([
    fs.writeFile(path.join(outputDir, "intake.json"), `${JSON.stringify(intake, null, 2)}\n`),
    fs.writeFile(path.join(outputDir, "guide-scaffold.md"), `${renderGuideScaffold(intake)}\n`),
    fs.writeFile(path.join(outputDir, "places-scaffold.md"), `${renderPlacesScaffold(intake)}\n`),
  ]);

  console.log(`guide intake generated: ${path.relative(root, outputDir)}`);
  console.log(`- intake.json`);
  console.log(`- guide-scaffold.md`);
  console.log(`- places-scaffold.md`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

