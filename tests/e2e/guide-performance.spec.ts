import { expect, test } from "@playwright/test";

test.use({ deviceScaleFactor: 1.75 });
test.setTimeout(60_000);

test.beforeEach(async ({ context }) => {
  await context.route("**/*", route => ["localhost", "127.0.0.1"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

test("guide only preloads critical fonts and serves hero thumbnails at their actual size", async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 823 });
  await page.goto("/en/guide");
  await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(2);
  const hero = page.locator("main > section").first();
  const images = hero.locator("img");
  await expect(images).toHaveCount(4);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), { timeout: 15_000 }).toBe(true);
    const width = await image.evaluate((el: HTMLImageElement) => Number(new URL(el.currentSrc).searchParams.get("w")));
    expect(width).toBeLessThanOrEqual(384);
    await expect(image).toHaveAttribute("loading", "lazy");
  }
});

test("Ukrainian headings retain their real Cyrillic font without speculative preloading", async ({ page }) => {
  await page.goto("/uk/guide");
  await expect(page.locator("main h1")).toContainText("Ментон");
  const faces = await page.locator("main h1").evaluate(async element => {
    const style = getComputedStyle(element);
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-serif").split(",")[0].trim();
    const loaded = await document.fonts.load(`${style.fontWeight} ${style.fontSize} ${family}`, "Ментон");
    return loaded.length;
  });
  expect(faces).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
});

test("travel tools still load the monospace display font on demand", async ({ page }) => {
  await page.goto("/en/tools");
  const fontCount = await page.locator(".font-mono").first().evaluate(async element => {
    const style = getComputedStyle(element);
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").split(",")[0].trim();
    return (await document.fonts.load(`${style.fontWeight} ${style.fontSize} ${family}`, "12:34")).length;
  });
  expect(fontCount).toBeGreaterThan(0);
});
