import { afterEach, describe, expect, it, vi } from "vitest";
import { parseOccupiedIntervalsFromIcal, fetchIcalText } from "../../src/lib/availability/ical";
import { getPublicApartmentAvailability, validateRequestedApartmentDates } from "../../src/lib/availability/service";
import { findAvailableWindows } from "../../src/lib/availability/windows";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.restoreAllMocks();
});

describe("iCal parsing", () => {
  it("parses one occupied all-day interval with exclusive checkout", () => {
    const text = `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260810
DTEND;VALUE=DATE:20260814
END:VEVENT
END:VCALENDAR`;

    expect(parseOccupiedIntervalsFromIcal(text)).toEqual([{ start: "2026-08-10", end: "2026-08-14" }]);
  });

  it("parses several intervals and merges overlapping and adjacent events", () => {
    const text = `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260810
DTEND;VALUE=DATE:20260814
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260813
DTEND;VALUE=DATE:20260816
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260816
DTEND;VALUE=DATE:20260818
END:VEVENT
END:VCALENDAR`;

    expect(parseOccupiedIntervalsFromIcal(text)).toEqual([{ start: "2026-08-10", end: "2026-08-18" }]);
  });

  it("ignores cancelled events", () => {
    const text = `BEGIN:VCALENDAR
BEGIN:VEVENT
STATUS:CANCELLED
DTSTART;VALUE=DATE:20260810
DTEND;VALUE=DATE:20260814
END:VEVENT
END:VCALENDAR`;

    expect(parseOccupiedIntervalsFromIcal(text)).toEqual([]);
  });

  it("supports empty but valid calendars", () => {
    expect(parseOccupiedIntervalsFromIcal("BEGIN:VCALENDAR\nEND:VCALENDAR")).toEqual([]);
  });
});

describe("available windows", () => {
  it("returns a free period before the first booking", () => {
    expect(
      findAvailableWindows({
        occupiedIntervals: [{ start: "2026-08-10", end: "2026-08-14" }],
        rangeStart: "2026-08-01",
        rangeEnd: "2026-08-31",
        minimumNights: 3,
        maximumWindows: 4,
      }),
    ).toEqual([
      { start: "2026-08-01", end: "2026-08-10" },
      { start: "2026-08-14", end: "2026-08-31" },
    ]);
  });

  it("returns a free period after the last booking", () => {
    expect(
      findAvailableWindows({
        occupiedIntervals: [{ start: "2026-08-10", end: "2026-08-14" }],
        rangeStart: "2026-08-10",
        rangeEnd: "2026-08-31",
        minimumNights: 3,
        maximumWindows: 4,
      }),
    ).toEqual([{ start: "2026-08-14", end: "2026-08-31" }]);
  });

  it("drops windows shorter than minimum nights", () => {
    expect(
      findAvailableWindows({
        occupiedIntervals: [
          { start: "2026-08-01", end: "2026-08-04" },
          { start: "2026-08-06", end: "2026-08-31" },
        ],
        rangeStart: "2026-08-01",
        rangeEnd: "2026-08-31",
        minimumNights: 3,
        maximumWindows: 4,
      }),
    ).toEqual([]);
  });
});

describe("iCal fetch safety", () => {
  it("rejects malformed calendar responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("not a calendar", {
        status: 200,
        headers: { "content-type": "text/plain" },
      }),
    );

    await expect(fetchIcalText("https://example.com/calendar.ics", fetchMock)).resolves.toEqual({
      ok: false,
      reason: "format",
    });
  });

  it("treats upstream timeouts as safe failures", async () => {
    const fetchMock = vi.fn().mockRejectedValue(Object.assign(new Error("aborted"), { name: "AbortError" }));

    await expect(fetchIcalText("https://example.com/calendar.ics", fetchMock)).resolves.toEqual({
      ok: false,
      reason: "timeout",
    });
  });
});

describe("availability service", () => {
  it("returns null for an unknown apartment slug", async () => {
    await expect(getPublicApartmentAvailability("unknown-slug")).resolves.toBeNull();
  });

  it("returns a neutral state when the env variable is missing", async () => {
    delete process.env.AZUR_ICAL_SEA_VIEW_BALCONY_STUDIO;

    await expect(getPublicApartmentAvailability("sea-view-balcony-studio")).resolves.toMatchObject({
      apartmentSlug: "sea-view-balcony-studio",
      status: "temporarily-unavailable",
      freeWindows: [],
    });
  });

  it("keeps API-safe availability output free of upstream URLs", async () => {
    delete process.env.AZUR_ICAL_SEA_VIEW_BALCONY_STUDIO;

    const result = await getPublicApartmentAvailability("sea-view-balcony-studio");
    expect(JSON.stringify(result)).not.toContain("airbnb.com/calendar/ical");
    expect(JSON.stringify(result)).not.toContain("ical.booking.com");
    expect(JSON.stringify(result)).not.toContain("?t=");
  });

  it("falls back safely when the calendar is temporarily unavailable during validation", async () => {
    delete process.env.AZUR_ICAL_SEA_VIEW_BALCONY_STUDIO;

    await expect(
      validateRequestedApartmentDates("sea-view-balcony-studio", {
        start: "2026-08-10",
        end: "2026-08-14",
      }),
    ).resolves.toMatchObject({
      ok: true,
      reason: "calendar-unavailable",
    });
  });
});
