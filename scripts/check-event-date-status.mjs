#!/usr/bin/env node

const { getEventDateStatus } = await import("../src/lib/events.ts");

const today = new Date(2026, 4, 16);
const cases = [
  ["endDate yesterday", { startDate: "2026-05-10", endDate: "2026-05-15" }, "past"],
  ["endDate today", { startDate: "2026-05-10", endDate: "2026-05-16" }, "current"],
  ["startDate tomorrow", { startDate: "2026-05-17" }, "upcoming"],
  ["started last week, ends next week", { startDate: "2026-05-09", endDate: "2026-05-23" }, "current"],
  ["expected season only", { expectedSeason: "February-March 2027", dateLabel: "Dates to confirm" }, "dates_pending"],
  ["startDate last month, no endDate", { startDate: "2026-04-16" }, "past"],
];

let failures = 0;

for (const [name, event, expected] of cases) {
  const actual = getEventDateStatus(event, today);

  if (actual !== expected) {
    failures += 1;
    console.error(`${name}: expected ${expected}, got ${actual}`);
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log("event date status checks passed");
}
