import { expect, test } from "@playwright/test";

const tripKey = "azurmenton.trip.v1";
const favKey = "azurmenton.favourites.v1";
const profile = { checkIn: "2027-02-15", checkOut: "2027-02-20", adults: 2, children: 1, car: false, interests: ["walks-views"] };
const placeIds = ["halles-du-marche", "rue-saint-michel-menton", "plage-sablettes"];
const favourites = [...placeIds.map(id => ({ type: "place", id })), { type: "guide", id: "menton-old-town" }];
test.setTimeout(180_000);

test.beforeEach(async ({ page, context }) => {
  await page.clock.setFixedTime(new Date("2026-10-30T12:00:00Z"));
  await context.route("**/*", route => ["localhost", "127.0.0.1"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await context.addInitScript(() => { Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value: string) => { (window as unknown as { copiedLink: string }).copiedLink = value; } } }); });
  await page.goto("/en/my-trip");
  await page.evaluate(({ tk, fk, trip, items }) => { localStorage.setItem(tk, JSON.stringify({ version: 1, trip })); localStorage.setItem(fk, JSON.stringify({ version: 1, items })); }, { tk: tripKey, fk: favKey, trip: profile, items: favourites });
});

test("builds from favourite places, preserves selection order and keeps shared links private", async ({ page }) => {
  await page.goto("/en/favourites");
  const builder = page.locator("[data-place-day-builder]");
  await expect(builder.getByRole("checkbox")).toHaveCount(3);
  await expect(builder.getByLabel("Day of your trip")).toHaveAttribute("max", "2027-02-19");
  await builder.getByLabel("Day of your trip").fill("2027-02-16");
  await builder.getByLabel("Rue Saint-Michel", { exact: true }).check();
  await builder.getByLabel("Halles du Marché", { exact: true }).check();
  await builder.getByLabel("Plage des Sablettes", { exact: true }).check();
  await builder.getByRole("button", { name: "Add selected stops", exact: true }).click();
  await expect(page.locator("#place-days")).toContainText("Stops saved on this device.");
  await page.getByRole("button", { name: "Share collection", exact: true }).click();
  await page.getByRole("button", { name: "Copy link", exact: true }).click();
  const link = await page.evaluate(() => (window as unknown as { copiedLink: string }).copiedLink);
  expect(link).not.toContain("2027-");
  expect(link).not.toContain("placeDays");
  await page.goto(link);
  await expect(page.locator("[data-place-day-builder]")).toHaveCount(0);
  await page.goto("/en/my-trip#place-days");
  const day = page.locator('[data-place-day="2027-02-16"]');
  await expect(day.locator("[data-plan-stop]")).toHaveCount(3);
  expect(await day.locator("[data-plan-stop]").evaluateAll(els => els.map(el => el.getAttribute("data-plan-stop")))).toEqual([placeIds[1], placeIds[0], placeIds[2]]);
  await day.locator('[data-plan-stop="halles-du-marche"]').getByRole("button", { name: /^Move earlier:/ }).click();
  await page.reload();
  expect(await day.locator("[data-plan-stop]").evaluateAll(els => els.map(el => el.getAttribute("data-plan-stop")))).toEqual(placeIds);
  await day.locator('[data-plan-stop="halles-du-marche"]').getByRole("button", { name: /^Remove stop:/ }).click();
  await expect(day.locator("[data-plan-stop]")).toHaveCount(2);
  expect(await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).items, favKey)).toEqual(favourites);
  await day.locator('input[type="date"]').fill("2027-02-18");
  await day.getByRole("button", { name: /^Change day:/ }).click();
  await expect(page.locator('[data-place-day="2027-02-18"] [data-plan-stop]')).toHaveCount(2);
  await page.getByRole("button", { name: "Clear trip", exact: true }).click();
  await expect(page.locator("[data-place-day]")).toHaveCount(0);
  expect(await page.evaluate(k => localStorage.getItem(k), tripKey)).toBeNull();
  expect(await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).items, favKey)).toEqual(favourites);
});

test("syncs custom days across tabs, preserves form edits and merges moved days", async ({ page, context }) => {
  await page.evaluate(({ key, trip }) => localStorage.setItem(key, JSON.stringify({ version: 1, trip: { ...trip, dayRoutes: [{ routeId: "cocteau-walking-day", date: "2027-02-16" }], placeDays: [{ date: "2027-02-16", placeIds: ["plage-sablettes"] }] } })), { key: tripKey, trip: profile });
  await page.reload();
  await page.getByLabel("Adults", { exact: true }).fill("3");
  const other = await context.newPage();
  await other.goto("/en/favourites");
  const builder = other.locator("[data-place-day-builder]");
  await builder.getByLabel("Day of your trip").fill("2027-02-18");
  await builder.getByLabel("Halles du Marché", { exact: true }).check();
  await builder.getByLabel("Rue Saint-Michel", { exact: true }).check();
  await builder.getByRole("button", { name: "Add selected stops", exact: true }).click();
  await expect(page.locator('[data-place-day="2027-02-18"]')).toBeVisible();
  await expect(page.getByLabel("Adults", { exact: true })).toHaveValue("3");
  await page.getByLabel("Departure", { exact: true }).fill("2027-02-17");
  await page.getByRole("button", { name: "Save trip", exact: true }).click();
  const moved = page.locator('[data-place-day="2027-02-18"]');
  await expect(moved).toContainText("Outside your current trip dates");
  await moved.locator('input[type="date"]').fill("2027-02-16");
  await moved.getByRole("button", { name: /^Change day:/ }).click();
  const destination = page.locator('[data-place-day="2027-02-16"]');
  await expect(page.locator("[data-place-day]")).toHaveCount(1);
  expect(await destination.locator("[data-plan-stop]").evaluateAll(els => els.map(el => el.getAttribute("data-plan-stop")))).toEqual([placeIds[2], placeIds[0], placeIds[1]]);
  await expect(destination).toContainText("A ready-made route is also saved for this date");
  const saved = await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).trip, tripKey);
  expect(saved.adults).toBe(3);
  expect(saved.dayRoutes).toHaveLength(1);
  await other.close();
});

test("storage failures and changed favourites do not overwrite plans", async ({ page }) => {
  await page.goto("/en/favourites");
  const builder = page.locator("[data-place-day-builder]");
  await builder.getByLabel("Halles du Marché", { exact: true }).check();
  await page.evaluate(k => localStorage.setItem(k, JSON.stringify({ version: 1, items: [] })), favKey);
  await builder.getByRole("button", { name: "Add selected stops", exact: true }).click();
  await expect(page.locator("#place-days")).toContainText("Your favourites changed");
  expect(await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).trip.placeDays, tripKey)).toBeUndefined();
  await page.evaluate(({ key, items }) => localStorage.setItem(key, JSON.stringify({ version: 1, items })), { key: favKey, items: favourites });
  await page.reload();
  await builder.getByLabel("Halles du Marché", { exact: true }).check();
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error("blocked"); }; });
  await builder.getByRole("button", { name: "Add selected stops", exact: true }).click();
  await expect(page.locator("#place-days")).toContainText("Could not save");
  expect(await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).trip.placeDays, tripKey)).toBeUndefined();
});

test("localizes day plans, handles unknown places and fits phones", async ({ page }) => {
  await page.evaluate(({ key, trip }) => localStorage.setItem(key, JSON.stringify({ version: 1, trip: { ...trip, placeDays: [{ date: "2027-02-17", placeIds: ["halles-du-marche", "missing-place", "rue-saint-michel-menton"] }] } })), { key: tripKey, trip: profile });
  await page.setViewportSize({ width: 320, height: 900 });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/my-trip#place-days`);
    const day = page.locator('[data-place-day="2027-02-17"]');
    await expect(day.locator("[data-plan-stop]")).toHaveCount(3);
    await expect(day.locator('[data-plan-stop="missing-place"] a')).toHaveCount(0);
    await expect(day.locator('[data-plan-stop="halles-du-marche"] a')).toHaveAttribute("href", new RegExp(`^/${locale}/guide/`));
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
  await page.evaluate(({ key, trip, ids }) => localStorage.setItem(key, JSON.stringify({ version: 1, trip: { ...trip, placeDays: [{ date: "2027-02-17", placeIds: ids }] } })), { key: tripKey, trip: profile, ids: placeIds });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/my-trip#place-days");
  await expect(page.locator("[data-plan-stop]")).toHaveCount(3);
  await page.screenshot({ path: "/private/tmp/menton-place-day-preview.png" });
});
