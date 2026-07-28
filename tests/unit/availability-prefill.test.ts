import { describe, expect, it } from "vitest";
import {
  buildAvailabilityPrefillHref,
  buildFlexibleAvailabilityHref,
  buildOpenEndedAvailabilityPrefillHref,
  clearAvailabilityPrefillParams,
  getAvailabilityPrefillFromSearchParams,
} from "../../src/lib/availability/prefill";

describe("availability prefill helpers", () => {
  it("parses a fixed selected stay", () => {
    const params = new URLSearchParams("apartment=sea-view-balcony-studio&checkIn=2026-09-18&checkOut=2026-09-23");

    expect(getAvailabilityPrefillFromSearchParams(params)).toEqual({
      apartment: "sea-view-balcony-studio",
      checkIn: "2026-09-18",
      checkOut: "2026-09-23",
      flexible: false,
      openEnded: false,
      hasSelection: true,
    });
  });

  it("parses an open-ended availability selection", () => {
    const params = new URLSearchParams("apartment=panoramic-sea-view-studio&checkIn=2026-11-14&openEnded=1");

    expect(getAvailabilityPrefillFromSearchParams(params)).toEqual({
      apartment: "panoramic-sea-view-studio",
      checkIn: "2026-11-14",
      flexible: false,
      openEnded: true,
      hasSelection: true,
    });
  });

  it("parses flexible mode without a selected stay", () => {
    const params = new URLSearchParams("flexible=1&sourcePageType=guide");

    expect(getAvailabilityPrefillFromSearchParams(params)).toEqual({
      flexible: true,
      openEnded: false,
      hasSelection: false,
    });
  });

  it("clears only availability-specific query params", () => {
    const params = new URLSearchParams("sourcePageType=guide&sourceSlug=foo&apartment=sea-view-balcony-studio&checkIn=2026-09-18&checkOut=2026-09-23&flexible=1");
    const cleared = clearAvailabilityPrefillParams(params);

    expect(cleared.toString()).toBe("sourcePageType=guide&sourceSlug=foo");
  });

  it("builds stable href variants", () => {
    expect(buildAvailabilityPrefillHref("en", "sea-view-balcony-studio", { start: "2026-09-18", end: "2026-09-23" })).toBe(
      "/en/check-availability?apartment=sea-view-balcony-studio&checkIn=2026-09-18&checkOut=2026-09-23#direct-request-form",
    );
    expect(buildOpenEndedAvailabilityPrefillHref("en", "sea-view-balcony-studio", "2026-11-14")).toBe(
      "/en/check-availability?apartment=sea-view-balcony-studio&checkIn=2026-11-14&openEnded=1#direct-request-form",
    );
    expect(buildFlexibleAvailabilityHref("en")).toBe("/en/check-availability?flexible=1#direct-request-form");
  });
});
