import { expect, test } from "@playwright/test";

const slug = "best-hilltop-villages-near-menton";
test("hilltop guide has four locales, intact comparison tables and four illustrated places", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(3);
    for (const table of await page.locator("table").all()) await expect(table.locator("tbody tr")).toHaveCount(4);
    for (const id of ["sainte-agnes", "gorbio", "place-clemenceau-castellar", "roquebrune-medieval-village"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Trip duration:|Last checked:|\*\*/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await expect(page.locator(`a[href="/${locale}/guide/menton-accessible-step-free-walks"]`).first()).toBeAttached();
    if (locale === "en") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/menton-hilltop-mobile.png" });
      await page.locator("table").first().screenshot({ path: "/tmp/menton-hilltop-table-mobile.png" });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("Line 7 is labelled Sigua");
  await expect(page.locator("main")).toContainText("not for a rolling 24 hours");
  await expect(page.locator("main")).toContainText("not wheelchair-accessible");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "/tmp/menton-hilltop-desktop.png" });
});
