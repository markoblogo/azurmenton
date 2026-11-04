import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("CI headless browser installation", () => {
  it("installs the browser used by both smoke checks without removing system dependencies or release gates", () => {
    const ci = readFileSync(".github/workflows/ci.yml", "utf8");
    expect(ci).toContain("npx playwright install --with-deps --only-shell chromium");
    expect(ci).toContain("npm run release:check");
    const config = readFileSync("playwright.config.ts", "utf8");
    expect(config).not.toMatch(/channel\s*:|headless\s*:\s*false/);
    const smoke = readFileSync("scripts/guide-browser-check.cjs", "utf8");
    expect(smoke).toContain("chromium.launch()");
  });
});
