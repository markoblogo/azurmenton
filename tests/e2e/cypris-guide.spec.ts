import { expect, test } from "@playwright/test";

const slug = "mortelle-randonnee-villa-cypris-filming-location";
test("Cypris renders complete localized cinema guide, images and private-access caveats", async ({ page }) => {
  test.setTimeout(240_000);
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText("Cypris");
    await expect(page.locator("table")).toHaveCount(1);
    await expect(page.locator("table tbody tr")).toHaveCount(7);
    for (const id of [slug, "villa-cypris-roquebrune-cap-martin", "roquebrune-cap-martin-coastal-walk", "villa-ephrussi-de-rothschild"]) {
      const image = id === slug ? page.locator(`img[src*="${id}"]`).first() : page.locator(`#place-${id} img`);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
    }
    const main = await page.locator("main").innerText();
    expect(main).not.toMatch(/SEO title:|Meta description:|Что я рекомендую|\*\*|\]\(https?:|\]\(\/(?:en|fr|it|uk)\//);
    for (const marker of ["1904", "1990", "101", "L2TC", "2026"]) expect(main).toContain(marker);
    await expect(page.locator('main a[href="https://pop.culture.gouv.fr/notice/merimee/PA00080958"]').first()).toBeAttached();
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
    if (locale === "fr") {
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => scrollTo(0, 0));
        await page.locator(`img[src*="${slug}"]`).first().evaluate((element: HTMLImageElement) => element.decode());
        await page.screenshot({ path: `/tmp/cypris-${width}.png` });
      }
      await page.locator("#place-villa-cypris-roquebrune-cap-martin").scrollIntoViewIfNeeded();
      await page.screenshot({ path: "/tmp/cypris-card.png" });
    }
  }
  await page.goto("/en/guide/best-walks-and-hikes-around-menton");
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
  await expect(page.locator("#place-villa-cypris-roquebrune-cap-martin img")).toBeAttached();
});
