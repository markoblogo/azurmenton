import { expect, test } from "@playwright/test";

test("other guides use their existing apartment links with explanations and attribution", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const slug of ["best-coffee-menton", "best-markets-near-menton-market-days-in-france-and-italy"]) {
    await page.goto(`/en/guide/${slug}`);
    const section = page.locator("[data-contextual-apartments]");
    await expect(section).toHaveCount(1);
    expect(await section.locator("article").count()).toBeGreaterThan(0);
    for (const card of await section.locator("article").all()) {
      await expect(card.locator(`a[href*="sourceGuideSlug=${slug}"]`)).toHaveCount(1);
      await expect(card.locator("dl")).toContainText("Guests");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
});

test("family and winter recommendations explain fit in every locale and fit phones", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 320, height: 900 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/guide/menton-with-kids-family-guide`);
    const family = page.locator("[data-contextual-apartments]");
    await expect(family.locator("article")).toHaveCount(1);
    await expect(family.locator(`a[href*="/${locale}/apartments/beachside-family-apartment"]`)).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    await page.goto(`/${locale}/guide/menton-in-winter`);
    await expect(page.locator("[data-contextual-apartments] article")).toHaveCount(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/guide/menton-with-kids-family-guide");
  const familyImage = page.locator("[data-contextual-apartments] img");
  await familyImage.scrollIntoViewIfNeeded();
  await expect.poll(() => familyImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
  await page.locator("[data-contextual-apartments]").screenshot({ path: test.info().outputPath("family-stay.png") });
  await page.goto("/en/guide/menton-in-winter");
  await expect(page.locator("[data-contextual-apartments]")).toContainText("no monthly rate or discount is promised");
  for (const image of await page.locator("[data-contextual-apartments] img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 30_000 }).toBe(true);
  }
  await page.locator("[data-contextual-apartments]").screenshot({ path: test.info().outputPath("winter-stay.png") });
});

test("event dates prefill the existing request without sending it or changing the saved trip", async ({ page }) => {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  let submissions = 0;
  await page.route("**/api/booking-request", route => { submissions++; return route.abort(); });
  await page.goto("/en/events/st-johns-jazz-menton-2026-11-06");
  const section = page.locator("[data-contextual-apartments]");
  const dates = section.locator('a[href*="checkIn="]');
  if (today <= "2026-11-06") {
    await expect(dates).toHaveCount(3);
    await section.screenshot({ path: test.info().outputPath("event-stay.png") });
    const saved = JSON.stringify({ version: 1, trip: { checkIn: "2027-02-15", checkOut: "2027-02-20", adults: 2, children: 0, car: false, interests: [] } });
    await page.evaluate(value => localStorage.setItem("azurmenton.trip.v1", value), saved);
    const href = new URL((await dates.first().getAttribute("href"))!, "https://azurmenton.com");
    await dates.first().click();
    expect(href.searchParams.get("checkIn")).toBe("2026-11-06");
    expect(href.searchParams.get("checkOut")).toBe("2026-11-07");
    await expect(page.locator('[name="checkIn"]')).toHaveValue("2026-11-06");
    await expect(page.locator('[name="checkOut"]')).toHaveValue("2026-11-07");
    await expect(page.locator('[name="apartment"]')).toHaveValue(href.searchParams.get("apartment")!);
    expect(await page.evaluate(() => localStorage.getItem("azurmenton.trip.v1"))).toBe(saved);
  } else {
    await expect(dates).toHaveCount(0);
  }
  expect(submissions).toBe(0);
  await page.goto("/en/events/christmas-village-monaco-2026");
  // A month-long programme must not preselect a month-long booking.
  await expect(page.locator("[data-contextual-apartments]")).toHaveCount(1);
  await expect(page.locator('[data-contextual-apartments] a[href*="checkIn="]')).toHaveCount(0);
});
