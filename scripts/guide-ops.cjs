#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");
const { printGuideOperatorHandoff } = require("./lib/guide-operator-handoff.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { buildGuideOpsSummary } = require("../src/lib/guide-ops.ts");

async function readJsonIfExists(targetPath) {
  try {
    return JSON.parse(await fs.readFile(targetPath, "utf8"));
  } catch {
    return null;
  }
}

function renderMarkdown(summary) {
  const lines = [
    "# guide:ops summary",
    "",
    `- total: ${summary.counts.total}`,
    `- blocked: ${summary.counts.blocked}`,
    `- incomplete: ${summary.counts.incomplete}`,
    `- ready: ${summary.counts.ready}`,
    "",
  ];

  for (const item of summary.items) {
    lines.push(`## ${item.slug}`);
    lines.push(`- status: **${item.status}**`);
    lines.push(`- headline: ${item.headline}`);
    lines.push(`- next action: ${item.nextAction}`);
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const intakeRoot = path.join(root, "build", "guide-intake");
  const entries = await fs.readdir(intakeRoot, { withFileTypes: true }).catch(() => []);

  const snapshots = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const intakeDir = path.join(intakeRoot, entry.name);
    const intake = await readJsonIfExists(path.join(intakeDir, "intake.json"));
    const publicationPlan = await readJsonIfExists(path.join(intakeDir, "publication-plan.json"));
    const checkReport = await readJsonIfExists(path.join(intakeDir, "check-report.json"));
    const publishReport = await readJsonIfExists(path.join(intakeDir, "publish-report.json"));
    const reviewReport = await readJsonIfExists(path.join(intakeDir, "review", "report.json"));

    snapshots.push({
      slug: entry.name,
      hasIntake: Boolean(intake),
      hasPublicationPlan: Boolean(publicationPlan),
      hasCheckReport: Boolean(checkReport),
      publishReady: typeof publishReport?.ready === "boolean" ? publishReport.ready : null,
      publishHeadline: publishReport?.operator?.headline ?? null,
      publishBlockers: Array.isArray(publishReport?.operator?.blockedTop) ? publishReport.operator.blockedTop : [],
      reviewOk: typeof reviewReport?.ok === "boolean" ? reviewReport.ok : null,
      reviewHeadline: reviewReport?.operator?.headline ?? null,
      reviewOpenItems: Array.isArray(reviewReport?.operator?.openItems) ? reviewReport.operator.openItems : [],
    });
  }

  const summary = buildGuideOpsSummary(snapshots);
  const reportDir = path.join(intakeRoot, "_ops");
  await fs.mkdir(reportDir, { recursive: true });

  await Promise.all([
    fs.writeFile(path.join(reportDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`),
    fs.writeFile(path.join(reportDir, "summary.md"), renderMarkdown(summary)),
  ]);

  printGuideOperatorHandoff({
    status: summary.counts.blocked ? "needs-attention" : "ok",
    subject: "guide-intake",
    mode: "guide-ops",
    counts: {
      blocked: summary.counts.blocked,
      incomplete: summary.counts.incomplete,
      ready: summary.counts.ready,
      total: summary.counts.total,
    },
    reportPath: path.relative(root, path.join(reportDir, "summary.md")),
    samples: [{ label: "next actions", values: summary.items.map((item) => `${item.slug}: ${item.nextAction}`) }],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
