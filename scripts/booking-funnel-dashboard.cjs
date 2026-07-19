#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const {
  bookingDashboardBreakdowns,
  bookingDashboardPeriodFromArgs,
  bookingGoalQuery,
  bookingSuccessBreakdownQuery,
} = require("../src/lib/booking-dashboard.ts");

const apiKey = process.env.PLAUSIBLE_STATS_API_KEY?.trim();
const siteId = process.env.PLAUSIBLE_SITE_ID?.trim() || process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
const apiHost = (process.env.PLAUSIBLE_STATS_API_HOST?.trim() || process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST?.trim() || "https://plausible.io").replace(/\/$/, "");

let period;
try {
  period = bookingDashboardPeriodFromArgs(process.argv.slice(2));
} catch (error) {
  console.error(`Azur Menton booking funnel dashboard: ${error.message}`);
  process.exit(1);
}

if (!apiKey || !siteId) {
  console.log("Azur Menton booking funnel dashboard");
  console.log("No live query was made.");
  console.log("Set PLAUSIBLE_STATS_API_KEY and PLAUSIBLE_SITE_ID locally to query aggregate funnel data.");
  console.log("The API key is read-only, must never be exposed to the browser, and must not be set in public Vercel variables.");
  process.exit(0);
}

async function query(body) {
  const response = await fetch(`${apiHost}/api/v2/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = (await response.text().catch(() => "")).slice(0, 400);
    throw new Error(`Plausible Stats API returned ${response.status}${detail ? `: ${detail}` : ""}`);
  }

  return response.json();
}

function metric(value) {
  return typeof value === "number" ? value : 0;
}

function printRows(rows) {
  if (!rows?.length) {
    console.log("  No recorded conversions in this period.");
    return;
  }

  for (const row of rows.slice(0, 10)) {
    const [events, visitors, conversionRate] = row.metrics ?? [];
    console.log(`  - ${row.dimensions?.[0] || "(not set)"}: ${metric(events)} events, ${metric(visitors)} visitors, ${metric(conversionRate).toFixed(1)}% conversion`);
  }
}

async function main() {
  console.log("Azur Menton booking funnel dashboard");
  console.log(`Site: ${siteId}`);
  console.log(`Period: ${period}`);
  console.log("");

  const goals = await query(bookingGoalQuery(siteId, period));
  console.log("Funnel events");
  printRows(goals.results);

  for (const breakdown of bookingDashboardBreakdowns) {
    console.log("");
    console.log(`Successful requests by ${breakdown.label}`);
    try {
      const result = await query(bookingSuccessBreakdownQuery(siteId, period, breakdown.dimension));
      printRows(result.results);
    } catch (error) {
      console.log(`  Breakdown unavailable: ${error.message}`);
    }
  }

  console.log("");
  console.log("Interpretation: these are aggregate event counts, not a guest database or a guaranteed visitor-level sequence.");
  console.log("Use Plausible goal funnels for sequence analysis and keep names, emails, phones and message text out of analytics.");
}

main().catch((error) => {
  console.error(`Azur Menton booking funnel dashboard failed: ${error.message}`);
  process.exit(1);
});
