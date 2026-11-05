/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs/promises");
const path = require("node:path");

async function availablePlaceImages(root, images, { stat = fs.stat, concurrency = 8 } = {}) {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) throw new Error("Image probe concurrency must be 1-8");
  const publicRoot = path.join(root, "public") + path.sep;
  const unique = [...new Set(images.filter(Boolean))];
  const files = unique.map(image => {
    const file = path.resolve(root, "public", image.replace(/^\//, ""));
    if (!file.startsWith(publicRoot)) throw new Error("Place image must be inside public");
    return file;
  });
  const available = new Array(files.length).fill(false);
  let next = 0;
  async function worker() {
    while (next < files.length) {
      const index = next++;
      try { available[index] = (await stat(files[index])).isFile(); }
      catch (error) { if (error.code !== "ENOENT") throw error; }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, files.length) }, worker));
  return unique.filter((_, index) => available[index]);
}

module.exports = { availablePlaceImages };
