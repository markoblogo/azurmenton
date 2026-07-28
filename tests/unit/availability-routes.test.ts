import { describe, expect, it, vi } from "vitest";

vi.mock("../../src/lib/availability/service", () => ({
  getPublicAllApartmentAvailability: vi.fn(),
  getPublicApartmentAvailability: vi.fn(),
}));

import { GET as getAllAvailability } from "../../src/app/api/availability/route";
import { GET as getApartmentAvailability } from "../../src/app/api/availability/[apartmentSlug]/route";
import {
  getPublicAllApartmentAvailability,
  getPublicApartmentAvailability,
} from "../../src/lib/availability/service";

describe("availability API routes", () => {
  it("returns sanitized apartment availability with noindex cache headers", async () => {
    vi.mocked(getPublicAllApartmentAvailability).mockResolvedValue([
      {
        apartmentSlug: "sea-view-balcony-studio",
        status: "available",
        freeWindows: [{ start: "2026-08-10", end: "2026-08-14" }],
        checkedAt: "2026-07-28T08:00:00.000Z",
        sourceFreshness: "fresh",
      },
    ]);

    const response = await getAllAvailability();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=900");
    expect(body).toEqual({
      apartments: [
        {
          apartmentSlug: "sea-view-balcony-studio",
          status: "available",
          freeWindows: [{ start: "2026-08-10", end: "2026-08-14" }],
          checkedAt: "2026-07-28T08:00:00.000Z",
          sourceFreshness: "fresh",
        },
      ],
    });
    expect(JSON.stringify(body)).not.toMatch(/UID|SUMMARY|DESCRIPTION|guest|booking\.com|airbnb\.com|\?t=/i);
  });

  it("returns 404 for an unknown apartment slug", async () => {
    vi.mocked(getPublicApartmentAvailability).mockResolvedValue(null);

    const response = await getApartmentAvailability(new Request("https://azurmenton.com/api/availability/unknown"), {
      params: Promise.resolve({ apartmentSlug: "unknown" }),
    });
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
    expect(body).toEqual({ error: "Unknown apartment slug." });
  });
});
