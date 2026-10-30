import { describe, expect, it } from "vitest";
import { emptyTrip, parseTrip, saveTrip, tripBookingValues } from "@/lib/my-trip";
import { addPlacesToDay, MAX_PLACE_DAYS, MAX_PLAN_STOPS, MAX_STOPS_PER_DAY, movePlaceDay, parsePlaceDays, placeDayWarnings, removePlaceDay, removePlaceStop, reorderPlaceStop } from "@/lib/trip-place-days";

const trip = { ...emptyTrip, checkIn: "2027-02-15", checkOut: "2027-03-30", dayRoutes: [{ routeId: "cocteau-walking-day", date: "2027-02-16" }] };
const today = "2026-10-30";
const date = "2027-02-16";

describe("personal days made from favourite places", () => {
  it("appends in selection order, deduplicates and preserves the rest of the trip", () => {
    const first = addPlacesToDay(trip, date, ["plage-sablettes", "halles-du-marche"], today)!;
    const next = addPlacesToDay(first, date, ["halles-du-marche", "rue-saint-michel-menton"], today)!;
    expect(next).toEqual({ ...trip, placeDays: [{ date, placeIds: ["plage-sablettes", "halles-du-marche", "rue-saint-michel-menton"] }] });
    expect(trip).not.toHaveProperty("placeDays");
    expect(addPlacesToDay(next, date, ["plage-sablettes"], today)).toEqual(next);
  });
  it("rejects invalid, past, departure-day and out-of-trip assignments", () => {
    for (const bad of ["2027-02-30", "2027-03-30", "2027-02-14", "bad"]) expect(addPlacesToDay(trip, bad, ["plage-sablettes"], today)).toBeNull();
    expect(addPlacesToDay(trip, date, ["../bad"], today)).toBeNull();
    expect(addPlacesToDay(trip, date, [], today)).toBeNull();
    expect(addPlacesToDay(trip, date, ["plage-sablettes"], "2027-02-17")).toBeNull();
  });
  it("reorders without mutating input and removes empty days", () => {
    const first = addPlacesToDay(trip, date, ["a", "b", "c"], today)!;
    const next = reorderPlaceStop(first, date, "b", -1)!;
    expect(next.placeDays![0].placeIds).toEqual(["b", "a", "c"]);
    expect(first.placeDays![0].placeIds).toEqual(["a", "b", "c"]);
    expect(reorderPlaceStop(first, date, "a", -1)).toBe(first);
    expect(reorderPlaceStop(first, date, "missing", 1)).toBeNull();
    expect(removePlaceStop(first, date, "b").placeDays![0].placeIds).toEqual(["a", "c"]);
    expect(removePlaceStop(addPlacesToDay(trip, date, ["a"], today)!, date, "a").placeDays).toEqual([]);
    expect(removePlaceDay(first, date).placeDays).toEqual([]);
  });
  it("merges a moved day into its destination without losing existing order", () => {
    const first = addPlacesToDay(addPlacesToDay(trip, date, ["b", "a"], today)!, "2027-02-17", ["c", "b"], today)!;
    expect(movePlaceDay(first, date, "2027-02-17", today)?.placeDays).toEqual([{ date: "2027-02-17", placeIds: ["c", "b", "a"] }]);
    expect(movePlaceDay(first, date, trip.checkOut, today)).toBeNull();
    expect(first.placeDays).toHaveLength(2);
  });
  it("normalizes corrupt/duplicate input and keeps old profiles compatible", () => {
    expect(parsePlaceDays([{ date, placeIds: ["b", "a", "b", "../bad", null] }, { date, placeIds: ["c"], email: "private@example.com" }, { date: "2027-02-30", placeIds: ["a"] }])).toEqual([{ date, placeIds: ["b", "a", "c"] }]);
    const raw = JSON.stringify({ version: 1, trip: { ...trip, placeDays: [{ date, placeIds: ["a"], email: "private@example.com", url: "https://unsafe.invalid" }] } });
    expect(JSON.stringify(parseTrip(raw))).not.toContain("private@example.com");
    expect(parseTrip(JSON.stringify({ version: 1, trip }))).toEqual(trip);
    expect(parseTrip(JSON.stringify({ version: 1, trip: { ...trip, placeDays: "bad" } }))).toEqual(trip);
    const changed = parseTrip(JSON.stringify({ version: 1, trip: { ...trip, checkOut: date, placeDays: [{ date, placeIds: ["a"] }] } }));
    expect(changed?.placeDays).toHaveLength(1);
  });
  it("enforces limits and never exposes personal plans through booking prefill", () => {
    const entries = Array.from({ length: MAX_STOPS_PER_DAY }, (_, i) => `place-${i}`);
    const fullDay = addPlacesToDay(trip, date, entries, today)!;
    expect(addPlacesToDay(fullDay, date, ["extra"], today)).toBeNull();
    const full = { ...trip, placeDays: Array.from({ length: MAX_PLACE_DAYS }, (_, i) => ({ date: `2027-03-${String(i + 1).padStart(2, "0")}`, placeIds: ["a"] })) };
    expect(addPlacesToDay(full, date, ["extra"], today)).toBeNull();
    const totalFull = { ...trip, placeDays: Array.from({ length: MAX_PLAN_STOPS / MAX_STOPS_PER_DAY }, (_, i) => ({ date: `2027-03-${String(i + 1).padStart(2, "0")}`, placeIds: entries })) };
    expect(addPlacesToDay(totalFull, date, ["extra"], today)).toBeNull();
    let stored = "";
    expect(saveTrip({ setItem: (_key, value) => { stored = value; } }, fullDay)).toBe(true);
    expect(parseTrip(stored)).toEqual(fullDay);
    expect(tripBookingValues(fullDay, today)).not.toHaveProperty("placeDays");
  });
  it("uses non-blocking structural warnings, never invented travel durations", () => {
    expect(placeDayWarnings(trip, { date, placeIds: ["a"] })).toEqual({ manyStops: false, readyRoute: true });
    expect(placeDayWarnings(trip, { date: "2027-02-17", placeIds: ["a", "b", "c", "d", "e", "f"] })).toEqual({ manyStops: true, readyRoute: false });
  });
});
