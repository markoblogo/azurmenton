import { expect, test } from "@playwright/test";

for (const locale of ["en", "fr", "it", "uk"]) {
  test(`guide search remains interactive in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/guide`);
    const results = page.locator('section[aria-labelledby="guide-results"]');
    const cards = results.locator("article");
    await expect(cards).toHaveCount(12);
    const title = await cards.first().locator("h3").innerText();
    const search = page.locator("#guide-finder input");
    await search.fill(title);
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator("h3")).toHaveText(title);
    await search.fill("no-guide-matches-this-unique-query");
    await expect(cards).toHaveCount(0);
    await search.fill("");
    await expect(cards).toHaveCount(12);
  });
}
