#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { buildGuideReviewReport } = require("../src/lib/guide-review.ts");
const { guideArticles } = require("../src/content/guide.ts");
const { places } = require("../src/content/places.ts");
const { placeMapPoints } = require("../src/content/planning/place-map-points.ts");
const { placeMapExclusions } = require("../src/content/planning/place-map-exclusions.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function usage() {
  console.log("Usage: npm run guide:review -- --slug <slug>");
}

async function readJson(targetPath) {
  return JSON.parse(await fs.readFile(targetPath, "utf8"));
}

function renderMarkdown(report) {
  const lines = [
    `# guide:review report for ${report.slug}`,
    "",
    `ok: ${report.ok ? "yes" : "no"}`,
    "",
    "## Guide",
    `- present: ${report.guide.present ? "yes" : "no"}`,
    `- publishedOn ok: ${report.guide.publishedOnOk ? "yes" : "no"}`,
    `- category ok: ${report.guide.categoryOk ? "yes" : "no"}`,
    `- relatedArticles ok: ${report.guide.relatedArticlesOk ? "yes" : "no"}`,
    `- relatedApartments ok: ${report.guide.relatedApartmentsOk ? "yes" : "no"}`,
    `- relatedPlaces ok: ${report.guide.relatedPlacesOk ? "yes" : "no"}`,
    "",
  ];

  if (report.errors.length) {
    lines.push("## Errors");
    for (const issue of report.errors) lines.push(`- [${issue.code}] ${issue.message}`);
    lines.push("");
  }

  if (report.warnings.length) {
    lines.push("## Warnings");
    for (const issue of report.warnings) lines.push(`- [${issue.code}] ${issue.message}`);
    lines.push("");
  }

  lines.push("## Places");
  for (const place of report.places) {
    lines.push(`- ${place.placeId} (${place.draftName})`);
    lines.push(`  - present: ${place.present ? "yes" : "no"}`);
    lines.push(`  - renderedByGuide: ${place.renderedByGuide ? "yes" : "no"}`);
    lines.push(`  - backlinkOk: ${place.backlinkOk ? "yes" : "no"}`);
    lines.push(`  - coverageOk: ${place.coverageOk ? "yes" : "no"}`);
    lines.push(`  - mapOk: ${place.mapOk ? "yes" : "no"}`);
  }

  return `${lines.join("\n")}\n`;
}

function renderOwnerChecklist(report) {
  const lines = [
    `# owner visual handoff for ${report.slug}`,
    "",
    "Use this only after the guide has already passed guide:publish and guide:review.",
    "",
    "## Cover correctness",
    `- [ ] Open ${report.visualHandoff.localeSpotCheckUrls[0]} and confirm the cover matches the intended guide topic.`,
    `- [ ] Confirm the cover is not reused as a fallback on unrelated place cards.`,
    `- [ ] Confirm the cover crops correctly on desktop and mobile.`,
    "",
    "## Place images",
  ];

  const expectedPlaces = report.visualHandoff.placeImageChecks.filter((place) => place.expected);
  if (expectedPlaces.length) {
    for (const place of expectedPlaces) {
      lines.push(`- [ ] ${place.placeId}: confirm the image belongs to ${place.draftName} and is not swapped with another place.`);
    }
  } else {
    lines.push("- [ ] No required place images were declared for this guide.");
  }

  lines.push(
    "",
    "## Wrong-image regressions",
    "- [ ] Check the guide page once top-to-bottom for any place card showing the wrong venue photo or a duplicate image from another card.",
    "",
    "## Guide landing / NEW slot",
    `- [ ] Open ${report.visualHandoff.landingGuideUrl} and confirm the guide card appears in the expected guide listing position.`,
  );

  if (report.visualHandoff.expectsLatestGuideSlot) {
    lines.push("- [ ] This guide is expected to occupy the dedicated NEW slot on the guide landing page.");
  } else {
    lines.push(`- [ ] This guide is not expected to occupy the NEW slot. Current latest guide slug: ${report.visualHandoff.latestGuideSlug ?? "n/a"}.`);
  }

  lines.push(
    "",
    "## Locale spot-check",
    ...report.visualHandoff.localeSpotCheckUrls.map((url) => `- [ ] Open ${url} and confirm title, cover and key place cards render cleanly.`),
    "",
    "## Notes",
    "- [ ] If any image is wrong, fix the mapping before publishing more assets for the next guide.",
  );

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
  try {
    await fs.access(path.join(intakeDir, "publication-plan.json"));
  } catch {
    console.log(`Missing publication-plan.json for ${slug}. Run the guide intake flow first.`);
    process.exitCode = 1;
    return;
  }

  const publicationPlan = await readJson(path.join(intakeDir, "publication-plan.json"));
  const report = buildGuideReviewReport({
    slug,
    publicationPlan,
    guides: guideArticles.map((guide) => ({
      slug: guide.slug,
      publishedOn: guide.publishedOn,
      category: guide.category,
      coverImage: guide.coverImage,
      relatedPlaces: guide.relatedPlaces,
      relatedArticles: guide.relatedArticles,
      relatedApartments: guide.relatedApartments,
      sections: guide.sections.map((section) => ({ relatedPlaceIds: section.relatedPlaceIds })),
    })),
    places: places.map((place) => ({
      id: place.id,
      relatedArticleIds: place.relatedArticleIds,
      guideCoverageSlugs: place.guideCoverageSlugs,
      requiresMapReview: place.requiresMapReview,
      image: place.image,
    })),
    mapPoints: placeMapPoints.map((point) => ({
      placeId: point.placeId,
      review: point.review,
    })),
    mapExclusions: placeMapExclusions.map((exclusion) => ({
      placeId: exclusion.placeId,
    })),
  });

  const reviewDir = path.join(intakeDir, "review");
  await fs.mkdir(reviewDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(reviewDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`),
    fs.writeFile(path.join(reviewDir, "report.md"), renderMarkdown(report)),
    fs.writeFile(path.join(reviewDir, "owner-checklist.md"), renderOwnerChecklist(report)),
  ]);

  console.log(`guide review: ${slug}`);
  console.log(`output: ${path.relative(root, reviewDir)}`);
  console.log(`ok: ${report.ok ? "yes" : "no"}`);
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

  if (!report.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
