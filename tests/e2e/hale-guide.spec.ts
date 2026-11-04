import { expect, test } from "@playwright/test";

const slug = "julian-hale-french-riviera-cultural-history";
test("Hale cultural guide has readable localized tables and correctly matched illustrations", async ({ page }) => {
  test.setTimeout(300_000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    for (const id of [slug, "trophee-auguste-la-turbie", "cathedrale-saint-nicolas-nice"]) {
      const image = id === slug ? page.locator(`img[src*="${slug}"]`).first() : page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
      await expect(image).toHaveAttribute("src", new RegExp(id));
    }
    await expect(page.locator("table")).toHaveCount(2);
    await expect(page.locator("table").nth(0).locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("table").nth(1).locator("tbody tr")).toHaveCount(4);
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Suggested URL:|\*\*|\]\(\/(?:en|fr|it|uk)\/guide\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (locale === "en") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/menton-hale-mobile.png" });
      const cards = page.locator('[id^="place-"] img');
      expect(await cards.count()).toBeGreaterThanOrEqual(21);
      for (const image of await cards.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("no later programme is confirmed");
  await expect(page.locator("main")).toContainText("11 November");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "/tmp/menton-hale-desktop.png" });
  await page.goto("/en/guide/best-gardens-menton", { waitUntil: "domcontentloaded" });
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
});
