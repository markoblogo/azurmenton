import { expect, test } from "@playwright/test";

const slug = "les-petites-affaires-du-port-french-puzzle-book";
test("book recommendation preserves image order, real cover, language and hidden answers in four locales", async ({ page }) => {
  test.setTimeout(240_000);
  for (const locale of ["fr", "en", "it", "uk"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/guide/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toHaveText("Les petites affaires du port");
    for (const selector of ["[data-book-promo] img", "[data-book-card] img", '[data-book-section="1"] img', '[data-book-section="5"] img']) {
      const image = page.locator(selector);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
    }
    await expect(page.locator("[data-book-card] img")).toHaveAttribute("src", /book-cover/);
    const details = page.locator("details");
    await expect(details).toHaveCount(3);
    for (const item of await details.all()) {
      await expect(item).not.toHaveAttribute("open");
      await expect(item.locator("div").first()).not.toBeVisible();
    }
    const answer = details.nth(1);
    await answer.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(answer).toHaveAttribute("open", "");
    await expect(answer).toContainText(locale === "fr" ? "10 h 42" : "10:42");
    await page.keyboard.press("Enter");
    await expect(answer).not.toHaveAttribute("open");
    expect(await page.locator("main").innerText()).not.toMatch(/<\/?escape>|SEO title|Meta description|\*\*|\]\(https?:/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const rows = page.locator("table tbody tr");
    await expect(rows).toHaveCount(locale === "fr" ? 7 : 8);
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
    if (locale === "fr") {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/port-book-mobile.png" });
      await page.setViewportSize({ width: 1440, height: 1100 });
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: "/tmp/port-book-desktop.png" });
    }
  }
});

test("solutions remain operable with JavaScript disabled", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto(`/fr/guide/${slug}`);
  const answer = page.locator("#port-book-solution-2");
  await expect(answer).not.toHaveAttribute("open");
  await answer.locator("summary").click();
  await expect(answer).toHaveAttribute("open", "");
  await expect(answer.locator("div").first()).toBeVisible();
  await context.close();
});
