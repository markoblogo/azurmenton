import { createRequire } from "node:module";
import { mkdtempSync, readFileSync, writeFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { referencedPlaceIds } from "@/lib/content-place-usage";
import { applyGuideLinkPlan } from "@/lib/guide-link-plan";
import { buildGuideCheckReport } from "@/lib/guide-check";
import { extractGuideIntake } from "@/lib/guide-intake";
const require = createRequire(import.meta.url);
const { checkDocumentation } = require("../../scripts/lib/docs-check.cjs");
const { projectChecks } = require("../../scripts/lib/project-checks.cjs");
const { runCheckSuite, fingerprintInputs } = require("../../scripts/lib/guide-workflow.cjs");
const { main: releaseCheck } = require("../../scripts/release-check.cjs");

describe("release hygiene", () => {
  it("excludes local agent bundles from website checks and source control", () => {
    const config = JSON.parse(readFileSync(new URL("../../tsconfig.json", import.meta.url), "utf8"));
    expect(config.exclude).toContain(".local-tools");
    expect(readFileSync(new URL("../../eslint.config.mjs", import.meta.url), "utf8")).toContain('".local-tools/**"');
    expect(readFileSync(new URL("../../.gitignore", import.meta.url), "utf8")).toContain("/.local-tools/token-economizer/");
  });
  it("keeps the FullCalendar plugins aligned with core in the manifest and lockfile", () => {
    const manifest = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));
    const lock = JSON.parse(readFileSync(new URL("../../package-lock.json", import.meta.url), "utf8"));
    const core = lock.packages["node_modules/@fullcalendar/core"].version;
    for (const name of ["core", "daygrid", "react"]) {
      const id = `@fullcalendar/${name}`;
      expect(manifest.dependencies[id]).toBe(manifest.dependencies["@fullcalendar/core"]);
      expect(lock.packages[""].dependencies[id]).toBe(manifest.dependencies[id]);
      expect(lock.packages[`node_modules/${id}`].version).toBe(core);
    }
  });
  it("hashes inputs deterministically, detects byte changes and refuses symlinks", async () => {
    const root = mkdtempSync(join(tmpdir(), "menton-fingerprint-"));
    try {
      const files = Array.from({ length: 12 }, (_, i) => join(root, `${i}.txt`));
      files.forEach(file => writeFileSync(file, file));
      const first = await fingerprintInputs(root, files);
      expect(await fingerprintInputs(root, [...files].reverse())).toEqual(first);
      writeFileSync(files[0], "changed bytes");
      expect(await fingerprintInputs(root, files)).not.toEqual(first);
      expect(await fingerprintInputs(root, [join(root, "absent")])).toEqual([["absent", "missing"]]);
      const link = join(root, "link");
      symlinkSync(files[0], link);
      await expect(fingerprintInputs(root, [link])).rejects.toThrow("symlink");
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
  it("validates pinned editorial IDs even before suggestions have been applied", () => {
    const report = buildGuideCheckReport(extractGuideIntake("# Workshop guide\n\nUseful visitor information."), [], [], { apartmentSlugs: [], publicationPlan: { approvedRelatedArticleSlugs: ["missing-guide"], approvedRelatedApartmentSlugs: ["missing-stay"] } });
    expect(report.errors.some(error => error.code === "unresolved-related-article")).toBe(true);
    expect(report.errors.some(error => error.code === "unresolved-related-apartment")).toBe(true);
  });
  it("rejects unsupported release flags before doing any work", async () => {
    await expect(releaseCheck(["--publish"])).rejects.toThrow("Usage:");
    await expect(releaseCheck(["--webpack", "--webpack"])).rejects.toThrow("Usage:");
  });
  it("never reuses a security gate marked alwaysRun", async () => {
    const root = mkdtempSync(join(tmpdir(), "menton-security-check-"));
    let calls = 0;
    const options = { receiptPath: join(root, "checks.json"), checks: [{ id: "audit", argv: ["audit"], alwaysRun: true }], fingerprint: async () => "same", execute: async () => { calls++; return { code: 0, output: "checked" }; } };
    try {
      expect((await runCheckSuite(options)).ok).toBe(true);
      expect((await runCheckSuite(options)).ok).toBe(true);
      expect(calls).toBe(2);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
  it("keeps guide and release checks shared while release adds audit and production browsers", () => {
    const guide = projectChecks("/project", { webpack: true });
    const release = projectChecks("/project", { webpack: true, release: true });
    expect(guide.map((check: { id: string }) => check.id)).toEqual(["docs", "lint", "typecheck", "unit", "preflight", "images", "build", "postbuild"]);
    expect(release.map((check: { id: string }) => check.id)).toEqual(["native-lockfile", "dependency-audit", ...guide.slice(0, -1).map((check: { id: string }) => check.id), "browser", "postbuild"]);
    expect(release.find((check: { id: string }) => check.id === "build").argv).toContain("--webpack");
    const audit = release.find((check: { id: string }) => check.id === "dependency-audit");
    expect(audit.alwaysRun).toBe(true);
    expect(audit.argv).toContain("--audit-level=moderate");
    expect(audit.argv).not.toContain("--omit=dev");
    expect(release.some((check: { argv: string[] }) => check.argv.includes("push"))).toBe(false);
  });
  it("counts event-only venues as linked without hiding truly unused places", () => {
    const used = referencedPlaceIds([{ relatedPlaces: ["a"], sections: [{ relatedPlaceIds: ["b"] }] }], [{ relatedPlaceIds: ["c"], venue: { placeId: "d" } }]);
    expect([...used]).toEqual(["a", "b", "c", "d"]);
    expect(used.has("unused")).toBe(false);
  });

  it("retains approved editorial links independently of the automatic suggestions", () => {
    const plan = applyGuideLinkPlan({ approvedRelatedArticleSlugs: ["winter"], approvedRelatedApartmentSlugs: ["studio"], relatedArticleSlugs: ["stale"], linkPlan: { matchedClusterIds: [], matchedCollectionIds: [], relatedArticles: [], relatedApartments: [], backlinkObligations: [], specialistCoverageUpdates: [], autoAppliedRelatedArticles: ["stale"], autoAppliedRelatedApartments: [] } }, { matchedClusterIds: [], matchedCollectionIds: [], relatedArticles: [], relatedApartments: [], backlinkObligations: [], specialistCoverageUpdates: [], autoAppliedRelatedArticles: ["new"], autoAppliedRelatedApartments: [] });
    expect(plan.relatedArticleSlugs).toEqual(["winter", "new"]);
    expect(plan.relatedApartmentSlugs).toEqual(["studio"]);
    expect(plan.approvedRelatedArticleSlugs).toEqual(["winter"]);
  });

  it("checks local documentation links and commands without treating examples as files", () => {
    const root = mkdtempSync(join(tmpdir(), "menton-docs-"));
    try {
      writeFileSync(join(root, "target.md"), "# Target");
      writeFileSync(join(root, "README.md"), '[Valid](target.md#section) [Missing](gone.md) [Web](https://example.com)\n```md\n[Example](example.md)\n```\n`npm run test` and `npm run absent`');
      expect(checkDocumentation(root, ["README.md"], { test: "vitest" })).toEqual(["README.md: missing link target gone.md", "README.md: unknown npm script absent"]);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
});
