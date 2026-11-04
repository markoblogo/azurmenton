#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs/promises");
const path = require("node:path");
const net = require("node:net");
const { spawn } = require("node:child_process");
const { createHash } = require("node:crypto");
const { saveJson } = require("./lib/guide-workflow.cjs");
const root = path.resolve(__dirname, "..");
const locales = ["en", "fr", "it", "uk"];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const ensure = (condition, message) => { if (!condition) throw Error(message); };

function parseArgs(args) {
  const result = { public: false };
  for (let index = 0; index < args.length; index++) {
    if (args[index] === "--slug" && !result.slug) result.slug = args[++index];
    else if (args[index] === "--public" && !result.public) result.public = true;
    else throw Error("Usage: guide:browser -- --slug <slug> [--public]");
  }
  ensure(typeof result.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result.slug), "A safe guide slug is required");
  return result;
}

function guideExpectations(guide, places, locale = "en") {
  ensure(guide?.coverImage?.startsWith("/images/"), "Guide cover is required");
  const ids = [...new Set([...(guide.relatedPlaces ?? []), ...guide.sections.flatMap(section => section.relatedPlaceIds ?? [])])];
  const records = ids.map(id => {
    const place = places.find(item => item.id === id);
    ensure(place, `Unknown place: ${id}`);
    return place;
  });
  return {
    tableRows: guide.sections.flatMap(section => (section.tables?.[locale] ?? []).map(table => table.rows.length)),
    illustratedPlaceIds: records.filter(place => place.image).map(place => place.id),
    missingPlaceIds: records.filter(place => !place.image).map(place => place.id),
  };
}

async function startServer() {
  await fs.access(path.join(root, ".next/BUILD_ID"));
  const probe = net.createServer();
  await new Promise((resolve, reject) => { probe.once("error", reject); probe.listen(0, "127.0.0.1", resolve); });
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  const child = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  let output = "", failure;
  for (const stream of [child.stdout, child.stderr]) stream.on("data", data => { output = (output + data).slice(-4000); });
  child.on("error", error => { failure = error; });
  const exited = new Promise(resolve => child.once("exit", resolve));
  const stop = async () => {
    if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
    child.kill("SIGTERM");
    const timer = setTimeout(() => child.kill("SIGKILL"), 5000);
    try { await exited; } finally { clearTimeout(timer); }
  };
  const baseURL = `http://127.0.0.1:${port}`;
  try {
    const deadline = Date.now() + 120000;
    while (Date.now() < deadline) {
      if (failure || child.exitCode !== null || child.signalCode !== null) throw Error(`Local server failed: ${failure?.message ?? output}`);
      try { if ((await fetch(`${baseURL}/en`, { signal: AbortSignal.timeout(3000) })).ok) return { baseURL, stop }; } catch { /* Wait for this owned server only. */ }
      await sleep(500);
    }
    throw Error(`Local server readiness timed out: ${output}`);
  } catch (error) { await stop(); throw error; }
}

async function main(args = process.argv.slice(2)) {
  const opts = parseArgs(args);
  require("./lib/register-ts-content.cjs").registerTypescriptContent(root);
  const { guideArticles, localizeGuideArticle } = require("../src/content/guide.ts");
  const { places } = require("../src/content/places.ts");
  const guide = guideArticles.find(item => item.slug === opts.slug);
  const expected = guideExpectations(guide, places);
  const directory = path.join(root, "build/guide-intake", opts.slug, "workflow/browser", opts.public ? "public" : "local");
  const receiptPath = path.join(directory, "report.json");
  const report = { slug: opts.slug, mode: opts.public ? "public" : "local", startedAt: new Date().toISOString(), ok: false, publication: "not-performed", locales: [], missingPlaceIds: expected.missingPlaceIds };
  await saveJson(receiptPath, report);
  let server, browser;
  try {
    server = opts.public ? null : await startServer();
    const baseURL = server?.baseURL ?? "https://azurmenton.com";
    const { chromium } = require("playwright");
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 390, height: 1000 } });
    page.setDefaultTimeout(30000);
    for (const locale of locales) {
      const article = localizeGuideArticle(guide, locale);
      const tableRows = guideExpectations(guide, places, locale).tableRows;
      const route = `/${locale}/guide/${opts.slug}`;
      const response = await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      ensure(response?.status() === 200, `${locale}: HTTP ${response?.status()}`);
      ensure(await page.locator("h1").innerText() === article.title, `${locale}: title differs from canonical content`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      ensure(canonical === `https://azurmenton.com${route}`, `${locale}: wrong canonical`);
      const tables = page.locator("main table");
      ensure(await tables.count() === tableRows.length, `${locale}: table count`);
      for (const [index, rows] of tableRows.entries()) ensure(await tables.nth(index).locator("tbody tr").count() === rows, `${locale}: table ${index} rows`);
      const coverKey = path.basename(guide.coverImage, path.extname(guide.coverImage));
      const images = [page.locator(`img[src*="${coverKey}"]`).first(), ...expected.illustratedPlaceIds.map(id => page.locator(`#place-${id} img`))];
      for (const image of images) {
        ensure(await image.count() === 1, `${locale}: missing/duplicated expected image`);
        await image.scrollIntoViewIfNeeded();
        await page.waitForFunction(element => element.complete && element.naturalWidth > 0, await image.elementHandle(), { timeout: 30000 });
        await image.evaluate(element => element.decode());
        ensure(await image.evaluate(element => element.complete && element.naturalWidth > 0), `${locale}: broken image`);
      }
      const text = await page.locator("main").innerText();
      ensure(!/SEO title:|Meta description:|Suggested URL:|\*\*|\]\(https?:|\]\(\/(?:en|fr|it|uk)\//.test(text), `${locale}: raw editorial/Markdown markers`);
      for (const width of [360, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        ensure(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth) <= 1, `${locale}: document overflow at ${width}px`);
      }
      if (locale === "fr") {
        for (const width of [390, 1440]) {
          await page.setViewportSize({ width, height: 1000 });
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: path.join(directory, `fr-${width}.png`) });
        }
      }
      report.locales.push({ locale, status: 200, canonical, imagesDecoded: images.length, tableRows });
    }
    if (opts.public) {
      for (const route of ["/sitemap.xml", "/en/guide"]) {
        const response = await fetch(`${baseURL}${route}`, { signal: AbortSignal.timeout(30000) });
        ensure(response.ok && (await response.text()).includes(opts.slug), `Missing public catalogue entry: ${route}`);
      }
      const manifest = JSON.parse(await fs.readFile(path.join(root, "public/images/generated-manifest.json"), "utf8"));
      const backlink = (guide.relatedArticles ?? []).find(slug => guideArticles.find(item => item.slug === slug)?.relatedArticles?.includes(opts.slug));
      if (backlink) {
        const response = await fetch(`${baseURL}/en/guide/${backlink}`, { signal: AbortSignal.timeout(30000) });
        ensure(response.ok && (await response.text()).includes(`href="/en/guide/${opts.slug}"`), "Missing reciprocal guide link");
        report.backlink = backlink;
      }
      const source = `public${guide.coverImage}`;
      const files = [source, ...(manifest.find(item => item.source === source)?.outputs ?? [])];
      for (const file of files) {
        const response = await fetch(`${baseURL}/${file.replace(/^public\//, "")}`, { signal: AbortSignal.timeout(30000) });
        ensure(response.ok, `Cover asset HTTP ${response.status}: ${file}`);
        const hash = value => createHash("sha256").update(value).digest("hex");
        ensure(hash(Buffer.from(await response.arrayBuffer())) === hash(await fs.readFile(path.join(root, file))), `Public asset hash differs: ${file}`);
      }
      report.coverHashesMatched = files.length;
    }
    report.ok = true;
    console.log(`Guide browser: PASS; ${locales.length} locales, ${expected.tableRows.length} tables, ${expected.illustratedPlaceIds.length + 1} images each; ${path.relative(root, receiptPath)}`);
    return true;
  } catch (error) { report.error = error.message; throw error; }
  finally {
    try { await browser?.close(); } finally {
      await server?.stop();
      report.finishedAt = new Date().toISOString();
      await saveJson(receiptPath, report);
    }
  }
}

module.exports = { parseArgs, guideExpectations, main };
if (require.main === module) main().catch(error => { console.error(`Guide browser: ${error.message}`); process.exitCode = 1; });
