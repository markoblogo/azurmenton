import { expect, test } from "@playwright/test";

const slug = "the-houses-that-remember-riviera-book-route";
for (const locale of ["en", "fr", "it", "uk"]) {
  test(`book companion has readable localized content and correct links in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/${locale}/guide/${slug}`);
    expect(response?.status()).toBe(200);
    if (locale === "uk") await expect(page.locator("h1")).toContainText("життів");
    await expect(page.locator("table")).toHaveCount(2);
    for (const asin of ["B0HPWYK4DG", "B0HPXG3RQ4", "B0HPX2CWKP"]) {
      await expect(page.locator(`main a[href*="amazon.com/dp/${asin}"]`)).toHaveCount(2);
    }
    await expect(page.locator('main a[href="https://abvx.xyz/writing/the-houses-that-remember-new-azurbooks-book"]')).toHaveCount(1);
    const cover = page.locator('img[src*="the-houses-that-remember-book-cover"]').first();
    await cover.scrollIntoViewIfNeeded();
    await expect.poll(() => cover.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator("#place-villa-isola-bella-menton img")).toHaveCount(0);
    await expect(page.locator("#place-le-regina-nice img")).toHaveCount(0);
    await expect(page.locator("#place-musee-matisse-nice")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://azurmenton.com/${locale}/guide/${slug}`);
  });
}

test("book companion loads its display illustration and remains searchable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`);
  const cover = page.locator(`img[src*="${slug}"]`).first();
  await cover.scrollIntoViewIfNeeded();
  await expect.poll(() => cover.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: "/tmp/houses-guide-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  const bookCover = page.locator('img[src*="the-houses-that-remember-book-cover"]').first();
  await bookCover.scrollIntoViewIfNeeded();
  await expect.poll(() => bookCover.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: "/tmp/houses-guide-mobile.png" });
  await page.goto("/en/guide");
  await page.locator("#guide-finder input").fill("The Houses That Remember");
  await expect(page.locator(`section[aria-labelledby="guide-results"] a[href="/en/guide/${slug}"]`)).toBeVisible();
});
