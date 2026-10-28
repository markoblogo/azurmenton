import { describe, expect, it } from "vitest";
import { FAVOURITES_KEY, parseFavourites, readFavourites, setFavourite } from "@/lib/favourites";

function storage() {
  const entries = new Map<string, string>();
  return { getItem: (key: string) => entries.get(key) ?? null, setItem: (key: string, value: string) => { entries.set(key, value); } };
}

describe("device favourites", () => {
  it("saves and removes independent guide, event and place entries", () => {
    const store = storage();
    const guide = { type: "guide", id: "menton-old-town" } as const;
    const place = { type: "place", id: "menton-old-town" } as const;
    expect(setFavourite(store, guide, true)).toBe(true);
    setFavourite(store, guide, true);
    setFavourite(store, place, true);
    expect(readFavourites(store)).toEqual([guide, place]);
    setFavourite(store, guide, false);
    expect(readFavourites(store)).toEqual([place]);
  });
  it("rejects malformed, unexpected and duplicate data", () => {
    expect(parseFavourites(JSON.stringify({ version: 1, items: [{ type: "guide", id: "a", email: "private@example.com" }] }))).toEqual([{ type: "guide", id: "a" }]);
    expect(parseFavourites("{")).toEqual([]);
    expect(parseFavourites('{"version":2,"items":[]}')).toEqual([]);
    expect(parseFavourites(JSON.stringify({ version: 1, items: [{ type: "guide", id: "a" }, { type: "guide", id: "a" }, { type: "guide", id: "../x" }, { type: "unknown", id: "b" }] }))).toEqual([{ type: "guide", id: "a" }]);
  });
  it("reports storage failures without claiming a save", () => {
    const store = { getItem: () => null, setItem: () => { throw new Error("unavailable"); } };
    expect(setFavourite(store, { type: "event", id: "event-2027" }, true)).toBe(false);
    expect(readFavourites({ getItem: () => { throw new Error("blocked"); } })).toEqual([]);
    let wrote = false;
    expect(setFavourite({ getItem: () => { throw new Error("blocked"); }, setItem: () => { wrote = true; } }, { type: "guide", id: "a" }, true)).toBe(false);
    expect(wrote).toBe(false);
    expect(FAVOURITES_KEY).not.toContain("email");
  });
});
