import { createRequire } from "node:module";
import { expect, it } from "vitest";
const { summarize } = createRequire(import.meta.url)("../../scripts/guide-timing-report.cjs");

it("normalizes historical timing keys without turning unknown labour into measured time", () => {
  for (const key of ["totalWallMs", "totalObservedElapsedMs", "totalElapsedMs"]) {
    const row = summarize("guide", { [key]: 4000, activeLabourMs: "UNKNOWN", ownerWaitMs: null }, { durationMs: 1000 });
    expect(row).toMatchObject({ totalWallMs: 4000, qaMs: 1000, nonQaWallMs: 3000, activeLabourMs: null, ownerWaitMs: null });
    expect(row.qaRemovalUpperBound).toBeCloseTo(4 / 3);
  }
});
it("does not invent residuals or speedup estimates for missing or inconsistent durations", () => {
  expect(summarize("guide", {}, {}).qaRemovalUpperBound).toBeNull();
  expect(summarize("guide", { totalWallMs: 100 }, { durationMs: 200 }).nonQaWallMs).toBeNull();
  expect(summarize("guide", { totalWallMs: -1 }, {}).totalWallMs).toBeNull();
});
it("labels reused gate durations as historical instead of summing them into new wall time", () => {
  const row = summarize("guide", { totalWallMs: 200 }, { durationMs: 100, checks: [{ id: "build", reused: true, durationMs: 10000, status: "passed" }] });
  expect(row.qaMs).toBe(100);
  expect(row.checks[0]).toMatchObject({ reused: true, recordedDurationMs: 10000 });
});
