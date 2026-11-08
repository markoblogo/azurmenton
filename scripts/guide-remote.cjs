#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { prepareGuideImage } = require("./lib/guide-publisher-assets.cjs");
const root = path.resolve(__dirname, "..");
require("./lib/register-ts-content.cjs").registerTypescriptContent(root);

async function main() {
  const [operation, ...args] = process.argv.slice(2);
  const options = {};
  while (args.length) {
    const key = args.shift();
    if (!key.startsWith("--")) throw Error("Named options required");
    options[key.slice(2)] = key === "--approve" ? true : args.shift();
  }
  if (options.env) process.loadEnvFile(options.env);
  const base = new URL(options.base || "https://azurmenton.com");
  if (base.origin !== "https://azurmenton.com" && !["localhost", "127.0.0.1"].includes(base.hostname)) throw Error("Only AzurMenton or isolated localhost is allowed");
  const token = process.env.GUIDE_PUBLISH_TOKEN;
  if (!token || token.length < 32) throw Error("GUIDE_PUBLISH_TOKEN required; Blob/account credentials are not used");
  const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };
  const endpoint = new URL("/api/guides/manage", base);
  async function send(command) {
    const result = await fetch(endpoint, { method: command ? "POST" : "GET", headers, ...(command ? { body: JSON.stringify(command) } : {}), redirect: "error", signal: AbortSignal.timeout(65_000) });
    const data = await result.json();
    if (!result.ok) throw Error(`Publisher returned ${result.status}: ${data.error || "request failed"}. Inspect status; reuse the saved request after an ambiguous response.`);
    return data;
  }
  function save(file, value) {
    fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", { mode: 0o600 });
    fs.chmodSync(file, 0o600);
  }
  if (operation === "status") {
    const data = await send();
    console.log(JSON.stringify({ head: data.head, guides: data.snapshot.publications.map(p => p.article.slug) }));
    return;
  }
  if (!options.receipt) throw Error("Private --receipt path required before preparing writes");
  const requestFile = options.receipt + ".request.json";
  const asset = prepareGuideImage;
  let command;
  if (operation === "retry") {
    const saved = JSON.parse(fs.readFileSync(requestFile, "utf8"));
    if (saved.origin !== base.origin || !saved.command) throw Error("Saved request belongs to a different endpoint; inspect before retrying");
    command = saved.command;
  } else {
    const current = await send();
    const revision = current.head?.revision ?? 0;
    if (operation === "stage") {
      if (!options.packages || !options.slug) throw Error("stage requires --packages and --slug");
      const { guideArticles } = require("../src/content/guide.ts");
      const { places } = require("../src/content/places.ts");
      const { contentCollections } = require("../src/content/content-map.ts");
      const graph = require("../src/lib/guide-runtime-model.ts").mergeGuideSnapshot(guideArticles, places, contentCollections, current.snapshot);
      const packages = JSON.parse(require("./guide-package.cjs").compile(path.resolve(options.packages), { runtime: true, graph }));
      const pkg = packages.find(p => p.article.slug === options.slug);
      if (!pkg) throw Error("Package not found");
      const article = require("../src/content/guide-packages.ts").buildPackagedGuide(pkg);
      command = { action: "stage", expectedRevision: revision, publication: { article, places: [], collections: pkg.collections, sources: fs.readFileSync(path.join(options.packages, options.slug, "sources.md"), "utf8") } };
      command.asset = await asset(path.join(root, "public", article.coverImage));
    } else if (operation === "image") {
      if (!options.slug || !options.file || options["expected-image"] === undefined) throw Error("image requires --slug --file --expected-image (path or none)");
      command = { action: "image", slug: options.slug, ...(options.place ? { place: options.place } : {}), expectedRevision: revision, expectedImage: options["expected-image"] === "none" ? null : options["expected-image"], asset: await asset(options.file) };
    } else if (["activate", "rollback"].includes(operation)) {
      if (!options.hash || !options["request-id"] || options["expected-revision"] === undefined) throw Error("Hash, stable request ID and explicit expected revision required");
      command = { action: operation, hash: options.hash, requestId: options["request-id"], expectedRevision: Number(options["expected-revision"]) };
    } else throw Error("Commands: status, stage, image, activate, rollback, retry");
    if (fs.existsSync(requestFile)) throw Error("Receipt request already exists; use retry or a new receipt path");
    save(requestFile, { origin: base.origin, command });
  }
  if (Buffer.byteLength(JSON.stringify(command)) > 4_000_000) throw Error("Request exceeds 4 MB");
  if (!options.approve) {
    console.log(JSON.stringify({ status: "PREPARED_NOT_SENT", action: command.action, retry: `guide:remote retry --receipt ${options.receipt} --approve` }));
    return;
  }
  const start = Date.now();
  const receipt = await send(command);
  save(options.receipt, { ...receipt, clientDurationMs: Date.now() - start });
  console.log(JSON.stringify({ ...receipt, clientDurationMs: Date.now() - start }));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
