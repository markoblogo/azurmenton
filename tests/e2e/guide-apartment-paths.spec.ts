import { expect, test } from "@playwright/test";

const guides = ["best-souvenir-shops-menton-monaco-nice", "cheap-eats-menton-budget-lunch", "best-ice-cream-menton", "best-seafood-restaurants-menton"];
for (const locale of ["en", "fr", "it", "uk"]) {
  test(`contextual apartment links preserve guide attribution in ${locale}`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    for (const slug of guides) {
      await page.goto(`/${locale}/guide/${slug}`);
      const section = page.locator('[aria-labelledby="guide-apartment-path"]');
      await expect(section).toHaveCount(1);
      const link = section.locator("a").first();
      await expect(section.locator("a")).toHaveCount(2);
      const href = await link.getAttribute("href");
      expect(href).toContain(`sourceGuideSlug=${slug}`);
      await link.click();
      await expect(page).toHaveURL(/\/apartments\/[^?]+\?/);
      expect(new URL(page.url()).searchParams.get("sourceGuideSlug")).toBe(slug);
      const bookingLink = page.locator('a[href*="/check-availability?"]').first();
      await expect(bookingLink).toHaveAttribute("href", new RegExp(`sourceGuideSlug=${slug}`));
    }
  });
}

test("unselected guides do not gain an inline apartment prompt", async ({ page }) => {
  await page.goto("/en/guide/public-toilets-menton");
  await expect(page.locator('[aria-labelledby="guide-apartment-path"]')).toHaveCount(0);
});
