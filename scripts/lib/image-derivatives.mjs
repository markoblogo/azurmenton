import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const formats = [
  { extension: "webp", options: { quality: 78 } },
  { extension: "avif", options: { quality: 52 } },
];

export async function loadTargets(targetPath) {
  const raw = await readFile(targetPath, "utf8");
  const targets = JSON.parse(raw);
  if (!Array.isArray(targets)) {
    throw new Error(`Invalid derivative target registry: ${targetPath}`);
  }

  return [...new Set(targets.map((item) => String(item)))].sort();
}

export async function saveTargets(targetPath, targets) {
  const normalized = [...new Set(targets.map((item) => String(item)))].sort();
  await writeFile(targetPath, `${JSON.stringify(normalized, null, 2)}\n`);
}

export async function generateDerivatives(projectRoot, relativePath) {
  const source = path.join(projectRoot, relativePath);
  const parsed = path.parse(relativePath);
  const outputDirectory = path.join(projectRoot, parsed.dir, "generated");
  const outputs = [];

  await mkdir(outputDirectory, { recursive: true });

  await Promise.all(
    formats.map(async (format) => {
      const output = path.join(outputDirectory, `${parsed.name}.${format.extension}`);
      await sharp(source)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .toFormat(format.extension, format.options)
        .toFile(output);
      outputs.push(path.relative(projectRoot, output));
    }),
  );

  return {
    source: relativePath,
    outputs: outputs.sort(),
  };
}

export async function generateManifest(projectRoot, targets, manifestPath) {
  const manifest = [];

  for (const target of targets) {
    manifest.push(await generateDerivatives(projectRoot, target));
  }

  await writeFile(`${manifestPath}.tmp`, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

