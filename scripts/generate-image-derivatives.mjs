#!/usr/bin/env node

import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const targets = [
  "public/images/home/SeaViewBalconyStudio.jpg",
  "public/images/home/TerraceParkingApartment.jpg",
  "public/images/home/BeachfrontStudio-portret.jpg",
  "public/images/apartments/panoramic-sea-view-studio/16-living-room-sea-view.jpg",
  "public/images/apartments/sea-view-balcony-studio/01-balcony-breakfast-sea-view.jpg",
  "public/images/apartments/beachside-family-apartment/01-private-terrace-breakfast.jpg",
];

const formats = [
  { extension: "webp", options: { quality: 78 } },
  { extension: "avif", options: { quality: 52 } },
];

async function generateDerivatives(relativePath) {
  const source = path.join(projectRoot, relativePath);
  const parsed = path.parse(relativePath);
  const outputDirectory = path.join(projectRoot, parsed.dir, "generated");

  await mkdir(outputDirectory, { recursive: true });

  await Promise.all(
    formats.map(async (format) => {
      const output = path.join(outputDirectory, `${parsed.name}.${format.extension}`);
      await sharp(source)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .toFormat(format.extension, format.options)
        .toFile(output);
      console.log(`generated ${path.relative(projectRoot, output)}`);
    }),
  );
}

for (const target of targets) {
  await generateDerivatives(target);
}
