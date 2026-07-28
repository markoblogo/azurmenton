#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { buildGuideAssetPlan, parsePlaceAssetArgs } = require("../src/lib/guide-assets.ts");

async function main() {
  const slugIndex = process.argv.indexOf("--slug");
  if (slugIndex === -1) {
    console.log("Usage: npm run guide:assets -- --slug <slug> [--cover /abs/path] [--place place-id=/abs/path]");
    process.exitCode = 1;
    return;
  }

  const slug = process.argv[slugIndex + 1];
  const intakePath = path.join(root, "build", "guide-intake", slug, "intake.json");
  const registryPath = path.join(root, "scripts", "lib", "image-derivative-targets.json");
  const manifestPath = path.join(root, "public", "images", "generated-manifest.json");

  const coverIndex = process.argv.indexOf("--cover");
  const coverOverride = coverIndex === -1 ? undefined : process.argv[coverIndex + 1];
  const placeArgs = [];
  for (let index = 0; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--place" && process.argv[index + 1]) {
      placeArgs.push(process.argv[index + 1]);
    }
  }

  const intake = JSON.parse(await fs.readFile(intakePath, "utf8"));
  const { loadTargets, saveTargets, generateDerivatives } = await import("./lib/image-derivatives.mjs");
  const operations = buildGuideAssetPlan({
    slug,
    coverPathHint: coverOverride ? path.resolve(coverOverride) : intake.coverPathHint,
    placeAssets: parsePlaceAssetArgs(placeArgs).map((asset) => ({ ...asset, sourcePath: path.resolve(asset.sourcePath) })),
  });

  if (!operations.length) {
    console.log(`No asset operations for ${slug}.`);
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

  console.log(`updated registry: ${path.relative(root, registryPath)}`);
  console.log(`updated manifest: ${path.relative(root, manifestPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

