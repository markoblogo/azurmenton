import { expect, test } from "@playwright/test";

const slug = "les-derniers-feux-de-la-royaute-menton";
test("Platel guide preserves five illustrated places, chronology, sources and readable four-language copy", async ({ page }) => {
  test.setTimeout(240_000);
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(/Platel|royauté/);
    await expect(page.locator("table")).toHaveCount(2);
    await expect(page.locator("table").nth(0).locator("tbody tr")).toHaveCount(8);
    await expect(page.locator("table").nth(1).locator("tbody tr")).toHaveCount(9);
    for (const id of [slug, "odyssee-bibliotheque-menton", "rue-longue-menton", "basilica-saint-michel-archange", "halles-du-marche", "esplanade-des-sablettes-menton"]) {
      const image = id === slug ? page.locator(`img[src*="${id}"]`).first() : page.locator(`#place-${id} img`);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
    }
    const main = await page.locator("main").innerText();
    expect(main).not.toMatch(/SEO title:|Meta description:|Рекомендации для AzurMenton|\*\*|\]\(https?:|\]\(\/(?:en|fr|it|uk)\//);
    expect(main).toContain("352");
    expect(main).toContain("1819");
    expect(main).not.toContain("1701–1702");
    await expect(page.locator('main a[href="https://harlequin.helloromance.fr/livre/13159/alienor/les-derniers-feux-de-la-royaute"]').first()).toBeAttached();
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
    if (locale === "fr") {
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => scrollTo(0, 0));
        await page.locator(`img[src*="${slug}"]`).first().evaluate((element: HTMLImageElement) => element.decode());
        await page.screenshot({ path: `/tmp/platel-${width}.png` });
      }
    }
  }
  await page.goto("/en/guide/menton-old-town");
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
});
