#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { parsePlaceAssetArgs, resolveGuideAssetPlan } = require("../src/lib/guide-assets.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

async function existingFilesInDirectory(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
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
  if (!slug) {
    console.log("Usage: npm run guide:assets -- --slug <slug> [--assets-dir /abs/dir] [--cover /abs/path] [--place place-id=/abs/path]");
    process.exitCode = 1;
    return;
  }
  const intakePath = path.join(root, "build", "guide-intake", slug, "intake.json");
  const publicationPlanPath = path.join(root, "build", "guide-intake", slug, "publication-plan.json");
  const reportPath = path.join(root, "build", "guide-intake", slug, "assets-report.json");
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

  const intake = JSON.parse(await fs.readFile(intakePath, "utf8"));
  let publicationPlan = null;
  try {
    publicationPlan = JSON.parse(await fs.readFile(publicationPlanPath, "utf8"));
  } catch {
    publicationPlan = null;
  }
  const { loadTargets, saveTargets, generateDerivatives } = await import("./lib/image-derivatives.mjs");
  const overrides = parsePlaceAssetArgs(placeArgs).map((asset) => ({ ...asset, sourcePath: path.resolve(asset.sourcePath) }));
  const resolvedAssetsDir = assetsDir ? path.resolve(assetsDir) : publicationPlan?.assetsDirectory ? path.resolve(publicationPlan.assetsDirectory) : undefined;
  const resolution = resolveGuideAssetPlan({
    slug,
    intakeTitle: intake.title,
    coverPathHint: coverOverride ? path.resolve(coverOverride) : intake.coverPathHint,
    coverImageStatus: publicationPlan?.coverImageStatus ?? null,
    coverAssetPath: publicationPlan?.coverAssetPath ? path.resolve(publicationPlan.coverAssetPath) : null,
    coverAssetFileName: publicationPlan?.coverAssetFileName ?? null,
    assetsDirectory: resolvedAssetsDir,
    plannedPlaces: publicationPlan?.plannedPlaces ?? [],
    placeAssetOverrides: overrides,
    availableAssetFiles: resolvedAssetsDir ? await existingFilesInDirectory(resolvedAssetsDir) : [],
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

  if (!operations.length) {
    console.log(`No asset operations for ${slug}.`);
    if (issues.length) {
      for (const issue of issues) console.log(`- [${issue.code}] ${issue.message}`);
      await fs.writeFile(reportPath, `${JSON.stringify({ slug, operations: [], issues }, null, 2)}\n`);
      if (issues.some((issue) => issue.severity === "error")) process.exitCode = 1;
    }
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
  await fs.writeFile(reportPath, `${JSON.stringify({ slug, operations, issues }, null, 2)}\n`);

  console.log(`updated registry: ${path.relative(root, registryPath)}`);
  console.log(`updated manifest: ${path.relative(root, manifestPath)}`);
  console.log(`report: ${path.relative(root, reportPath)}`);
  if (issues.length) {
    for (const issue of issues) console.log(`- [${issue.code}] ${issue.message}`);
  }
  if (issues.some((issue) => issue.severity === "error")) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
