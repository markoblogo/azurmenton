#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { buildGuideCheckReport } = require("../src/lib/guide-check.ts");
const { guideArticles } = require("../src/content/guide.ts");
const { apartments } = require("../src/content/apartments.ts");
const { places } = require("../src/content/places.ts");
const { placeMapPoints } = require("../src/content/planning/place-map-points.ts");
const { placeMapExclusions } = require("../src/content/planning/place-map-exclusions.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function usage() {
  console.log("Usage: npm run guide:check -- --slug <slug>");
}

function renderSuggestions(label, suggestions, keyName) {
  console.log(label);
  for (const suggestion of suggestions) {
    if (!suggestion.matches.length) {
      console.log(`- ${suggestion.input}: no match`);
      continue;
    }
    const formatted = suggestion.matches
      .map((match) => `${match[keyName]} (${match.score.toFixed(2)})`)
      .join(", ");
    console.log(`- ${suggestion.input}: ${formatted}`);
  }
}

async function main() {
  const slug = readArg("--slug");
  if (!slug) {
    usage();
    process.exitCode = 1;
    return;
  }

  const intakePath = path.join(root, "build", "guide-intake", slug, "intake.json");
  const reportPath = path.join(root, "build", "guide-intake", slug, "check-report.json");
  const publicationPlanPath = path.join(root, "build", "guide-intake", slug, "publication-plan.json");
  const intake = JSON.parse(await fs.readFile(intakePath, "utf8"));
  let publicationPlan = null;

  try {
    publicationPlan = JSON.parse(await fs.readFile(publicationPlanPath, "utf8"));
  } catch {
    publicationPlan = null;
  }

  const coverSourceExpected = !publicationPlan ? Boolean(intake.coverPathHint) : publicationPlan.coverImageStatus === "provided";
  let coverExists = undefined;
  if (coverSourceExpected && intake.coverPathHint) {
    try {
      await fs.access(intake.coverPathHint);
      coverExists = true;
    } catch {
      coverExists = false;
    }
  }

  const report = buildGuideCheckReport(
    intake,
    guideArticles.map((guide) => ({ slug: guide.slug, title: guide.title.en, publishedOn: guide.publishedOn })),
    places.map((place) => ({
      id: place.id,
      name: place.name,
      type: place.type,
      image: place.image,
      requiresMapReview: place.requiresMapReview,
      relatedArticleIds: place.relatedArticleIds,
      guideCoverageSlugs: place.guideCoverageSlugs,
    })),
    {
      coverExists,
      publicationPlan,
      apartmentSlugs: apartments.map((apartment) => apartment.slug),
      mapPointPlaceIds: placeMapPoints.map((point) => point.placeId),
      mapExclusionPlaceIds: placeMapExclusions.map((exclusion) => exclusion.placeId),
    },
  );

  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`guide check: ${slug}`);
  console.log(`report: ${path.relative(root, reportPath)}`);

  if (report.errors.length) {
    console.log("errors");
    for (const issue of report.errors) console.log(`- [${issue.code}] ${issue.message}`);
  } else {
    console.log("errors\n- none");
  }

  if (report.warnings.length) {
    console.log("warnings");
    for (const issue of report.warnings) console.log(`- [${issue.code}] ${issue.message}`);
  } else {
    console.log("warnings\n- none");
  }

  renderSuggestions("related guide suggestions", report.relatedGuideSuggestions, "slug");
  renderSuggestions("place suggestions", report.placeSuggestions, "id");

  if (!report.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
