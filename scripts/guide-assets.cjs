#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");
const { printGuideOperatorHandoff } = require("./lib/guide-operator-handoff.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { parsePlaceAssetArgs, resolveGuideAssetPlan } = require("../src/lib/guide-assets.ts");
const { guideArticles } = require("../src/content/guide.ts");
const { places } = require("../src/content/places.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

async function existingFilesInDirectory(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries.filter((entry) => entry.isFile() && !entry.name.startsWith(".")).map((entry) => entry.name);
  } catch {
    return [];
  }
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const slug = readArg("--slug");
  const publishedGuideSlug = readArg("--published-guide");
  const strict = process.argv.includes("--strict");
  const missingOnly = process.argv.includes("--missing-only");
  const reportOnly = process.argv.includes("--report-only");
  const failOnUnmatched = process.argv.includes("--fail-on-unmatched");
  if (!slug && !publishedGuideSlug) {
    console.log("Usage: npm run guide:assets -- (--slug <slug> | --published-guide <guide-slug>) [--assets-dir /abs/dir] [--cover /abs/path] [--place place-id=/abs/path] [--missing-only] [--report-only] [--fail-on-unmatched] [--strict]");
    process.exitCode = 1;
    return;
  }
  const workingSlug = publishedGuideSlug ?? slug;
  const intakePath = slug ? path.join(root, "build", "guide-intake", slug, "intake.json") : null;
  const publicationPlanPath = slug ? path.join(root, "build", "guide-intake", slug, "publication-plan.json") : null;
  const reportPath = slug
    ? path.join(root, "build", "guide-intake", slug, "assets-report.json")
    : path.join(root, "build", "guide-assets-postpublish", `${publishedGuideSlug}.json`);
  const registryPath = path.join(root, "scripts", "lib", "image-derivative-targets.json");
  const manifestPath = path.join(root, "public", "images", "generated-manifest.json");

  const coverOverride = readArg("--cover");
  const assetsDir = readArg("--assets-dir");
  const placeArgs = [];
  for (let index = 0; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--place" && process.argv[index + 1]) {
      placeArgs.push(process.argv[index + 1]);
    }
  }

  const intake = intakePath ? JSON.parse(await fs.readFile(intakePath, "utf8")) : null;
  let publicationPlan = null;
  if (publicationPlanPath) {
    try {
      publicationPlan = JSON.parse(await fs.readFile(publicationPlanPath, "utf8"));
    } catch {
      publicationPlan = null;
    }
  }
  const { loadTargets, saveTargets, generateDerivatives } = await import("./lib/image-derivatives.mjs");
  const overrides = parsePlaceAssetArgs(placeArgs).map((asset) => ({ ...asset, sourcePath: path.resolve(asset.sourcePath) }));
  const resolvedAssetsDir = assetsDir ? path.resolve(assetsDir) : publicationPlan?.assetsDirectory ? path.resolve(publicationPlan.assetsDirectory) : undefined;
  const existingPlaceImages = Object.fromEntries(places.filter((place) => place.image).map((place) => [place.id, place.image]));
  const publishedGuide = publishedGuideSlug
    ? (() => {
        const guide = guideArticles.find((article) => article.slug === publishedGuideSlug);
        if (!guide) {
          throw new Error(`Unknown published guide slug: ${publishedGuideSlug}`);
        }
        const relatedPlaceIds = [...new Set([...(guide.relatedPlaces ?? []), ...guide.sections.flatMap((section) => section.relatedPlaceIds ?? [])])];
        return {
          slug: guide.slug,
          intakeTitle: guide.title.en,
          coverImage: guide.coverImage,
          places: relatedPlaceIds.map((placeId) => {
            const place = places.find((entry) => entry.id === placeId);
            return {
              placeId,
              draftName: place?.name ?? placeId,
              image: place?.image,
            };
          }),
        };
      })()
    : null;
  const resolution = resolveGuideAssetPlan({
    slug: workingSlug,
    outputSlug: publishedGuide?.slug ?? workingSlug,
    intakeTitle: publishedGuide?.intakeTitle ?? intake?.title,
    coverPathHint:
      coverOverride
        ? path.resolve(coverOverride)
        : publicationPlan?.coverImageStatus === "not_needed"
          ? undefined
          : intake?.coverPathHint,
    coverImageStatus: publicationPlan?.coverImageStatus ?? null,
    coverAssetPath: publicationPlan?.coverAssetPath ? path.resolve(publicationPlan.coverAssetPath) : null,
    coverAssetFileName: publicationPlan?.coverAssetFileName ?? null,
    assetsDirectory: resolvedAssetsDir,
    plannedPlaces: publicationPlan?.plannedPlaces ?? [],
    placeAssetOverrides: overrides,
    availableAssetFiles: resolvedAssetsDir ? await existingFilesInDirectory(resolvedAssetsDir) : [],
    existingPlaceImages,
    knownPlaces: places.map((place) => ({ id: place.id, name: place.name, image: place.image })),
    publishedGuide: publishedGuide ?? undefined,
    missingOnly,
  });
  const operations = [];
  const issues = [...resolution.issues];

  for (const operation of resolution.operations) {
    if (!(await fileExists(operation.sourcePath))) {
      issues.push({
        severity: "error",
        code: "missing-source-file",
        message: `Resolved asset source is missing on disk: ${operation.sourcePath}`,
      });
      continue;
    }
    operations.push(operation);
  }

  if (strict && resolution.unmatchedAssetFiles.length) {
    issues.push({
      severity: "error",
      code: "unused-asset-files",
      message: `Asset package still contains ${resolution.unmatchedAssetFiles.length} unused file(s).`,
    });
  }

  if (failOnUnmatched && resolution.unmatchedAssetFiles.length) {
    issues.push({
      severity: "error",
      code: "fail-on-unmatched",
      message: `fail-on-unmatched is enabled and ${resolution.unmatchedAssetFiles.length} asset file(s) are still unmatched.`,
    });
  }

  if (strict && (resolution.missingExpectedCoverAsset || resolution.missingExpectedAssetPlaceIds.length)) {
    issues.push({
      severity: "error",
      code: "strict-expected-assets-missing",
      message: "Strict mode requires every expected cover/place asset to resolve.",
    });
  }

  const report = {
    slug: workingSlug,
    strict,
    missingOnly,
    reportOnly,
    failOnUnmatched,
    operations,
    issues,
    matchedAssetFiles: resolution.matchedAssetFiles,
    unmatchedAssetFiles: resolution.unmatchedAssetFiles,
    matchedPlaces: resolution.matchedPlaces,
    expectedCoverAsset: resolution.expectedCoverAsset,
    missingExpectedCoverAsset: resolution.missingExpectedCoverAsset,
    expectedAssetPlaceIds: resolution.expectedAssetPlaceIds,
    missingExpectedAssetPlaceIds: resolution.missingExpectedAssetPlaceIds,
    skippedAlreadyCoveredPlaces: resolution.skippedAlreadyCoveredPlaces,
    publishedGuidePlacesWithoutImage: resolution.publishedGuidePlacesWithoutImage,
  };

  const printOperatorSummary = () => {
    const mode = [publishedGuideSlug ? "published-guide" : "intake", missingOnly ? "missing-only" : null, reportOnly ? "report-only" : null].filter(Boolean).join(" + ");
    const hasErrors = issues.some((issue) => issue.severity === "error");
    printGuideOperatorHandoff({
      status: hasErrors ? "needs-attention" : "ok",
      subject: workingSlug,
      mode,
      counts: {
        copied: reportOnly ? 0 : operations.length,
        matched: resolution.matchedPlaces.length,
        "skipped-covered": resolution.skippedAlreadyCoveredPlaces.length,
        unmatched: resolution.unmatchedAssetFiles.length,
        "still-missing": resolution.publishedGuidePlacesWithoutImage.length,
      },
      reportPath: path.relative(root, reportPath),
      samples: [
        { label: "unmatched sample", values: resolution.unmatchedAssetFiles },
        { label: "missing sample", values: resolution.publishedGuidePlacesWithoutImage.map((place) => place.placeId) },
      ],
    });
  };

  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  if (!operations.length) {
    console.log(`No asset operations for ${workingSlug}.`);
    printOperatorSummary();
    await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    if (issues.some((issue) => issue.severity === "error")) process.exitCode = 1;
    return;
  }

  if (reportOnly) {
    printOperatorSummary();
    await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    if (issues.some((issue) => issue.severity === "error")) process.exitCode = 1;
    return;
  }

  await fs.mkdir(path.join(root, "public", "images", "guide"), { recursive: true });

  const targets = await loadTargets(registryPath);
  const generated = [];

  for (const operation of operations) {
    const destination = path.join(root, operation.destinationPath);
    await fs.copyFile(operation.sourcePath, destination);
    if (!targets.includes(operation.destinationPath)) targets.push(operation.destinationPath);
    generated.push(await generateDerivatives(root, operation.destinationPath));
    console.log(`${operation.kind}: ${operation.sourcePath} -> ${operation.destinationPath}`);
  }

  await saveTargets(registryPath, targets);

  const manifestEntries = [];
  for (const target of targets) {
    const match = generated.find((entry) => entry.source === target);
    manifestEntries.push(match ?? { source: target, outputs: [] });
  }

  // Preserve a fully resolvable manifest by regenerating paths for untouched sources from disk on next images:generate.
  // For guide:assets v1 we only guarantee new assets immediately.
  const existingManifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const bySource = new Map(existingManifest.map((entry) => [entry.source, entry]));
  for (const entry of manifestEntries) {
    if (!entry.outputs.length && bySource.has(entry.source)) {
      entry.outputs = bySource.get(entry.source).outputs;
    }
  }
  await fs.writeFile(`${manifestPath}.tmp`, `${JSON.stringify(manifestEntries, null, 2)}\n`);
  await fs.writeFile(manifestPath, `${JSON.stringify(manifestEntries, null, 2)}\n`);
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  printOperatorSummary();
  if (issues.some((issue) => issue.severity === "error")) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
