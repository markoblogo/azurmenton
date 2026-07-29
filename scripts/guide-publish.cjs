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

function renderOperatorReportMarkdown(report, slug) {
  const lines = [
    `# guide:publish operator report`,
    "",
    `- slug: \`${slug}\``,
    `- status: **${report.operator.status}**`,
    `- headline: ${report.operator.headline}`,
    `- counts: blockers ${report.operator.counts.blockers}, warnings ${report.operator.counts.warnings}, auto-resolved ${report.operator.counts.autoResolved}, manual actions ${report.operator.counts.manualActions}`,
    "",
  ];

  lines.push("## Blocked");
  if (report.operator.blockedTop.length) {
    for (const item of report.operator.blockedTop) lines.push(`- ${item}`);
  } else {
    lines.push("- none");
  }
  lines.push("");

  lines.push("## Auto-resolved");
  if (report.operator.autoResolvedTop.length) {
    for (const item of report.operator.autoResolvedTop) lines.push(`- ${item}`);
  } else {
    lines.push("- none");
  }
  lines.push("");

  lines.push("## Next manual actions");
  for (const item of report.operator.nextManualActions) lines.push(`- ${item.replace(/<slug>/g, slug)}`);

  if (report.operator.warningTop.length) {
    lines.push("");
    lines.push("## Warnings");
    for (const item of report.operator.warningTop) lines.push(`- ${item}`);
  }

  return `${lines.join("\n")}\n`;
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

  const targetGuideSlug = publicationPlan.slug ?? slug;

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

  const placeById = new Map(places.map((place) => [place.id, place]));

  const placeIds = (publicationPlan.plannedPlaces ?? [])
    .map((plannedPlace) => plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId)
    .filter(Boolean);
  const placeImages = {};
  for (const placeId of placeIds) {
    const publicPath = (await resolvePublicGuideAsset(placeId)) ?? placeById.get(placeId)?.image;
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
      coverImage: await resolvePublicGuideAsset(targetGuideSlug),
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
    slug: targetGuideSlug,
    publicationPlan,
    checkReport,
    applyArtifacts,
    assetsReport,
    resolvedCoverImage: await resolvePublicGuideAsset(targetGuideSlug),
    resolvedPlaceImages: placeImages,
  });

  const publishReportPath = path.join(intakeDir, "publish-report.json");
  const operatorReportPath = path.join(intakeDir, "operator-report.md");
  await Promise.all([
    fs.writeFile(publishReportPath, `${JSON.stringify(publishReport, null, 2)}\n`),
    fs.writeFile(operatorReportPath, renderOperatorReportMarkdown(publishReport, slug)),
  ]);

  console.log(`guide publish: ${slug}`);
  console.log(`report: ${path.relative(root, publishReportPath)}`);
  console.log(`operator: ${path.relative(root, operatorReportPath)}`);
  console.log(`ready: ${publishReport.ready ? "yes" : "no"}`);
  console.log(`headline: ${publishReport.operator.headline}`);
  console.log(
    `counts: blockers ${publishReport.operator.counts.blockers}, warnings ${publishReport.operator.counts.warnings}, auto-resolved ${publishReport.operator.counts.autoResolved}, manual actions ${publishReport.operator.counts.manualActions}`,
  );

  console.log("blocked");
  if (publishReport.operator.blockedTop.length) {
    for (const item of publishReport.operator.blockedTop) console.log(`- ${item}`);
  } else {
    console.log("- none");
  }

  console.log("next actions");
  for (const step of publishReport.operator.nextManualActions) console.log(`- ${step.replace(/<slug>/g, slug)}`);

  if (!publishReport.ready) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
