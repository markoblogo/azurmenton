import { expect, test } from "@playwright/test";

test.setTimeout(180_000);
test.beforeEach(async ({ context }) => {
  await context.route("**/*", route => ["localhost", "127.0.0.1"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

test("five route cards remain readable in four locales, including without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await context.route("**/*", route => ["localhost", "127.0.0.1"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  const page = await context.newPage();
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/stay`, { waitUntil: "domcontentloaded" });
    const routes = page.locator("[data-day-route]");
    await expect(routes).toHaveCount(5);
    const first = routes.first();
    await expect(first.locator("ol")).toBeHidden();
    await first.locator("summary").evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await first.locator("summary").click({ timeout: 10_000 });
    await expect(first.locator("ol")).toBeVisible();
    for (const time of await first.locator("time").all()) await expect(time).toHaveAttribute("datetime", "2026-10-30");
    await expect(first.locator('[data-place-visit-notes="halles-du-marche"] a')).toHaveAttribute("href", "https://www.menton-riviera-merveilles.fr/offres/halles-de-menton-menton-fr-3834101/");
    for (const route of await routes.all()) {
      expect(await route.locator("[data-place-visit-notes]").count()).toBeGreaterThan(0);
    }
    const sources = await routes.locator("[data-place-visit-notes] a").evaluateAll(links => links.map(link => link.getAttribute("href")));
    expect(sources.every(href => href?.startsWith("https://"))).toBe(true);
    const museum = page.locator('[data-day-route="monaco-event-weekend"] [data-place-visit-notes="oceanographic-museum-monaco"]');
    await expect(museum).toContainText("-1");
    await expect(museum).toContainText(/parking des pêcheurs/i);
    const station = page.locator('[data-day-route="monaco-event-weekend"] [data-place-visit-notes="monaco-monte-carlo-station"]');
    await expect(station).toContainText(/rue suffren-reymond/i);
    const beach = page.locator('[data-day-route="one-day-without-car"] [data-place-visit-notes="plage-sablettes"]');
    await expect(beach).toContainText(/quai bonaparte/i);
    const promenade = page.locator('[data-day-route="family-menton"] [data-place-visit-notes="promenade-du-soleil"]');
    await expect(promenade).toContainText("Carnot");
    if (locale === "en") await expect(museum).toContainText("all ages");
    if (locale === "uk") await expect(museum).toContainText("Дитячі візочки");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
  await context.close();
});

test("guide routes show practical facts and link to real place anchors", async ({ page }) => {
  const paths = [
    ["menton-old-town", "one-day-without-car"],
    ["menton-with-kids-family-guide", "family-menton"],
    ["monaco-events-from-menton", "monaco-event-weekend"],
    ["italian-riviera-day-trip-from-menton", "italian-riviera-day"],
    ["jean-cocteau-menton-walking-route", "cocteau-walking-day"],
  ];
  for (const [slug, id] of paths) {
    await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
    const route = page.locator(`[data-day-route="${id}"]`);
    await expect(route.locator("details")).toHaveAttribute("open", "");
    await expect(route).toContainText("Minimum ages");
    await expect(route).toContainText("editorial estimates");
    const links = await route.locator('ol a[href^="/"]').evaluateAll(elements => elements.map(el => (el as HTMLAnchorElement).getAttribute("href")!));
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const href of links) {
      await page.goto(href, { waitUntil: "domcontentloaded" });
      await expect(page.locator(new URL(href, "http://localhost").hash)).toHaveCount(1);
    }
  }
});

test("route cards fit narrow phones and desktop without clipping", async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en/guide/jean-cocteau-menton-walking-route", { waitUntil: "domcontentloaded" });
    const route = page.locator('[data-day-route="cocteau-walking-day"]');
    await expect(route).toContainText("Exterior only");
    expect(await route.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    await route.screenshot({ path: test.info().outputPath(`menton-day-route-${width}.png`) });
    if (width === 1440) {
      const top = await route.evaluate(el => el.getBoundingClientRect().top + window.scrollY);
      await page.evaluate(y => window.scrollTo(0, y), top - 160);
      await page.screenshot({ path: test.info().outputPath("menton-day-route-preview.png") });
    }
  }
});
