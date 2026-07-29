#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { buildGuideCheckReport } = require("../src/lib/guide-check.ts");
const { buildGuideApplyArtifacts } = require("../src/lib/guide-apply.ts");
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
  console.log("Usage: npm run guide:apply -- --slug <slug>");
}

async function resolvePublicGuideAsset(baseName) {
  const candidates = [".png", ".jpg", ".jpeg", ".webp", ".avif"];
  for (const extension of candidates) {
    const publicPath = `/images/guide/${baseName}${extension}`;
    try {
      await fs.access(path.join(root, "public", publicPath.replace(/^\//, "")));
      return publicPath;
    } catch {}
  }
  return undefined;
}

async function main() {
  const slug = readArg("--slug");
  if (!slug) {
    usage();
    process.exitCode = 1;
    return;
  }

  const intakeDir = path.join(root, "build", "guide-intake", slug);
  const intake = JSON.parse(await fs.readFile(path.join(intakeDir, "intake.json"), "utf8"));
  const publicationPlan = JSON.parse(await fs.readFile(path.join(intakeDir, "publication-plan.json"), "utf8"));
  let structure = null;
  try {
    structure = JSON.parse(await fs.readFile(path.join(intakeDir, "structure.json"), "utf8"));
  } catch {}

  let coverExists = undefined;
  if (intake.coverPathHint) {
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

  const placeIds = (publicationPlan.plannedPlaces ?? [])
    .map((plannedPlace) => plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId)
    .filter(Boolean);
  const placeImages = {};
  for (const placeId of placeIds) {
    const publicPath = await resolvePublicGuideAsset(placeId);
    if (publicPath) placeImages[placeId] = publicPath;
  }

  const artifacts = buildGuideApplyArtifacts({
    intake,
    publicationPlan,
    guides: guideArticles.map((guide) => ({ slug: guide.slug, title: guide.title.en })),
    places: places.map((place) => ({
      id: place.id,
      name: place.name,
      type: place.type,
      image: place.image,
      requiresMapReview: place.requiresMapReview,
      relatedArticleIds: place.relatedArticleIds,
      guideCoverageSlugs: place.guideCoverageSlugs,
    })),
    assets: {
      coverImage: await resolvePublicGuideAsset(slug),
      placeImages,
    },
    structure,
    checkErrors: report.errors,
  });

  const outputDir = path.join(intakeDir, "apply");
  await fs.mkdir(outputDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(outputDir, "guide-article.snippet.txt"), `${artifacts.guideArticleSnippet}\n`),
    fs.writeFile(path.join(outputDir, "places-raw.snippet.txt"), `${artifacts.placesRawSnippet}\n`),
    fs.writeFile(path.join(outputDir, "place-visuals.snippet.txt"), `${artifacts.placeVisualsSnippet}\n`),
    fs.writeFile(path.join(outputDir, "integration-checklist.md"), `${artifacts.integrationChecklist}\n`),
    fs.writeFile(path.join(outputDir, "summary.json"), `${JSON.stringify(artifacts.summary, null, 2)}\n`),
  ]);

  console.log(`guide apply: ${slug}`);
  console.log(`output: ${path.relative(root, outputDir)}`);
  console.log(`- guide-article.snippet.txt`);
  console.log(`- places-raw.snippet.txt`);
  console.log(`- place-visuals.snippet.txt`);
  console.log(`- integration-checklist.md`);
  console.log(`- summary.json`);
  console.log(`ready: ${artifacts.summary.ready ? "yes" : "no"}`);

  if (report.errors.length) {
    console.log("blocking errors from guide:check");
    for (const issue of report.errors) console.log(`- [${issue.code}] ${issue.message}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
