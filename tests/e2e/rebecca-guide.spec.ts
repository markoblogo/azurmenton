import { expect, test } from "@playwright/test";

const slug = "rebecca-monte-carlo-daphne-du-maurier-literary-walk";
test("Rebecca literary guide renders four locales, its cover, table and contextual stops", async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  for (const locale of ["en","fr","it","uk"]) {
    await page.goto(`/${locale}/guide/${slug}`, {waitUntil:"domcontentloaded"});
    await expect(page.locator("h1")).toBeVisible();
    const cover = page.locator(`img[src*="${slug}"]`).first();
    await expect.poll(() => cover.evaluate((image:HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("table")).toHaveCount(1);
    await expect(page.locator("table tbody tr")).toHaveCount(5);
    for (const id of ["casino-square-monaco","hotel-de-paris-monte-carlo","casino-de-monte-carlo","jardins-petite-afrique-monaco","cafe-de-paris-monte-carlo"]) await expect(page.locator(`#place-${id}`)).toBeAttached();
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Редакторские рекомендации|\*\*/);
    expect(text).toContain("1938");
    expect(text).toContain("1864");
    expect(text).toContain("Waddesdon");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(`/en/guide/${slug}`, {waitUntil:"domcontentloaded"});
  await expect(page.locator("main")).toContainText("fictional literary hotel");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const cover = page.locator(`img[src*="${slug}"]`).first();
  await expect.poll(() => cover.evaluate((image:HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.screenshot({path:"/tmp/menton-rebecca-desktop.png"});
});
