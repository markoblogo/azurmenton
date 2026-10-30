import { describe, expect, it } from "vitest";
import { hasVisitRuleSource, placeMinimumAge, placeVisitNotes } from "@/lib/place-visit-rules";
import { tripAgeChecks } from "@/lib/trip-age-checks";
import { places } from "@/content/places";

const source={sourceUrl:"https://example.com/official",checkedOn:"2026-10-30"};
describe("shared visit rules",()=>{
  it("keeps missing and unsupported age rules unknown",()=>{
    expect(placeMinimumAge({})).toBeUndefined();
    expect(placeMinimumAge({visitRules:{minimumAge:{...source,value:8}}})).toBe(8);
    for(const rule of [{...source,value:-1},{...source,value:8.5},{...source,value:8,sourceUrl:"javascript:alert(1)"},{...source,value:8,checkedOn:"2026-02-30"}]) expect(placeMinimumAge({visitRules:{minimumAge:rule}})).toBeUndefined();
  });
  it("renders common notes in all locales and validates stored provenance",()=>{
    const place=places.find(place=>place.id==="rampes-saint-michel")!;
    for(const locale of ["en","fr","it","uk"] as const) expect(placeVisitNotes(place,locale)).toHaveLength(1);
    for(const place of places) for(const rule of Object.values(place.visitRules??{})) expect(hasVisitRuleSource<unknown>(rule),place.id).toBe(true);
  });
  it("warns without filtering out stops or asserting suitability",()=>{
    const catalog=[{id:"checked",title:"Checked",href:"/en/guide/test",minimumAge:8},{id:"unknown",title:"Unknown",href:"/en/guide/test"}];
    expect(tripAgeChecks(2,[7,null],catalog)).toEqual({unknownAges:1,unverifiedPlaces:["unknown"],belowMinimum:["checked"]});
    expect(tripAgeChecks(1,[12],catalog).belowMinimum).toEqual([]);
    expect(tripAgeChecks(0,undefined,catalog)).toEqual({unknownAges:0,unverifiedPlaces:[],belowMinimum:[]});
  });
});
