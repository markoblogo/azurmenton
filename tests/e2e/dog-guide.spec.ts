import { expect, test } from "@playwright/test";

const slug = "menton-with-a-dog";
test("dog guide renders complete locales, permitted sectors and all supplied illustrations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(4);
    await expect(page.locator("table tbody tr")).toHaveCount(19);
    for (const id of ["promenade-du-soleil", "promenade-reine-astrid", "plage-casino", "plage-du-gorbio-menton", "plage-hawai-menton", "dog-park-garavan-menton", "dog-park-serres-madone-menton", "dog-park-pian-menton"]) {
      await expect(page.locator(`#place-${id}`)).toBeAttached();
      const image = page.locator(`#place-${id} img`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await expect(page.locator("#related-apartments")).toHaveCount(0);
    const content = await page.locator("main").innerText();
    expect(content).not.toMatch(/SEO title:|Meta description:|Suggested URL:|\*\*|\[ \]/);
    expect(content).toContain("2023");
    expect(content).toContain("+33 4 93 71 21 41");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toContainText("does not certify any AzurMenton apartment");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const cover = page.locator(`img[src*="${slug}"]`).first();
  await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: "/tmp/menton-dog-desktop.png" });
});
