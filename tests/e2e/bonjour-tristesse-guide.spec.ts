import { expect, test } from "@playwright/test";

const slug = "bonjour-tristesse-francoise-sagan-french-riviera";
test("Sagan guide renders four locales, its table and illustrated thematic stops", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Bonjour Tristesse");
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(1);
    await expect(page.locator("table tbody tr")).toHaveCount(4);
    for (const id of ["promenade-du-soleil", "plage-casino", "royal-westminster-menton", "jardins-bioves"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Карта литературной|\*\*/);
    expect(text).toContain("1954");
    expect(text).toContain("1958");
    expect(text).toContain("2024");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("thematic literary walk");
  await expect(page.locator("main")).not.toContainText("Menton to Ventimiglia / Italy");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "/tmp/menton-bonjour-desktop.png" });
});
