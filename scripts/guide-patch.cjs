#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { buildGuidePatchBundle } = require("../src/lib/guide-patch.ts");

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function usage() {
  console.log("Usage: npm run guide:patch -- --slug <slug>");
}

async function readJson(targetPath) {
  return JSON.parse(await fs.readFile(targetPath, "utf8"));
}

async function readText(targetPath) {
  return fs.readFile(targetPath, "utf8");
}

function renderBundleMarkdown(bundle) {
  const lines = [
    `# guide:patch bundle for ${bundle.slug}`,
    "",
    `ready: ${bundle.ready ? "yes" : "no"}`,
    "",
  ];

  if (bundle.blockers.length) {
    lines.push("## Blockers");
    for (const blocker of bundle.blockers) lines.push(`- [${blocker.code}] ${blocker.message}`);
    lines.push("");
  }

  if (bundle.targets.length) {
    lines.push("## Targets");
    for (const target of bundle.targets) {
      lines.push(`### ${target.file}`);
      lines.push(`- action: ${target.action}`);
      lines.push(`- anchor: ${target.anchor}`);
      for (const note of target.notes) lines.push(`- note: ${note}`);
      if (target.snippet) {
        lines.push("", "```ts", target.snippet, "```");
      }
      lines.push("");
    }
  }

  lines.push("## Next steps");
  for (const step of bundle.nextSteps) lines.push(`- ${step}`);

  return `${lines.join("\n")}\n`;
}

async function main() {
  const slug = readArg("--slug");
  if (!slug) {
    usage();
    process.exitCode = 1;
    return;
  }

  const intakeDir = path.join(root, "build", "guide-intake", slug);
  const publishReportPath = path.join(intakeDir, "publish-report.json");
  try {
    await fs.access(publishReportPath);
  } catch {
    console.log(`Missing publish-report.json for ${slug}. Run npm run guide:publish first.`);
    process.exitCode = 1;
    return;
  }

  const publicationPlan = await readJson(path.join(intakeDir, "publication-plan.json"));
  const publishReport = await readJson(publishReportPath);
  const applyDir = path.join(intakeDir, "apply");
  const applyArtifacts = {
    guideArticleSnippet: await readText(path.join(applyDir, "guide-article.snippet.txt")),
    placesRawSnippet: await readText(path.join(applyDir, "places-raw.snippet.txt")),
    placeVisualsSnippet: await readText(path.join(applyDir, "place-visuals.snippet.txt")),
    integrationChecklist: await readText(path.join(applyDir, "integration-checklist.md")),
    summary: await readJson(path.join(applyDir, "summary.json")),
  };

  const bundle = buildGuidePatchBundle({
    slug,
    publicationPlan,
    publishReport,
    applyArtifacts,
  });

  const patchDir = path.join(intakeDir, "patch");
  await fs.mkdir(patchDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(patchDir, "summary.json"), `${JSON.stringify(bundle, null, 2)}\n`),
    fs.writeFile(path.join(patchDir, "content-bundle.md"), renderBundleMarkdown(bundle)),
  ]);

  console.log(`guide patch: ${slug}`);
  console.log(`output: ${path.relative(root, patchDir)}`);
  console.log(`ready: ${bundle.ready ? "yes" : "no"}`);
  if (bundle.blockers.length) {
    console.log("blockers");
    for (const blocker of bundle.blockers) console.log(`- [${blocker.code}] ${blocker.message}`);
  } else {
    console.log("blockers\n- none");
  }
  console.log("targets");
  for (const target of bundle.targets) console.log(`- ${target.file}: ${target.action}`);
  if (!bundle.ready) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
