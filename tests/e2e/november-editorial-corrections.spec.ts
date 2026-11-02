import { expect, test } from "@playwright/test";

test("corrected waves, fair and shared visitor notes render on mobile", async ({ page, request }) => {
  test.setTimeout(180_000);
  await page.route("**/*", (route) => ["127.0.0.1", "localhost"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [locale, label] of [["en", "Add to calendar"], ["fr", "Ajouter au calendrier"], ["it", "Aggiungi al calendario"], ["uk", "Додати до календаря"]]) {
    await page.goto(`/${locale}/events/nice-cannes-marathon`);
    await page.getByText(label, { exact: true }).click();
    for (const id of ["0757", "0800", "0825", "0850", "0915"]) {
      await expect(page.locator(`a[href$="session=${id}"]`)).toBeVisible();
    }
    await expect(page.locator("body")).not.toContainText("08:03");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `/tmp/menton-corrections-marathon-${locale}.png`, fullPage: true });
    const response = await request.get(`/api/events/nice-cannes-marathon/calendar?locale=${locale}&session=0915`);
    expect(await response.text()).toContain("DTSTART:20261108T081500Z");
    await page.goto(`/${locale}/events/amusement-park-monaco`);
    await page.getByText(label, { exact: true }).click();
    await expect(page.getByRole("link", { name: "Apple / Outlook (.ics)" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto("/en/guide/airports-near-menton-live-flights");
  await expect(page.locator("#place-nice-cote-dazur-airport")).toContainText("Pont du Mercantour");
  await page.goto("/en/guide/zoos-aquariums-animal-parks-near-menton");
  await expect(page.locator("#place-parc-phoenix-nice")).toContainText("09:30-18:00");
  await expect(page.locator("#place-parc-alpha-saint-martin-vesubie")).toContainText("not evidence of closure");
  await page.goto("/en/guide/public-transport-in-menton");
  await expect(page.locator("body")).not.toContainText("free city navette");
  await expect(page.locator('a[href$="/nice-monaco-vintimille-nice-breil-tende"]')).toBeVisible();
});
