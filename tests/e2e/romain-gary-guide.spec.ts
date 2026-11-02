import { expect, test } from "@playwright/test";

const slug = "romain-gary-nice-promise-at-dawn-literary-walk";

test("Gary guide keeps its cover, real links and localizations", async ({ page }) => {
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.locator("main").innerText()).not.toMatch(/\*\*|\*Promise at Dawn\*|_Promise at Dawn_|_La Promesse/);
    if (locale === "uk") await expect(page.locator("h1")).toContainText("Ромена Гарі");
    await expect(page.locator('a[href="https://www.ndbooks.com/book/promise-at-dawn/"]').first()).toBeAttached();
    await expect(page.locator("#place-hotel-pension-mermonts-nice")).toBeAttached();
    await expect(page.locator("#place-lycee-massena-nice")).toBeAttached();
    await expect(page.locator("table").first().locator("tbody tr")).toHaveCount(7);
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect(cover).toBeVisible();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
});

test("Gary guide has readable mobile and desktop content without overflow", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/en/guide/${slug}`);
    await expect(page.getByRole("heading", { name: "5. Hôtel-Pension Mermonts: the most important surviving address", exact: true })).toBeAttached();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  }
});
