import { expect, test } from "@playwright/test";

test("calendar downloads are localized and fit narrow event pages", async ({ page, request }) => {
  await page.route(/plausible\.io|google-analytics|vercel-insights/, (route) => route.abort());
  for (const [locale, label] of [["en", "Add to calendar"], ["fr", "Ajouter au calendrier"], ["it", "Aggiungi al calendario"], ["uk", "Додати до календаря"]]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/events/vivaldi-gloria-menton-2026-10-31`);
    await page.getByText(label, { exact: true }).click();
    await expect(page.getByRole("link", { name: "Apple / Outlook (.ics)" })).toBeVisible();
    await expect(page.getByText("18:30 · Europe/Paris", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const response = await request.get(`/api/events/vivaldi-gloria-menton-2026-10-31/calendar?locale=${locale}`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("DTSTART:20261031T173000Z");
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en/events/vivaldi-gloria-menton-2026-10-31");
  await page.getByText("Add to calendar", { exact: true }).click();
  await expect(page.getByRole("link", { name: "Apple / Outlook (.ics)" })).toBeVisible();
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schema.join(" ")).toContain("2026-10-31T18:30:00.000+01:00");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/events/stand-up-monaco-2026-11-09");
  await page.getByText("Add to calendar", { exact: true }).click();
  await expect(page.getByText("Choose a performance", { exact: true })).toBeVisible();
  for (const [id, time] of [["1900", "180000"], ["2100", "200000"]]) {
    await expect(page.locator(`a[href$="session=${id}"]`)).toBeVisible();
    const response = await request.get(`/api/events/stand-up-monaco-2026-11-09/calendar?session=${id}`);
    expect(await response.text()).toContain(`DTSTART:20261109T${time}Z`);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
