#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs/promises");
const path = require("node:path");

async function readJson(root, relative, optional = false) {
  try { return JSON.parse(await fs.readFile(path.join(root, relative), "utf8")); }
  catch (error) {
    if (optional && error.code === "ENOENT") return null;
    throw new Error(`${relative}: ${error.message}`);
  }
}
async function directories(root, relative) {
  try {
    return (await fs.readdir(path.join(root, relative), { withFileTypes: true }))
      .filter(item => item.isDirectory() && !item.name.startsWith("_")).map(item => item.name).sort();
  } catch (error) { if (error.code === "ENOENT") return []; throw error; }
}
const strings = value => Array.isArray(value) ? value.filter(item => typeof item === "string") : [];

async function collectSnapshots(root) {
  const snapshots = [];
  const ignored = { borderline: 0, excluded: 0, unchanged: 0 };
  for (const folder of await directories(root, "build/guide-intake")) {
    const base = `build/guide-intake/${folder}`;
    const files = ["intake.json", "publication-plan.json", "publish-report.json", "review/report.json"];
    const values = [];
    for (const file of files) values.push(await readJson(root, `${base}/${file}`, true));
    const [intake, plan, publish, review] = values;
    values.forEach((value, i) => {
      if (value !== null && (typeof value !== "object" || Array.isArray(value))) throw new Error(`${base}/${files[i]}: expected an object`);
    });
    if (!intake && !plan) continue;
    const targetId = plan?.slug || intake?.slug || folder;
    if (typeof targetId !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(targetId)) throw new Error(`${base}: invalid guide slug`);
    const blockers = [...strings(publish?.blockers), ...strings(review?.errors)];
    if (targetId === "untitled-guide" || !intake?.sectionHeadings?.length) blockers.push("Incomplete intake: inspect source and reconcile the draft before editorial review");
    const reportedReady = publish?.ready === false || review?.ok === false ? false : publish?.ready === true ? true : null;
    snapshots.push({ kind: "guide", action: "publish", targetId, title: intake?.title || targetId,
      // Folder names are provenance, not canonical aliases: old folders may be reused.
      aliases: [...new Set([plan?.slug, intake?.slug].filter(Boolean))],
      refs: files.filter((_, i) => values[i] !== null).map(file => `${base}/${file}`), reportedReady, blockers });
  }
  for (const folder of await directories(root, "src/content/events/batches")) {
    const base = `src/content/events/batches/${folder}`;
    const batch = await readJson(root, `${base}/batch.json`, true);
    const queue = await readJson(root, `${base}/publishing-queue.json`, true);
    if (!batch && !queue) continue;
    if ((batch && !Array.isArray(batch.candidates)) || (queue && !Array.isArray(queue))) throw new Error(`${base}: invalid batch/queue shape`);
    ignored.borderline += batch?.borderline?.length || 0;
    ignored.excluded += batch?.excluded?.length || 0;
    const candidates = new Map((batch?.candidates || []).map(item => [item.id, item]));
    for (const row of queue || []) {
      if (!["publish", "update"].includes(row.action)) { ignored.unchanged++; continue; }
      if (typeof (row.slug || row.id) !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(row.slug || row.id)) throw new Error(`${base}: invalid event id/slug`);
      const candidate = candidates.get(row.id);
      snapshots.push({ kind: "event", action: "publish", targetId: row.slug || row.id,
        aliases: [row.id, candidate?.slug].filter(Boolean), title: row.title || candidate?.titleCanonical || row.id,
        sourceUrl: row.sourceUrl || candidate?.sourceUrl, startDate: row.startDate || candidate?.startDate,
        endDate: candidate?.endDate, refs: [`${base}/publishing-queue.json`, ...(batch ? [`${base}/batch.json`] : [])],
        reportedReady: null, blockers: ["Recheck official source, dates, translations and media; batch action is not approval"] });
    }
  }
  return { snapshots, ignored };
}

function repositoryTargets(root) {
  const load = file => require(path.join(root, "src/content", `${file}.ts`));
  return [
    ...load("guide").guideArticles.map(item => ({ kind: "guide", targetId: item.slug, aliases: [item.id], title: item.title.en })),
    ...load("riviera-events").rivieraEvents.map(item => ({ kind: "event", targetId: item.slug || item.id,
      aliases: [item.id, item.occurrenceSlug].filter(Boolean), title: item.title, sourceUrl: item.sourceUrl, startDate: item.startDate, endDate: item.endDate })),
    ...load("weekly-digests").weeklyDigests.filter(item => item.locale === "en").map(item => ({ kind: "weekly", targetId: item.slug, title: item.title })),
    ...load("menton-details").mentonDetails.map(item => ({ kind: "detail", targetId: item.id, title: item.title.en })),
    ...load("places").places.map(item => ({ kind: "place", targetId: item.id, title: item.name?.en || item.name || item.id })),
  ];
}

function renderMarkdown(report) {
  const clean = value => String(value).replace(/[\r\n]/g, " ").replace(/[<>]/g, "");
  const lines = ["# Editorial Queue", "", `As of: ${report.asOf} (Europe/Paris)`, "",
    "Local artifact summary only. No source refresh, owner approval, public-site check or publication is performed.", "",
    `Active: ${report.counts.active}; already in repository: ${report.counts.repositoryPresent}; past candidates: ${report.counts.past}; explicit completed tasks: ${report.counts.completed}.`,
    `Registered tasks: ${report.registered}. Historical target mappings: ${report.targetAliases.length}. Borderline/excluded input rows are not promoted to publication tasks.`,
    "Discovery covers local guide intake and event publishing queues, not every canonical record, inbox or review document. Weekly/detail/place tasks can be registered explicitly.", ""];
  for (const bucket of ["active", "repository-present", "past", "completed", "deferred", "rejected"]) {
    const items = report.items.filter(item => item.bucket === bucket);
    lines.push(`## ${bucket} (${items.length})`, "");
    for (const item of items) {
      lines.push(`### ${clean(item.id)}`, `- Title: ${clean(item.title)}`,
        `- Status: ${item.status}; priority: ${item.priority}; technical snapshot: ${item.technical}; live: ${item.liveStatus}`,
        ...(item.notBefore ? [`- Not before: ${item.notBefore} (not a schedule)`] : []),
        `- Next action: ${clean(item.nextAction)}`,
        ...item.blockers.map(value => `- Blocker: ${clean(value)}`),
        ...item.refs.map(value => `- Source: ${clean(value)}`), "");
    }
  }
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = process.argv.slice(2);
  let stdout = false;
  let asOf = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--stdout") stdout = true;
    else if (args[i] === "--as-of" && args[i + 1]) asOf = args[++i];
    else throw new Error(`Unknown/incomplete argument: ${args[i]}`);
  }
  const root = path.resolve(__dirname, "..");
  require("./lib/register-ts-content.cjs").registerTypescriptContent(root);
  const { buildEditorialReport } = require("../src/lib/editorial-queue.ts");
  const registry = await readJson(root, "src/content/editorial/queue.json");
  const { snapshots, ignored } = await collectSnapshots(root);
  const report = { ...buildEditorialReport(registry, snapshots, repositoryTargets(root), asOf), registryPath: "src/content/editorial/queue.json", targetAliases: registry.targetAliases || [], ignored };
  if (stdout) { process.stdout.write(`${JSON.stringify(report, null, 2)}\n`); return; }
  const output = path.join(root, "build/editorial");
  await fs.mkdir(output, { recursive: true });
  await fs.writeFile(path.join(output, "queue-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(path.join(output, "queue-report.md"), renderMarkdown(report));
  console.log(`Editorial queue (${asOf}): ${report.counts.active} active | ${report.counts.repositoryPresent} repository-present | ${report.counts.past} past | ${report.counts.completed} completed`);
  console.log(`Registered tasks: ${report.registered}. Reports are snapshots, never publication approval. Live status: not checked.`);
  for (const item of report.items.filter(item => item.bucket === "active").slice(0, 5)) console.log(`- ${item.id}: ${item.nextAction}`);
  console.log("Full report: build/editorial/queue-report.md (+ JSON). No content or registry changed.");
}

module.exports = { collectSnapshots, renderMarkdown };
if (require.main === module) main().catch(error => { console.error(`editorial:report failed: ${error.message}`); process.exitCode = 1; });
