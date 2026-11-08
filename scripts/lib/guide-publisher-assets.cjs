/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const sharp = require("sharp");

async function prepareGuideImage(source, { maxBytes = 2_500_000 } = {}) {
  const input = Buffer.isBuffer(source) ? source : await fs.readFile(source);
  const image = sharp(input, { limitInputPixels: 8192 * 8192 });
  const info = await image.metadata();
  if (!info.width || !info.height || (info.pages ?? 1) !== 1) throw Error("Single-frame image required");
  // Prepared derivatives are already suitable for the server: do not encode them twice.
  const bytes = info.format === "webp" && info.width <= 1680 && info.height <= 8192
    ? input
    : await image.resize({ width: 1680, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  const output = await sharp(bytes, { limitInputPixels: 8192 * 8192 }).metadata();
  if (!output.height || output.height > 8192) throw Error("Image exceeds height limit");
  if (bytes.length > maxBytes) throw Error("Image exceeds 2.5 MB; prepare a smaller web derivative");
  return { sha256: crypto.createHash("sha256").update(bytes).digest("hex"), base64: bytes.toString("base64") };
}

module.exports = { prepareGuideImage };
