import { expect, test } from "@playwright/test";

const key = "azurmenton.trip.v1";
const profile = { checkIn: "2027-02-15", checkOut: "2027-02-20", adults: 2, children: 1, car: false, interests: ["walks-views"] };
test.setTimeout(180_000);
test.beforeEach(async ({ page, context }) => {
  await page.clock.setFixedTime(new Date("2026-10-30T12:00:00Z"));
  await context.route("**/*", route => ["localhost", "127.0.0.1"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

test("a route needs trip dates, saves idempotently, persists and can move or be removed", async ({ page }) => {
  await page.goto("/en/guide/jean-cocteau-menton-walking-route");
  const controls = page.locator('[data-save-day-route="cocteau-walking-day"]');
  await controls.getByRole("button", { name: "Add to my trip" }).click();
  await expect(controls).toContainText("Save your trip dates first");
  expect(await page.evaluate(k => localStorage.getItem(k), key)).toBeNull();
  await page.evaluate(({ k, trip }) => localStorage.setItem(k, JSON.stringify({ version: 1, trip })), { k: key, trip: profile });
  await page.reload();
  await controls.getByRole("button", { name: "Add to my trip" }).click();
  const day = controls.getByLabel("Day of your trip");
  await expect(day).toHaveAttribute("min", "2027-02-15");
  await expect(day).toHaveAttribute("max", "2027-02-19");
  await day.fill("2027-02-16");
  await controls.getByRole("button", { name: "Save route", exact: true }).click();
  await expect(controls.getByRole("status")).toHaveText("Route saved on this device.");
  await controls.getByRole("button", { name: "Save route", exact: true }).click();
  expect(await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).trip, key)).toEqual({ ...profile, dayRoutes: [{ routeId: "cocteau-walking-day", date: "2027-02-16" }] });
  await controls.getByRole("link", { name: "Open my trip" }).click();
  let row = page.locator('[data-saved-day-route="cocteau-walking-day"]');
  await expect(row.locator("time")).toHaveAttribute("datetime", "2027-02-16");
  await page.reload();
  await expect(row).toHaveCount(1);
  await row.locator('input[type="date"]').fill("2027-02-18");
  await row.getByRole("button", { name: /^Change day:/ }).click();
  row = page.locator('[data-saved-day-route="cocteau-walking-day"]');
  await expect(row).toHaveAttribute("data-route-date", "2027-02-18");
  await row.getByRole("button", { name: /^Remove route:/ }).click();
  await expect(row).toHaveCount(0);
  expect(await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).trip, key)).toEqual(profile);
});

test("route-only changes sync across tabs without discarding form edits, and date changes retain warnings", async ({ page, context }) => {
  await page.goto("/en/my-trip");
  await page.evaluate(({ k, trip }) => localStorage.setItem(k, JSON.stringify({ version: 1, trip })), { k: key, trip: profile });
  await page.reload();
  await page.getByLabel("Adults", { exact: true }).fill("3");
  const other = await context.newPage();
  await other.goto("/en/guide/jean-cocteau-menton-walking-route");
  const controls = other.locator('[data-save-day-route="cocteau-walking-day"]');
  await controls.getByRole("button", { name: "Add to my trip" }).click();
  await controls.getByLabel("Day of your trip").fill("2027-02-18");
  await controls.getByRole("button", { name: "Save route", exact: true }).click();
  const row = page.locator('[data-saved-day-route="cocteau-walking-day"]');
  await expect(row).toHaveCount(1);
  await expect(page.getByLabel("Adults", { exact: true })).toHaveValue("3");
  await page.getByLabel("Departure", { exact: true }).fill("2027-02-17");
  await page.getByRole("button", { name: "Save trip", exact: true }).click();
  await expect(row).toContainText("Outside your current trip dates");
  await page.reload();
  await expect(row).toHaveAttribute("data-route-date", "2027-02-18");
  await expect(page.getByLabel("Adults", { exact: true })).toHaveValue("3");
  await page.getByRole("button", { name: "Clear trip", exact: true }).click();
  await expect(row).toHaveCount(0);
  expect(await page.evaluate(k => localStorage.getItem(k), key)).toBeNull();
  await expect(controls).toContainText("Save your trip dates first");
  await other.close();
});

test("unavailable storage never reports a successful route save", async ({ page }) => {
  await page.goto("/en/my-trip");
  await page.evaluate(({ k, trip }) => localStorage.setItem(k, JSON.stringify({ version: 1, trip })), { k: key, trip: profile });
  await page.goto("/en/guide/jean-cocteau-menton-walking-route");
  const controls = page.locator('[data-save-day-route="cocteau-walking-day"]');
  await controls.getByRole("button", { name: "Add to my trip" }).click();
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error("Blocked storage"); }; });
  await controls.getByRole("button", { name: "Save route", exact: true }).click();
  await expect(controls.getByRole("status")).toContainText("Could not save");
  expect(await page.evaluate(k => JSON.parse(localStorage.getItem(k)!).trip.dayRoutes, key)).toBeUndefined();
});

test("saved routes use localized catalogues and fit mobile screens", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/en/my-trip");
  await page.evaluate(({ k, trip }) => localStorage.setItem(k, JSON.stringify({ version: 1, trip: { ...trip, dayRoutes: [{ routeId: "cocteau-walking-day", date: "2027-02-16" }, { routeId: "removed-route", date: "2027-02-17" }] } })), { k: key, trip: profile });
  for (const locale of ["en", "fr", "it", "uk"]) {
    await page.goto(`/${locale}/my-trip`);
    const row = page.locator('[data-saved-day-route="cocteau-walking-day"]');
    await expect(row.locator("h3 a")).toHaveAttribute("href", `/${locale}/guide/jean-cocteau-menton-walking-route#day-route-cocteau-walking-day`);
    await expect(page.locator('[data-saved-day-route="removed-route"] a')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  }
  await page.evaluate(k => {
    const value = JSON.parse(localStorage.getItem(k)!);
    value.trip.dayRoutes = [{ routeId: "cocteau-walking-day", date: "2027-02-16" }, { routeId: "one-day-without-car", date: "2027-02-17" }];
    localStorage.setItem(k, JSON.stringify(value));
  }, key);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/my-trip#saved-day-routes");
  await page.screenshot({ path: "/private/tmp/menton-saved-day-routes.png" });
});
