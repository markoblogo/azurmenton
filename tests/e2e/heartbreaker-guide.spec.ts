import { expect, test } from "@playwright/test";

const slug = "heartbreaker-larnacoeur-monaco-filming-locations";
test("Heartbreaker guide shows four locales, three tables, Monaco transport and five illustrated stops", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(3);
    for (const [index, rows] of [[0, 8], [1, 6], [2, 13]]) await expect(page.locator("table").nth(index).locator("tbody tr")).toHaveCount(rows);
    for (const id of ["monte-carlo-bay-hotel-resort", "casino-square-monaco", "opera-de-monte-carlo", "monte-carlo-beach-roquebrune-cap-martin", "monaco-monte-carlo-station"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Карта съёмочных|\*\*/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (locale === "en") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/menton-heartbreaker-mobile.png" });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("Roquebrune-Cap-Martin, France");
  await expect(page.getByRole("heading", { name: "Menton to Monaco", exact: true })).toBeAttached();
  await expect(page.locator("main")).not.toContainText("Menton to Ventimiglia / Italy");
  await expect(page.locator("main")).not.toContainText("Menton to Nice");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "/tmp/menton-heartbreaker-desktop.png" });
  for (const id of ["monte-carlo-bay-hotel-resort", "monte-carlo-beach-roquebrune-cap-martin"]) await page.locator(`#place-${id}`).screenshot({ path: `/tmp/${id}-card.png` });
});
