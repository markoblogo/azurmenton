import { expect, test } from "@playwright/test";

const slug = "french-riviera-pass-worth-it-from-menton";

test("pass guide keeps corrected costs, real links, cover and translations", async ({ page }) => {
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`);
    await expect(page.locator("h1")).toContainText("French Riviera Pass");
    if (locale === "uk") await expect(page.locator("h1")).toContainText("Ментоні");
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("#place-galimard-pause-cologne-eze")).toBeAttached();
    const placeImage = page.locator("#place-galimard-pause-cologne-eze img").first();
    await placeImage.scrollIntoViewIfNeeded();
    await expect.poll(() => placeImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator('a[href="https://www.galimard.com/visite-guidee-eze"]').first()).toBeAttached();
    await expect(page.locator("table")).toHaveCount(9);
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Интерактивный расчёт|Редакторская рекомендация|\*\*/);
    expect(await page.locator("table").nth(6).innerText()).toContain("€52");
  }
});

test("pass comparison tables do not overflow the mobile page", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/en/guide/${slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});
