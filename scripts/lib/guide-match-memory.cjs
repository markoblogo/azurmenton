/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs/promises");
const path = require("node:path");

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function loadGuideMatchMemory(root, currentSlug) {
  const intakeRoot = path.join(root, "build", "guide-intake");
  const entries = await fs.readdir(intakeRoot, { withFileTypes: true }).catch(() => []);
  const records = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === currentSlug) continue;

    const publicationPlanPath = path.join(intakeRoot, entry.name, "publication-plan.json");
    const publicationPlan = await readJson(publicationPlanPath).catch(() => null);
    if (!publicationPlan?.plannedPlaces?.length) continue;

    records.push({
      slug: entry.name,
      plannedPlaces: publicationPlan.plannedPlaces,
    });
  }

  return records;
}

module.exports = {
  loadGuideMatchMemory,
};
