import { describe, expect, it } from "vitest";
import {
  bookingDashboardBreakdowns,
  bookingDashboardGoals,
  bookingDashboardPeriodFromArgs,
  bookingGoalQuery,
  bookingSuccessBreakdownQuery,
} from "../../src/lib/booking-dashboard";

describe("booking dashboard contract", () => {
  it("uses the canonical booking funnel goals", () => {
    expect(bookingDashboardGoals).toContain("booking_request_submit_success");
    expect(bookingDashboardGoals).toContain("booking_form_start");
    expect(bookingDashboardGoals).not.toContain("airport_board_loaded");
  });

  it("only queries approved non-PII breakdowns", () => {
    expect(bookingDashboardBreakdowns.map((breakdown) => breakdown.dimension)).toEqual([
      "event:props:locale",
      "event:props:sourcePageType",
      "event:props:sourceSlug",
      "event:props:apartmentPreference",
    ]);
  });

  it("builds compatible Stats API queries", () => {
    expect(bookingDashboardPeriodFromArgs([])).toBe("28d");
    expect(bookingDashboardPeriodFromArgs(["--period=91d"])).toBe("91d");
    expect(() => bookingDashboardPeriodFromArgs(["--period=all"])).toThrow("--period must be one of");

    expect(bookingGoalQuery("azurmenton.com", "28d")).toMatchObject({
      site_id: "azurmenton.com",
      date_range: "28d",
      dimensions: ["event:goal"],
    });
    expect(bookingSuccessBreakdownQuery("azurmenton.com", "28d", "event:props:sourceSlug")).toMatchObject({
      metrics: ["events", "visitors", "group_conversion_rate"],
      dimensions: ["event:props:sourceSlug"],
    });
  });
});
