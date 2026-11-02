import { expect, test } from "@playwright/test";

const slug = "flea-markets-brocantes-vintage-menton";

test("vintage guide renders four languages, three tables, source links and the supplied cover", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`);
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(3);
    for (const [index, rows] of [[0, 9], [1, 6], [2, 9]]) await expect(page.locator("table").nth(index).locator("tbody tr")).toHaveCount(rows);
    for (const id of ["menton-brocante-mail-du-bastion", "place-du-cap-menton", "cours-saleya-antiques", "marche-aux-puces-nice", "ventimiglia-friday-market", "halles-du-marche"]) await expect(page.locator(`#place-${id}`)).toBeAttached();
    for (const id of ["menton-brocante-mail-du-bastion", "marche-aux-puces-nice", "ventimiglia-friday-market"]) {
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await expect(page.locator('a[href="https://www.douane.gouv.fr/demarche/exporter-des-biens-culturels"]').first()).toBeAttached();
    expect(await page.locator("main").innerText()).not.toMatch(/SEO title:|Meta description:|\*\*|\[ \]/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (locale === "en") await page.screenshot({ path: "/tmp/menton-flea-mobile.png" });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`/en/guide/${slug}`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "/tmp/menton-flea-desktop.png" });
});
