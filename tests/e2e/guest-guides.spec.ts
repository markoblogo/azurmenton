import { expect, test } from "@playwright/test";

test("each apartment has a localized public-safe guest guide on mobile and desktop", async ({ page }) => {
  test.setTimeout(180_000);
  const apartments = ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"];
  for (const locale of ["en", "fr", "it", "uk"]) {
    for (const slug of apartments) {
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(`/${locale}/apartments/${slug}/guest-guide`);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.locator("main main")).toHaveCount(0);
      for (const id of ["arrival", "check-in", "shopping", "first-evening", "check-out"]) {
        await expect(page.locator(`#${id} h2`)).toHaveCount(1);
      }
      await expect(page.locator(`#shopping a[href^="/${locale}/guide/"][href*="#place-"]`)).toHaveCount(2);
      await expect(page.locator(`main a[href="/${locale}/contact"]`)).toHaveCount(1);
      const image = page.locator("main img");
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/apartments/panoramic-sea-view-studio/guest-guide");
  await expect(page.locator("[data-guest-parking]")).toContainText("has no parking");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  await page.screenshot({ path: test.info().outputPath("guest-guide-desktop.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: test.info().outputPath("guest-guide-mobile.png"), fullPage: true });
  await page.goto("/en/apartments/beachside-family-apartment");
  await expect(page.locator('a[href="/en/apartments/beachside-family-apartment/guest-guide"]')).toHaveCount(1);
  const response = await page.goto("/en/apartments/not-an-apartment/guest-guide");
  expect(response?.status()).toBe(404);
});
