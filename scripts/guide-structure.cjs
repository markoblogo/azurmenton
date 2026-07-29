#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { extractGuideStructure } = require("../src/lib/guide-structure.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function usage() {
  console.log("Usage: npm run guide:structure -- --slug <slug>");
}

function renderStructureScaffold(structure) {
  const lines = [
    `slug: ${structure.slug}`,
    "",
    "Structured sections",
  ];

  for (const section of structure.sections) {
    lines.push(`- ${section.heading} [${section.kind}]`);
    if (section.bodyParagraphs.length) {
      for (const paragraph of section.bodyParagraphs) {
        lines.push(`  - body: ${paragraph}`);
      }
    } else {
      lines.push("  - body: TODO");
    }

    if (section.placeCards.length) {
      for (const card of section.placeCards) {
        lines.push(`  - place: ${card.draftName}`);
        if (card.bodyParagraphs.length) {
          lines.push(`    - summary: ${card.bodyParagraphs[0]}`);
        }
      }
    }
  }

  return lines.join("\n");
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
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
  const draftPath = path.join(intakeDir, "draft.md");
  const structurePath = path.join(intakeDir, "structure.json");
  const scaffoldPath = path.join(intakeDir, "structure-scaffold.md");

  const intake = await readJson(intakePath);
  const raw = await fs.readFile(draftPath, "utf8");
  const structure = extractGuideStructure(raw, intake);

  await Promise.all([
    fs.writeFile(structurePath, `${JSON.stringify(structure, null, 2)}\n`),
    fs.writeFile(scaffoldPath, `${renderStructureScaffold(structure)}\n`),
  ]);

  console.log(`guide structure updated: ${path.relative(root, structurePath)}`);
  console.log(`- sections: ${structure.sections.length}`);
  console.log(`- scaffold: ${path.relative(root, scaffoldPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
