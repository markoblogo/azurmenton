import { describe, expect, it } from "vitest";
import { emptyTrip, parseTrip, saveTrip } from "@/lib/my-trip";

describe("private trip profile", () => {
  const trip = { ...emptyTrip, checkIn: "2027-02-15", checkOut: "2027-02-18" };
  const raw = (value: unknown) => JSON.stringify({ version: 1, trip: value });
  it("accepts valid profiles and rejects impossible or reversed dates", () => {
    expect(parseTrip(raw(trip))).toEqual(trip);
    expect(parseTrip(raw({ ...trip, checkIn: "2027-02-30" }))).toBeNull();
    expect(parseTrip(raw({ ...trip, checkOut: trip.checkIn }))).toBeNull();
    expect(parseTrip(raw({ ...trip, adults: -1 }))).toBeNull();
    expect(parseTrip(raw({ ...trip, interests: ["unknown"] }))).toBeNull();
    expect(parseTrip("broken")).toBeNull();
  });
  it("strips extra guest data and handles unavailable storage", () => {
    expect(parseTrip(raw({ ...trip, email: "private@example.com" }))).not.toHaveProperty("email");
    expect(saveTrip({ setItem: () => { throw new Error("blocked"); } }, trip)).toBe(false);
    let stored = "";
    saveTrip({ setItem: (_key, value) => { stored = value; } }, { ...trip, email: "private@example.com" } as typeof trip);
    expect(stored).not.toContain("private@example.com");
  });
});
