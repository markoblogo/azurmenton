import { expect, test } from "@playwright/test";

test.setTimeout(180_000);

test.beforeEach(async ({ page, context }) => {
  await page.clock.setFixedTime(new Date("2026-10-28T12:00:00Z"));
  await context.route("**/*", route => {
    const host = new URL(route.request().url()).hostname;
    return ["localhost", "127.0.0.1"].includes(host) ? route.continue() : route.abort();
  });
  await context.addInitScript(() => {
    const w = window as unknown as { testEvents: unknown[]; plausible: (name: string, options: unknown) => void; copiedLink: string };
    w.testEvents = [];
    w.plausible = (name, options) => w.testEvents.push({ name, options });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (text: string) => { w.copiedLink = text; } } });
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
  });
});

test("trip persists privately, ranks seasonal content and only fills a request after explicit action", async ({ page }) => {
  await page.goto("/en/my-trip");
  await page.getByLabel("Arrival", { exact: true }).fill("2027-02-15");
  await page.getByLabel("Departure", { exact: true }).fill("2027-02-20");
  await page.getByLabel("Adults", { exact: true }).fill("3");
  await page.getByLabel("Children", { exact: true }).fill("1");
  await page.getByRole("button", { name: "Save trip", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Saved on this device");
  await expect(page.locator('a[href$="/guide/menton-in-winter"]')).toBeVisible();
  await expect(page.locator('a[href$="/guide/stay-cool-in-menton-summer"]')).toHaveCount(0);
  await expect(page.locator("li").filter({ has: page.locator('a[href="/en/events/fete-du-citron-2027"]') })).toContainText("13-28");
  await page.reload();
  await expect(page.getByLabel("Arrival", { exact: true })).toHaveValue("2027-02-15");
  await page.getByRole("link", { name: "Request availability", exact: true }).click();
  const dates = page.locator('input[name="checkIn"]');
  await expect(page.getByRole("button", { name: "Use my saved trip" })).toBeVisible();
  await expect(dates).toHaveValue("");
  await page.getByRole("button", { name: "Use my saved trip" }).click();
  await expect(dates).toHaveValue("2027-02-15");
  await expect(page.locator('input[name="checkOut"]')).toHaveValue("2027-02-20");
  await expect(page.locator('input[name="adults"]')).toHaveValue("3");
  await expect(page.locator('input[name="children"]')).toHaveValue("1");
  const events = await page.evaluate(() => (window as unknown as { testEvents: unknown[] }).testEvents);
  expect(events).toContainEqual({ name: "trip_prefill_used", options: { props: { locale: "en" } } });
  expect(JSON.stringify(events)).not.toContain("2027-02-15");
  await page.goto("/en/check-availability?apartment=sea-view-balcony-studio&checkIn=2027-03-01&checkOut=2027-03-05");
  await expect(page.getByText("Selected stay", { exact: true })).toBeVisible();
  await page.evaluate(() => { (document.querySelector('input[name="availabilityOverride"]') as HTMLInputElement).value = "accepted"; });
  await page.getByRole("button", { name: "Use my saved trip" }).click();
  await expect(page.getByText("Selected stay", { exact: true })).toHaveCount(0);
  await expect(page.locator('input[name="availabilityOverride"]')).toHaveValue("");
  await expect(page.locator('input[name="checkIn"]')).toHaveValue("2027-02-15");
  await expect(page.locator('select[name="apartment"]')).toHaveValue("sea-view-balcony-studio");
  await page.goto("/en/my-trip");
  await page.getByRole("button", { name: "Clear trip" }).click();
  expect(await page.evaluate(() => localStorage.getItem("azurmenton.trip.v1"))).toBeNull();
});

test("favourites survive reload, share a snapshot and do not replace the recipient's list", async ({ page, context }) => {
  await page.goto("/en/guide/menton-old-town");
  const heart = page.locator('button[data-content-type="guide"][data-content-id="menton-old-town"]');
  await heart.click();
  await expect(heart).toHaveAttribute("aria-pressed", "true");
  const events = await page.evaluate(() => (window as unknown as { testEvents: unknown[] }).testEvents);
  expect(events).toContainEqual({ name: "favourite_added", options: { props: { locale: "en", contentType: "guide", contentId: "menton-old-town" } } });
  await page.reload();
  await expect(heart).toHaveAttribute("aria-pressed", "true");
  await page.goto("/en/favourites");
  await expect(page.locator('main a[href="/en/guide/menton-old-town"]')).toBeVisible();
  await page.getByRole("button", { name: "Share collection", exact: true }).click();
  await page.getByRole("button", { name: "Copy link", exact: true }).click();
  const shared = await page.evaluate(() => (window as unknown as { copiedLink: string }).copiedLink);
  expect(shared).toContain("#collection=");
  const recipient = await context.newPage();
  await recipient.goto("/en/favourites");
  await recipient.evaluate(() => localStorage.setItem("azurmenton.favourites.v1", JSON.stringify({ version: 1, items: [{ type: "guide", id: "menton-in-winter" }] })));
  await recipient.goto(shared);
  await expect(recipient.getByRole("heading", { name: "Shared collection" })).toBeVisible();
  await expect(recipient.locator('main a[href="/en/guide/menton-old-town"]')).toBeVisible();
  expect(await recipient.evaluate(() => JSON.parse(localStorage.getItem("azurmenton.favourites.v1")!).items)).toEqual([{ type: "guide", id: "menton-in-winter" }]);
});

test("trip pages fit phones and render in every locale", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [locale, heading] of [["en", "My trip"], ["fr", "Mon séjour"], ["it", "Il mio viaggio"], ["uk", "Моя поїздка"]]) {
    await page.goto(`/${locale}/my-trip`);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
  for (const width of [320, 1024, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en/my-trip");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
});

test("places share a real card anchor and events can be saved", async ({ page }) => {
  await page.goto("/en/guide/menton-old-town");
  const card = page.locator('article[id^="place-"]').first();
  await card.getByRole("button", { name: "Share", exact: true }).click();
  const copied = await page.evaluate(() => (window as unknown as { copiedLink: string }).copiedLink);
  const target = new URL(copied);
  expect(target.hash).toMatch(/^#place-/);
  await page.goto(`${target.pathname}${target.hash}`);
  await expect(page.locator(target.hash)).toBeVisible();
  await page.goto("/en/events/vivaldi-gloria-menton-2026-10-31");
  const heart = page.locator('button[data-content-type="event"]');
  await heart.click();
  await expect(heart).toHaveAttribute("aria-pressed", "true");
  await heart.click();
  await expect(heart).toHaveAttribute("aria-pressed", "false");
  const events = await page.evaluate(() => (window as unknown as { testEvents: { name: string }[] }).testEvents);
  expect(events.map(e => e.name)).toContain("favourite_removed");
  const venue = page.locator('button[data-content-type="place"]').first();
  const venueId = await venue.getAttribute("data-content-id");
  await venue.click();
  await page.goto("/en/favourites");
  await expect(page.locator(`main a[href$="#place-${venueId}"]`)).toBeVisible();
});
