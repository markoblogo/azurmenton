import { describe, expect, it } from "vitest";
import { emptyTrip, parseTrip, saveTrip, tripBookingValues, TRIP_KEY } from "@/lib/my-trip";
import { assignDayRoute, MAX_DAY_ROUTES, moveDayRoute, parseDayRoutes, removeDayRoute, routeDateInTrip } from "@/lib/trip-day-routes";

const trip = { ...emptyTrip, checkIn: "2027-02-15", checkOut: "2027-02-20" };
const entry = { routeId: "cocteau-walking-day", date: "2027-02-16" };
const today = "2026-10-30";

describe("saved day routes in the private trip profile", () => {
  it("adds idempotently without changing dates, guests or interests", () => {
    const saved = assignDayRoute(trip, entry, today)!;
    expect(saved).toEqual({ ...trip, dayRoutes: [entry] });
    expect(assignDayRoute(saved, entry, today)?.dayRoutes).toEqual([entry]);
    expect(trip).not.toHaveProperty("dayRoutes");
    expect(assignDayRoute(saved, { ...entry, date: "2027-02-17" }, today)?.dayRoutes).toHaveLength(2);
  });

  it("rejects departure day, out-of-window, past and impossible dates", () => {
    expect(routeDateInTrip(trip.checkIn, trip)).toBe(true);
    for (const date of ["2027-02-20", "2027-02-14", "2027-02-30", "invalid"]) expect(assignDayRoute(trip, { ...entry, date }, today)).toBeNull();
    expect(assignDayRoute(trip, entry, "2027-02-17")).toBeNull();
    expect(assignDayRoute(trip, { ...entry, routeId: "../unsafe" }, today)).toBeNull();
  });

  it("moves atomically, merges a duplicate destination and retains old data on invalid move", () => {
    const original = assignDayRoute(trip, entry, today)!;
    expect(moveDayRoute(original, entry, "2027-02-18", today)?.dayRoutes).toEqual([{ ...entry, date: "2027-02-18" }]);
    expect(moveDayRoute(original, entry, trip.checkOut, today)).toBeNull();
    expect(original.dayRoutes).toEqual([entry]);
    const duplicate = assignDayRoute(original, { ...entry, date: "2027-02-18" }, today)!;
    expect(moveDayRoute(duplicate, entry, "2027-02-18", today)?.dayRoutes).toHaveLength(1);
    expect(moveDayRoute(trip, entry, "2027-02-18", today)).toBeNull();
    expect(removeDayRoute(original, entry).dayRoutes).toEqual([]);
  });

  it("keeps old profiles compatible and ignores malformed route entries without losing the profile", () => {
    const raw = (value: unknown) => JSON.stringify({ version: 1, trip: value });
    expect(parseTrip(raw(trip))).toEqual(trip);
    expect(parseTrip(raw({ ...trip, dayRoutes: [{ ...entry, email: "private@example.com", href: "https://unsafe.invalid" }, entry, { routeId: "bad", date: "2027-02-30" }] }))).toEqual({ ...trip, dayRoutes: [entry] });
    expect(parseTrip(raw({ ...trip, dayRoutes: "broken" }))).toEqual(trip);
    const changedDates = { ...trip, checkOut: "2027-02-16", dayRoutes: [entry] };
    expect(parseTrip(raw(changedDates))?.dayRoutes).toEqual([entry]);
    expect(routeDateInTrip(entry.date, changedDates)).toBe(false);
  });

  it("bounds storage and never passes day routes to booking prefill", () => {
    const entries = Array.from({ length: MAX_DAY_ROUTES }, (_, n) => ({ ...entry, routeId: `route-${n}` }));
    const full = { ...trip, dayRoutes: entries };
    expect(assignDayRoute(full, entry, today)).toBeNull();
    expect(parseDayRoutes([...entries, entry])).toHaveLength(MAX_DAY_ROUTES);
    let stored = "";
    expect(saveTrip({ setItem: (key, value) => { expect(key).toBe(TRIP_KEY); stored = value; } }, full)).toBe(true);
    expect(parseTrip(stored)?.dayRoutes).toHaveLength(MAX_DAY_ROUTES);
    expect(saveTrip({ setItem: () => { throw new Error("blocked"); } }, full)).toBe(false);
    expect(tripBookingValues(full, today)).toEqual({ checkIn: trip.checkIn, checkOut: trip.checkOut, adults: "2", children: "0" });
  });
});
