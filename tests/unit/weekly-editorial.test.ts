import { describe, expect, it } from "vitest";
import { getPublicWeeklyDigest, weeklyDigests } from "@/content/weekly-digests";
import { getRivieraEvent } from "@/content/riviera-events";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { mentonDetails } from "@/content/menton-details";
describe("editorial layers reuse canonical content",()=>{
  it("has four translations and a bounded current edition, not stale evergreen dates",()=>{
    expect(weeklyDigests).toHaveLength(4);
    for(const locale of ["en","fr","it","uk"] as const){
      const digest=getPublicWeeklyDigest(locale,new Date("2026-10-30T12:00:00Z"))!;
      expect(digest.items).toHaveLength(3);
      expect(getPublicWeeklyDigest(locale,new Date("2026-11-06T12:00:00Z"))).toBeUndefined();
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
