#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { apartments } = require("../src/content/apartments.ts");
const { contentCollections } = require("../src/content/content-map.ts");
const { guideArticles } = require("../src/content/guide.ts");
const { guideIntentClusters } = require("../src/content/guide-intents.ts");
const { places } = require("../src/content/places.ts");
const { applyGuideLinkPlan, buildGuideLinkPlan } = require("../src/lib/guide-link-plan.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function usage() {
  console.log("Usage: npm run guide:link-plan -- --slug <slug>");
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
  const reportPath = path.join(intakeDir, "link-plan-report.json");
  const intake = JSON.parse(await fs.readFile(intakePath, "utf8"));
  const publicationPlan = JSON.parse(await fs.readFile(publicationPlanPath, "utf8"));

  const linkPlan = buildGuideLinkPlan({
    intake,
    publicationPlan,
    guides: guideArticles.map((guide) => ({
      slug: guide.slug,
      title: guide.title.en,
      category: guide.category,
    })),
    places: places.map((place) => ({
      id: place.id,
      name: place.name,
      type: place.type,
      image: place.image,
      requiresMapReview: place.requiresMapReview,
      relatedArticleIds: place.relatedArticleIds,
      guideCoverageSlugs: place.guideCoverageSlugs,
    })),
    apartments,
    collections: contentCollections,
    clusters: guideIntentClusters,
  });

  const updatedPlan = applyGuideLinkPlan(
    {
      ...publicationPlan,
      slug: publicationPlan.slug ?? intake.slug,
    },
    linkPlan,
  );

  const report = {
    slug,
    appliedRelatedArticles: updatedPlan.relatedArticleSlugs ?? [],
    appliedRelatedApartments: updatedPlan.relatedApartmentSlugs ?? [],
    matchedClusterIds: linkPlan.matchedClusterIds,
    matchedCollectionIds: linkPlan.matchedCollectionIds,
    relatedArticles: linkPlan.relatedArticles,
    relatedApartments: linkPlan.relatedApartments,
    backlinkObligations: linkPlan.backlinkObligations,
    specialistCoverageUpdates: linkPlan.specialistCoverageUpdates,
  };

  await Promise.all([
    fs.writeFile(publicationPlanPath, `${JSON.stringify(updatedPlan, null, 2)}\n`),
    fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`),
  ]);

  console.log(`guide link plan: ${slug}`);
  console.log(`publication plan updated: ${path.relative(root, publicationPlanPath)}`);
  console.log(`report: ${path.relative(root, reportPath)}`);
  console.log(`related articles: ${(updatedPlan.relatedArticleSlugs ?? []).join(", ") || "none"}`);
  console.log(`related apartments: ${(updatedPlan.relatedApartmentSlugs ?? []).join(", ") || "none"}`);
  console.log(`matched clusters: ${linkPlan.matchedClusterIds.join(", ") || "none"}`);
  console.log(`matched collections: ${linkPlan.matchedCollectionIds.join(", ") || "none"}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
