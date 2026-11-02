import { expect, test } from "@playwright/test";

const slug = "tender-is-the-night-fitzgerald-french-riviera";

test("Fitzgerald guide renders four languages, chronology, cover and guarded public/private places", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/${slug}`);
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(1);
    await expect(page.locator("table tbody tr")).toHaveCount(5);
    for (const id of ["hotel-belles-rives-juan-les-pins", "juan-les-pins-seafront", "plage-la-garoupe-antibes", "hotel-du-cap-eden-roc-antibes", "sentier-tirepoil-cap-antibes"]) await expect(page.locator(`#place-${id}`)).toBeAttached();
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Карта литературной|\*\*|\[ \]/);
    expect(text).toContain("2027");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`/en/guide/${slug}`);
  await expect(page.locator("main")).toContainText("18 April to 17 October 2027");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
