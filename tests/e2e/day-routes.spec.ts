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
    await first.locator("summary").click();
    await expect(first.locator("ol")).toBeVisible();
    await expect(first.locator("time")).toHaveAttribute("datetime", "2026-10-30");
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
    const links = await route.locator("ol a").evaluateAll(elements => elements.map(el => (el as HTMLAnchorElement).getAttribute("href")!));
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
    await route.screenshot({ path: `/private/tmp/menton-day-route-${width}.png` });
    if (width === 1440) {
      const top = await route.evaluate(el => el.getBoundingClientRect().top + window.scrollY);
      await page.evaluate(y => window.scrollTo(0, y), top - 160);
      await page.screenshot({ path: "/private/tmp/menton-day-route-preview.png" });
    }
  }
});
