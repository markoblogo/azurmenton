import { expect, test } from "@playwright/test";

const slug = "menton-lemons-producers-orchards-tastings";
const newIds = ["domaine-gannac-menton", "emilie-citrons-de-pepe-menton", "sacchelli-citrus-growers-menton", "la-ferme-des-citrons-menton", "pasta-piemonte-menton"];

for (const locale of ["en", "fr", "it", "uk"]) {
  test(`lemon guide has translated content, usable tables and dedicated place images in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/${locale}/guide/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    if (locale === "uk") await expect(page.locator("h1")).toContainText("лимона");
    await expect(page.locator("table")).toHaveCount(5);
    for (const id of newIds) {
      const card = page.locator(`#place-${id}`);
      await expect(card).toHaveCount(1);
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeVisible();
      const image = card.locator("img");
      await expect(image).toHaveCount(1);
      await expect(image).toHaveAttribute("src", new RegExp(id));
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await expect(page.locator(`link[rel="canonical"]`)).toHaveAttribute("href", `https://azurmenton.com/${locale}/guide/${slug}`);
    await expect(page.locator(`main a[href="/${locale}/events/menton-lemon-festival"]`).first()).toBeAttached();
  });
}

test("lemon guide cover loads on desktop and is searchable in the catalogue", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`);
  const cover = page.locator(`img[src*="${slug}"]`).first();
  await expect(cover).toBeVisible();
  await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: "/tmp/menton-lemons-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "/tmp/menton-lemons-mobile.png" });
  await page.goto("/en/guide");
  await page.locator("#guide-finder input").fill("Beyond the Lemon Festival");
  const results = page.locator('section[aria-labelledby="guide-results"]');
  await expect(results.locator("article")).toHaveCount(1);
  await expect(results.locator(`a[href="/en/guide/${slug}"]`)).toBeVisible();
});
