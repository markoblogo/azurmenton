import { expect, test } from "@playwright/test";

for (const width of [320, 390]) test(`mobile language links remain accessible at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await page.goto("/en/check-availability");
  const links = page.locator('header a[hreflang]');
  await expect(links).toHaveCount(4);
  const search = page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "Search" });
  await expect(search).toBeVisible();
  const searchBox = await search.boundingBox();
  expect(searchBox && searchBox.x >= 0 && searchBox.x + searchBox.width <= width).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  for (const link of await links.all()) {
    const text = (await link.innerText()).trim();
    expect(await link.getAttribute("aria-label")).toContain(text);
    const box = await link.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(24);
    expect(box?.height).toBeGreaterThanOrEqual(24);
  }
  await links.filter({ hasText: "FR" }).click();
  await expect(page).toHaveURL(/\/fr\/check-availability/);
});
