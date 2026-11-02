import { expect, test } from "@playwright/test";

const slug = "grace-of-monaco-filming-locations-menton";

test("Grace film guide renders translations, source links, tables and the supplied cover", async ({ page }) => {
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`);
    await expect(page.locator("h1")).toBeVisible();
    if (locale === "uk") await expect(page.locator("h1")).toContainText("Ментон");
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(3);
    await expect(page.locator("table").nth(1).locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("table").nth(2).locator("tbody tr")).toHaveCount(7);
    await expect(page.locator("#place-basilica-saint-michel-archange")).toBeAttached();
    await expect(page.locator("#place-esplanade-des-sablettes-menton")).toBeAttached();
    await expect(page.locator('a[href="https://us.media.france.fr/en/node/396/1000"]').first()).toBeAttached();
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Редакторские замечания|\*\*/);
  }
});

test("Grace walk stays readable on mobile and desktop", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/en/guide/${slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});
