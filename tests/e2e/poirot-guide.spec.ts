import { expect, test } from "@playwright/test";

const slug = "poirot-blue-train-filming-locations-menton";
test("Poirot guide keeps four illustrated places, evidence limits and translated tables readable", async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await cover.scrollIntoViewIfNeeded();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
    await expect(page.locator("table")).toHaveCount(3);
    for (const [index, rows] of [[0, 4], [1, 3], [2, 8]]) await expect(page.locator("table").nth(index).locator("tbody tr")).toHaveCount(rows);
    for (const id of ["palais-carnoles-menton", "rue-de-brea-menton", "basilica-saint-michel-archange", "villa-maria-serena"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
    }
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Suggested URL:|<\/?escape>|Что я рекомендую|\*\*|\]\(\/(?:en|fr|it|uk)\/guide\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (locale === "en") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/menton-poirot-mobile.png" });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("weekends only");
  await expect(page.locator("main")).toContainText("No later session is confirmed");
  await expect(page.locator("main")).toContainText("does not identify this episode");
  await page.screenshot({ path: "/tmp/menton-poirot-desktop.png" });
  await page.goto("/en/guide/films-shot-in-menton", { waitUntil: "domcontentloaded" });
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
});
