import { expect, test } from "@playwright/test";

test("homepage links to the direct booking form", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: /check availability/i }).first().click();

  await expect(page).toHaveURL(/\/en\/check-availability$/);
  await expect(page.getByRole("form", { name: /direct booking request form/i })).toBeVisible();
});

test("page responses keep scripts nonce-protected while allowing framework style attributes", async ({ page }) => {
  const response = await page.goto("/en/check-availability");
  const csp = response?.headers()["content-security-policy"];
  const scriptDirective = csp?.split(";").find((directive) => directive.trim().startsWith("script-src"));

  expect(csp).toBeTruthy();
  expect(scriptDirective).toContain("'nonce-");
  expect(scriptDirective).not.toContain("'unsafe-inline'");
  expect(csp).toContain("style-src-attr 'unsafe-inline'");
});

test("guide pages render without CSP violations", async ({ page }) => {
  const violations: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && message.text().includes("Content Security Policy")) {
      violations.push(message.text());
    }
  });

  await page.goto("/en/guide/radio-stations-menton-riviera");
  await expect(page.getByRole("heading", { name: /local radio guide/i })).toBeVisible();
  expect(violations).toEqual([]);
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
