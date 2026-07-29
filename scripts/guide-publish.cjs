#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { buildGuideCheckReport } = require("../src/lib/guide-check.ts");
const { buildGuideApplyArtifacts } = require("../src/lib/guide-apply.ts");
const { buildGuidePublishReport } = require("../src/lib/guide-publish.ts");
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
  console.log("Usage: npm run guide:publish -- --slug <slug>");
}

async function readJsonIfExists(targetPath) {
  try {
    return JSON.parse(await fs.readFile(targetPath, "utf8"));
  } catch {
    return null;
  }
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
  const intake = await readJsonIfExists(path.join(intakeDir, "intake.json"));
  const publicationPlan = await readJsonIfExists(path.join(intakeDir, "publication-plan.json"));
  const assetsReport = await readJsonIfExists(path.join(intakeDir, "assets-report.json"));

  if (!intake) {
    console.log(`Missing intake.json for ${slug}. Run npm run guide:new first.`);
    process.exitCode = 1;
    return;
  }

  if (!publicationPlan) {
    console.log(`Missing publication-plan.json for ${slug}. Fill the plan before running guide:publish.`);
    process.exitCode = 1;
    return;
  }

  let coverExists = undefined;
  if (intake.coverPathHint) {
    try {
      await fs.access(intake.coverPathHint);
      coverExists = true;
    } catch {
      coverExists = false;
    }
  }

  const checkReport = buildGuideCheckReport(
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

  const applyArtifacts = buildGuideApplyArtifacts({
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
    checkErrors: checkReport.errors,
  });

  const applyDir = path.join(intakeDir, "apply");
  await fs.mkdir(applyDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(intakeDir, "check-report.json"), `${JSON.stringify(checkReport, null, 2)}\n`),
    fs.writeFile(path.join(applyDir, "guide-article.snippet.txt"), `${applyArtifacts.guideArticleSnippet}\n`),
    fs.writeFile(path.join(applyDir, "places-raw.snippet.txt"), `${applyArtifacts.placesRawSnippet}\n`),
    fs.writeFile(path.join(applyDir, "place-visuals.snippet.txt"), `${applyArtifacts.placeVisualsSnippet}\n`),
    fs.writeFile(path.join(applyDir, "integration-checklist.md"), `${applyArtifacts.integrationChecklist}\n`),
    fs.writeFile(path.join(applyDir, "summary.json"), `${JSON.stringify(applyArtifacts.summary, null, 2)}\n`),
  ]);

  const publishReport = buildGuidePublishReport({
    slug,
    publicationPlan,
    checkReport,
    applyArtifacts,
    assetsReport,
    resolvedCoverImage: await resolvePublicGuideAsset(slug),
    resolvedPlaceImages: placeImages,
  });

  const publishReportPath = path.join(intakeDir, "publish-report.json");
  await fs.writeFile(publishReportPath, `${JSON.stringify(publishReport, null, 2)}\n`);

  console.log(`guide publish: ${slug}`);
  console.log(`report: ${path.relative(root, publishReportPath)}`);
  console.log(`ready: ${publishReport.ready ? "yes" : "no"}`);

  if (publishReport.blockers.length) {
    console.log("blockers");
    for (const blocker of publishReport.blockers) console.log(`- [${blocker.code}] ${blocker.message}`);
  } else {
    console.log("blockers\n- none");
  }

  if (publishReport.warnings.length) {
    console.log("warnings");
    for (const warning of publishReport.warnings) console.log(`- [${warning.code}] ${warning.message}`);
  } else {
    console.log("warnings\n- none");
  }

  console.log("blocked");
  if (publishReport.blocked.length) {
    for (const item of publishReport.blocked) console.log(`- [${item.scope}] [${item.code}] ${item.message}`);
  } else {
    console.log("- none");
  }

  console.log("auto resolved");
  if (publishReport.autoResolved.length) {
    for (const item of publishReport.autoResolved) console.log(`- ${item}`);
  } else {
    console.log("- none");
  }

  console.log("manual actions");
  for (const step of publishReport.manualActions) console.log(`- ${step.replace(/<slug>/g, slug)}`);

  if (!publishReport.ready) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
