import { expect, test } from "@playwright/test";

const slug = "first-evening-menton-late-arrival";
test("late-arrival guide renders four locales, supplied place images and updated transport sources", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(2);
    await expect(page.locator("table").nth(0).locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("table").nth(1).locator("tbody tr")).toHaveCount(4);
    for (const id of ["menton-station", "menton-garavan-station", "carrefour-city-felix-faure", "carrefour-express-menton", "promenade-du-soleil", "esplanade-des-sablettes-menton"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    for (const id of ["carrefour-city-thiers-menton", "carrefour-city-sospel-menton"]) {
      const card = page.locator(`#place-${id}`);
      await expect(card).toBeAttached();
      const image = card.locator("img").first();
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute("alt", /.+/);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      await expect(card.getByRole("heading", { level: 3, name: /Carrefour City/ })).toBeAttached();
    }
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Time needed:|Last checked:|\*\*/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (locale === "en") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/menton-first-evening-mobile.png" });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("10 December 2027");
  await expect(page.locator("main")).toContainText("never post them publicly");
  await expect(page.locator("main")).toContainText("not a confirmed 23:00 option");
  await expect(page.locator("main")).toContainText("unless explicitly confirmed");
  await expect(page.getByRole("heading", { name: "Menton to Nice", exact: true })).toBeAttached();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "/tmp/menton-first-evening-desktop.png" });
  await page.goto("/en/guide/supermarkets-in-menton", { waitUntil: "domcontentloaded" });
  for (const id of ["carrefour-city-thiers-menton", "carrefour-city-sospel-menton"]) {
    const image = page.locator(`#place-${id} img`).first();
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
  for (const older of ["public-transport-in-menton", "christmas-french-riviera-from-menton"]) {
    await page.goto(`/en/guide/${older}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText("10 December 2027");
  }
});
