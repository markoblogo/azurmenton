import { expect, test } from "@playwright/test";

const slug = "nice-carnival-menton-lemon-festival-itinerary";
test("February itinerary renders four locales, tables, images and night-work warnings", async ({ page }) => {
  test.setTimeout(240_000);
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(/Nice|Nizza|Ніцци/);
    await expect(page.locator("table")).toHaveCount(6);
    for (const [index, count] of [8, 3, 5, 7, 6, 7].entries()) await expect(page.locator("table").nth(index).locator("tbody tr")).toHaveCount(count);
    for (const id of [slug, "jardins-bioves", "promenade-du-soleil", "halles-du-marche", "cours-saleya-nice", "menton-station", "nice-ville-station"]) {
      const image = id === slug ? page.locator(`img[src*="${id}"]`).first() : page.locator(`#place-${id} img`);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
    }
    const main = await page.locator("main").innerText();
    expect(main).not.toMatch(/SEO title:|Meta description:|\*\*|\]\(https?:|\]\(\/(?:en|fr|it|uk)\//);
    expect(main).toContain("SNCF");
    expect(main).toContain("2027");
    expect(main).toContain("23");
    await expect(page.locator('main a[href="https://www.nicecarnaval.com/en/2027-edition/official-programme/"]').first()).toBeAttached();
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
    if (locale === "fr") {
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => scrollTo(0, 0));
        await page.locator(`img[src*="${slug}"]`).first().evaluate((element: HTMLImageElement) => element.decode());
        await page.screenshot({ path: `/tmp/february-${width}.png` });
      }
    }
  }
  await page.goto("/en/guide/menton-in-winter");
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
});
