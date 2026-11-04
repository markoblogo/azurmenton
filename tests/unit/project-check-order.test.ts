/* eslint-disable @typescript-eslint/no-require-imports */
import { describe, expect, it } from "vitest";
const { projectChecks } = require("../../scripts/lib/project-checks.cjs");

describe("fail-fast publication checks", () => {
  it("checks content and image integrity before expensive tests without removing gates", () => {
    const checks = projectChecks("/project");
    const ids = checks.map((check: { id: string }) => check.id);
    expect(ids).toEqual(["docs", "preflight", "images", "lint", "typecheck", "unit", "build", "postbuild"]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(checks.find((check: { id: string }) => check.id === "build").argv).toEqual(["npm", "run", "build"]);
  });
  it("retains every release gate and the explicit fallback", () => {
    const checks = projectChecks("/project", { release: true, webpack: true });
    expect(checks.map((check: { id: string }) => check.id)).toEqual(["native-lockfile", "dependency-audit", "docs", "preflight", "images", "lint", "typecheck", "unit", "build", "browser", "postbuild"]);
    expect(checks.find((check: { id: string }) => check.id === "dependency-audit").alwaysRun).toBe(true);
    expect(checks.find((check: { id: string }) => check.id === "build").argv.slice(-2)).toEqual(["--", "--webpack"]);
  });
});
