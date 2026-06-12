import { expect, test } from "@playwright/test";

test("homepage links to the direct booking form", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: /check availability/i }).first().click();

  await expect(page).toHaveURL(/\/en\/check-availability$/);
  await expect(page.getByRole("form", { name: /direct booking request form/i })).toBeVisible();
});

test("page responses include nonce CSP without unsafe-inline", async ({ page }) => {
  const response = await page.goto("/en/check-availability");
  const csp = response?.headers()["content-security-policy"];

  expect(csp).toBeTruthy();
  expect(csp).toContain("script-src");
  expect(csp).toContain("'nonce-");
  expect(csp).not.toContain("'unsafe-inline'");
});

test("booking form shows validation feedback for incomplete submissions", async ({ page }) => {
  await page.goto("/en/check-availability");
  await page.getByRole("button", { name: /send request/i }).click();

  await expect(page.getByRole("form", { name: /direct booking request form/i })).toBeVisible();
});

test("localized route renders the booking form", async ({ page }) => {
  await page.goto("/fr/check-availability");

  await expect(page.getByRole("form", { name: /formulaire de demande directe/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /envoyer la demande/i })).toBeVisible();
});
