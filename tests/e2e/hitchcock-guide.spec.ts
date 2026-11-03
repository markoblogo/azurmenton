import { expect, test } from "@playwright/test";

const slug = "to-catch-a-thief-hitchcock-villefranche-sur-mer";
test("Hitchcock guide keeps translated tables, place cards and attribution warnings readable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(3);
    for (const [index, rows] of [[0, 7], [1, 7], [2, 9]]) await expect(page.locator("table").nth(index).locator("tbody tr")).toHaveCount(rows);
    for (const id of ["villefranche-sur-mer-station", "villefranche-sur-mer", "rue-obscure-villefranche", "quai-amiral-courbet-villefranche", "chapelle-saint-pierre-villefranche", "citadelle-saint-elme-villefranche"]) await expect(page.locator(`#place-${id}`)).toBeAttached();
    for (const id of ["villefranche-sur-mer-station", "villefranche-sur-mer", "rue-obscure-villefranche", "quai-amiral-courbet-villefranche", "chapelle-saint-pierre-villefranche", "citadelle-saint-elme-villefranche"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Редакторские рекомендации|\*\*|\[ \]/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (locale === "en") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/menton-hitchcock-mobile.png" });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("closed since January 2022");
  await expect(page.locator("main")).toContainText("does not include Villa Agnelli");
  await expect(page.locator("main")).toContainText("mid-November to mid-December");
  await page.screenshot({ path: "/tmp/menton-hitchcock-desktop.png" });
  await page.goto("/en/guide/jean-cocteau-menton-walking-route", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#place-chapelle-saint-pierre-villefranche")).toBeAttached();
  await expect(page.locator(`a[href="/en/guide/${slug}"]`).first()).toBeAttached();
});
