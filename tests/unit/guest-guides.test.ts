import { describe, expect, it } from "vitest";
import { apartments } from "@/content/apartments";
import { getGuideArticle } from "@/content/guide";
import { getPlace } from "@/content/places";
import { guestGuideCopy, getGuestGuide } from "@/content/guest-guides";

describe("public apartment guest guides", () => {
  it("covers exactly the existing apartments without inventing a default", () => {
    for (const apartment of apartments) {
      const guide = getGuestGuide(apartment.slug)!;
      expect(guide.apartment.slug).toBe(apartment.slug);
      expect(guide.sections.map(section => section.id)).toEqual(["arrival", "check-in", "shopping", "first-evening", "check-out"]);
      for (const section of guide.sections) {
        for (const slug of section.guideSlugs) expect(getGuideArticle(slug), slug).toBeTruthy();
        for (const id of section.placeIds) expect(getPlace(id), id).toBeTruthy();
        for (const locale of ["en", "fr", "it", "uk"] as const) {
          expect(section.body[locale].length).toBeGreaterThan(30);
          expect(guestGuideCopy.title[locale]).toBeTruthy();
        }
      }
    }
    expect(getGuestGuide("unknown-apartment")).toBeUndefined();
  });

  it("keeps host arrangements unconfirmed and uses the existing parking rule", () => {
    const panoramic = getGuestGuide("panoramic-sea-view-studio")!;
    expect(panoramic.parkingAvailable).toBe(false);
    expect(getGuestGuide("beachside-family-apartment")!.parkingAvailable).toBe(true);
    expect(getGuestGuide("sea-view-balcony-studio")!.parkingAvailable).toBe(true);
    expect(panoramic.sections.find(section => section.id === "check-in")!.body.en).toContain("Confirm");
    expect(panoramic.sections.find(section => section.id === "check-out")!.body.en).toContain("Confirm");
    expect(JSON.stringify(panoramic.sections)).not.toMatch(/\b\d{1,2}:\d{2}\b/);
    expect(getGuestGuide("beachside-family-apartment")!.sections[3].guideSlugs).toContain("menton-with-kids-family-guide");
  });
});
