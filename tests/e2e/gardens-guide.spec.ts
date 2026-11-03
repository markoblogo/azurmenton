import { expect, test } from "@playwright/test";

const slug = "best-gardens-menton";
test("seven illustrated gardens and translated comparisons remain readable", async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await cover.scrollIntoViewIfNeeded();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(2);
    for (const [index, rows] of [[0, 7], [1, 4]]) await expect(page.locator("table").nth(index).locator("tbody tr")).toHaveCount(rows);
    for (const id of ["jardin-val-rahmeh", "jardin-serre-de-la-madone", "jardin-fontana-rosa-menton", "villa-maria-serena", "palais-carnoles-menton", "les-colombieres-menton", "jardins-bioves"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Suggested URL:|\*\*|\[ \]/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (locale === "en") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/menton-gardens-mobile.png" });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("through 27 November");
  await expect(page.locator("main")).toContainText("weekend-only");
  await expect(page.locator("main")).toContainText("no available visits");
  await page.screenshot({ path: "/tmp/menton-gardens-desktop.png" });
  await page.goto("/en/guide/menton-in-autumn", { waitUntil: "domcontentloaded" });
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
  await expect(page.locator("main")).toContainText("November 2026 exception");
});
