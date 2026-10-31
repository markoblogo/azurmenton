import { describe, expect, it } from "vitest";
import { getPublicWeeklyDigest, weeklyDigests } from "@/content/weekly-digests";
import { getRivieraEvent } from "@/content/riviera-events";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { mentonDetails } from "@/content/menton-details";
describe("editorial layers reuse canonical content",()=>{
  it("has four translations and a bounded current edition, not stale evergreen dates",()=>{
    expect(weeklyDigests).toHaveLength(8);
    for(const locale of ["en","fr","it","uk"] as const){
      const digest=getPublicWeeklyDigest(locale,new Date("2026-10-30T12:00:00Z"))!;
      expect(digest.items).toHaveLength(3);
      expect(getPublicWeeklyDigest(locale,new Date("2026-11-06T12:00:00Z"))?.slug).toBe("2026-11-06");
      expect(getPublicWeeklyDigest(locale,new Date("2026-11-13T12:00:00Z"))).toBeUndefined();
      expect(getPublicWeeklyDigest(locale,new Date("2026-10-29T12:00:00Z"))).toBeUndefined();
      for(const item of digest.items){
        expect(getRivieraEvent(item.relatedEventSlug!)).toBeTruthy();
        expect(guideArticles.some(guide=>guide.slug===item.relatedGuideSlug),item.relatedGuideSlug).toBe(true);
        for(const id of item.relatedPlaceIds??[])expect(places.some(place=>place.id===id)).toBe(true);
      }
    }
    const later=getPublicWeeklyDigest("en",new Date("2026-11-02T12:00:00Z"))!;
    expect(later.items.map(item=>item.relatedEventSlug)).toEqual(["jimmy-gnecco-ours-monaco-2026-11-05"]);
  });
  it("switches the next edition on Paris midnight and withdraws completed outings",()=>{
    for(const locale of ["en","fr","it","uk"] as const){
      expect(getPublicWeeklyDigest(locale,new Date("2026-11-05T22:59:59Z"))?.slug).toBe("2026-10-30");
      const start=getPublicWeeklyDigest(locale,new Date("2026-11-05T23:00:00Z"))!;
      expect(start.slug).toBe("2026-11-06");
      expect(start.items).toHaveLength(4);
      const later=getPublicWeeklyDigest(locale,new Date("2026-11-10T12:00:00Z"))!;
      expect(later.items).toHaveLength(1);
      expect(later.items[0].category).toBe("food");
      expect(getPublicWeeklyDigest(locale,new Date("2026-11-13T00:00:00Z"))).toBeUndefined();
      for(const item of start.items){
        expect(guideArticles.some(guide=>guide.slug===item.relatedGuideSlug)).toBe(true);
        for(const id of item.relatedPlaceIds??[])expect(places.find(place=>place.id===id)?.image).toBeTruthy();
      }
    }
    expect(new Set(mentonDetails.map(detail=>detail.id)).size).toBe(3);
  });
  it("details reference a real illustrated place and an existing full guide",()=>{
    for(const detail of mentonDetails){
      expect(places.find(place=>place.id===detail.placeId)?.image).toBeTruthy();
      expect(guideArticles.some(guide=>guide.slug===detail.guideSlug)).toBe(true);
      for(const locale of ["en","fr","it","uk"] as const){expect(detail.title[locale]).toBeTruthy();expect(detail.paragraphs.every(paragraph=>paragraph[locale].length>60)).toBe(true);}
    }
  });
  it("withdraws an item if its event source becomes unverified",()=>{
    const event=getRivieraEvent("jimmy-gnecco-ours-monaco-2026-11-05")!;
    const status=event.sourceStatus;
    try{event.sourceStatus="needs_verification";expect(getPublicWeeklyDigest("en",new Date("2026-10-30T12:00:00Z"))!.items.some(item=>item.relatedEventSlug===event.slug)).toBe(false);}finally{event.sourceStatus=status;}
  });
});
