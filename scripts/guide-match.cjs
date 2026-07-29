#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { places } = require("../src/content/places.ts");
const { placeMapPoints } = require("../src/content/planning/place-map-points.ts");
const { placeMapExclusions } = require("../src/content/planning/place-map-exclusions.ts");
const { buildSeededPublicationPlan } = require("../src/lib/guide-plan-seeding.ts");
const { mergePublicationPlanWithMatches } = require("../src/lib/guide-match.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function usage() {
  console.log("Usage: npm run guide:match -- --slug <slug>");
}

function todayIso() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function main() {
  const slug = readArg("--slug");
  if (!slug) {
    usage();
    process.exitCode = 1;
    return;
  }

  const intakeDir = path.join(root, "build", "guide-intake", slug);
  const intakePath = path.join(intakeDir, "intake.json");
  const publicationPlanPath = path.join(intakeDir, "publication-plan.json");
  const reportPath = path.join(intakeDir, "match-report.json");

  const intake = await readJson(intakePath);
  const currentPlan = await readJson(publicationPlanPath).catch(() => null);

  const seededPlan = buildSeededPublicationPlan({
    intake,
    todayIso: todayIso(),
    guides: guideArticles.map((guide) => ({ slug: guide.slug, title: guide.title.en, category: guide.category })),
    places: places.map((place) => ({
      id: place.id,
      name: place.name,
      image: place.image,
      requiresMapReview: place.requiresMapReview,
      relatedArticleIds: place.relatedArticleIds,
    })),
    mapPointPlaceIds: placeMapPoints.map((point) => point.placeId),
    mapExclusionPlaceIds: placeMapExclusions.map((exclusion) => exclusion.placeId),
  });

  const mergedPlan = mergePublicationPlanWithMatches({
    intake,
    currentPlan,
    seededPlan,
  });

  const report = {
    slug,
    matchedExisting: (mergedPlan.plannedPlaces ?? []).filter((place) => place.matchStatus === "existing_place").length,
    ambiguous: (mergedPlan.plannedPlaces ?? []).filter((place) => place.matchStatus === "ambiguous_match").length,
    newCandidates: (mergedPlan.plannedPlaces ?? []).filter((place) => place.matchStatus === "new_place_candidate").length,
    places: (mergedPlan.plannedPlaces ?? []).map((place) => ({
      draftName: place.draftName,
      matchStatus: place.matchStatus ?? null,
      existingPlaceId: place.existingPlaceId ?? null,
      suggestedExistingPlaceId: place.suggestedExistingPlaceId ?? null,
      newPlaceId: place.newPlaceId ?? null,
      topMatches: place.topMatches ?? [],
    })),
  };

  await Promise.all([
    fs.writeFile(publicationPlanPath, `${JSON.stringify(mergedPlan, null, 2)}\n`),
    fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`),
  ]);

  console.log(`guide match updated: ${path.relative(root, publicationPlanPath)}`);
  console.log(`- matched existing: ${report.matchedExisting}`);
  console.log(`- ambiguous: ${report.ambiguous}`);
  console.log(`- new candidates: ${report.newCandidates}`);
  console.log(`- report: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
