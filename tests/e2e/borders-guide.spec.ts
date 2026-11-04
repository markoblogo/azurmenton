import { expect, test } from "@playwright/test";

const slug = "france-monaco-italy-travel-from-menton";
test("border guide renders four locales, ticket tables, illustrations and source limits", async ({ page }) => {
  test.setTimeout(240_000);
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(/Monaco|Монако/);
    await expect(page.locator("table")).toHaveCount(3);
    for (const [index, rows] of [8, 3, 7].entries()) await expect(page.locator("table").nth(index).locator("tbody tr")).toHaveCount(rows);
    for (const id of [slug, "menton-station", "menton-garavan-station", "monaco-monte-carlo-station", "ventimiglia-station", "monaco-monte-carlo", "ventimiglia", "sanremo"]) {
      const image = id === slug ? page.locator(`img[src*="${id}"]`).first() : page.locator(`#place-${id} img`);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
    }
    const main = await page.locator("main").innerText();
    expect(main).not.toMatch(/SEO title:|Meta description:|\*\*|\]\(https?:|\]\(\/(?:en|fr|it|uk)\//);
    for (const marker of ["Orange", "Sosh", "2027", "Trenitalia"]) expect(main).toContain(marker);
    await expect(page.locator('main a[href="https://boutique.orange.fr/informations/le-reseau-a-monaco/"]').first()).toBeAttached();
    await expect(page.locator('main a[href="https://www.trenitalia.com/en/information/digital-regional-ticket.html"]').first()).toBeAttached();
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
    if (locale === "fr") {
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: `/tmp/borders-${width}.png` });
      }
      await page.setViewportSize({ width: 390, height: 1000 });
      await page.locator("table").first().scrollIntoViewIfNeeded();
      await page.screenshot({ path: "/tmp/borders-table.png" });
    }
  }
  await page.goto("/en/guide/day-trips-from-menton");
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
});
