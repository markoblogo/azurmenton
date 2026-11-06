#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");

async function main() {
  const args = process.argv.slice(2);
  const base = args[args.indexOf("--base-url") + 1];
  const slug = args[args.indexOf("--slug") + 1];
  if (!args.includes("--base-url") || !args.includes("--slug") || !/^[a-z0-9-]+$/.test(slug)) throw Error("Required: --base-url URL --slug guide-slug");
  const origin = new URL(base).origin;
  const start = Date.now();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  let englishTitle;
  try {
    const revision = await (await page.request.get(`${origin}/api/guide-revision`)).json();
    assert(revision.guides.includes(slug), "Guide not in active/preview revision");
    const sitemap = await (await page.request.get(`${origin}/sitemap.xml`)).text();
    for (const locale of ["en", "fr", "it", "uk"]) {
      const search = await (await page.request.get(`${origin}/api/guide-search?locale=${locale}`)).json();
      const row = search.rows.find(r => r.type === "guide" && r.url === `/${locale}/guide/${slug}`);
      assert(row?.title, `Missing ${locale} search guide`);
      if (locale === "en") englishTitle = row.title;
      assert(sitemap.includes(`/${locale}/guide/${slug}`), `Missing ${locale} sitemap guide`);
      const response = await page.goto(`${origin}/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
      assert.equal(response.status(), 200);
      assert.equal(await page.locator("h1").innerText(), row.title);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `https://azurmenton.com/${locale}/guide/${slug}`);
      const images = await page.locator("main img").evaluateAll(async imgs => {
        await Promise.all(imgs.map(async img => { img.loading = "eager"; try { await img.decode(); } catch {} }));
        return imgs.map(img => ({ src: img.getAttribute("src"), ok: img.naturalWidth > 0 }));
      });
      assert(images.length && images.every(img => img.ok), `Broken ${locale} images: ${JSON.stringify(images.filter(img => !img.ok))}`);
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${locale} horizontal overflow at ${width}`);
      }
      await page.goto(`${origin}/${locale}/guide`, { waitUntil: "domcontentloaded" });
      assert(await page.locator(`a[href="/${locale}/guide/${slug}"]`).count(), `Missing ${locale} catalogue guide`);
    }
    await page.goto(`${origin}/en/search`, { waitUntil: "domcontentloaded" });
    await page.locator("#site-search").fill(englishTitle);
    await page.locator(`a[href="/en/guide/${slug}"]`).first().waitFor({ timeout: 30000 });
    if (args.includes("--related-slug")) {
      const related = args[args.indexOf("--related-slug") + 1];
      await page.goto(`${origin}/en/guide/${encodeURIComponent(related)}`, { waitUntil: "domcontentloaded" });
      assert(await page.locator(`a[href="/en/guide/${slug}"]`).count(), "Missing reciprocal older guide link");
    }
    const after = await (await page.request.get(`${origin}/api/guide-revision`)).json();
    assert.equal(after.revision, revision.revision, "Publication changed during acceptance");
    assert.equal(after.deployment, revision.deployment, "Deployment changed during acceptance");
    console.log(JSON.stringify({ status: "passed", slug, ...after, durationMs: Date.now() - start }));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
