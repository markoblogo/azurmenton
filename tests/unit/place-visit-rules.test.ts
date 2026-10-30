import { describe, expect, it } from "vitest";
import { hasVisitRuleSource, placeMinimumAge, placeVisitDetails, placeVisitNotes } from "@/lib/place-visit-rules";
import { tripAgeChecks } from "@/lib/trip-age-checks";
import { places } from "@/content/places";
import { tripPlaceCatalog } from "@/lib/trip-place-catalog";
import { dayRouteDetails } from "@/content/planning/day-route-details";

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
    for(const place of places) {
      const {conditions=[], ...scalarRules}=place.visitRules??{};
      for(const rule of [...Object.values(scalarRules),...conditions]) expect(hasVisitRuleSource<unknown>(rule),place.id).toBe(true);
      for(const condition of conditions) for(const locale of ["en","fr","it","uk"] as const) expect(condition.value[locale].trim(),`${place.id}:${locale}`).not.toBe("");
    }
  });
  it("uses the same sourced conditions in the route stops and private planning catalogue",()=>{
    for(const locale of ["en","fr","it","uk"] as const) {
      const catalog=tripPlaceCatalog(locale);
      for(const route of Object.values(dayRouteDetails)) {
        const notes=route.stops.flatMap(stop=>{
          const place=places.find(place=>place.id===stop.placeId)!;
          const notes=placeVisitDetails(place,locale);
          for(const note of notes) expect(catalog.find(item=>item.id===place.id)?.visitorInfo).toContain(note.value);
          return notes;
        });
        expect(notes.length).toBeGreaterThan(0);
      }
    }
  });
  it("does not mistake ticket age bands or partial lift access for general suitability",()=>{
    const museum=places.find(place=>place.id==="oceanographic-museum-monaco")!;
    expect(placeMinimumAge(museum)).toBe(0);
    expect(placeVisitNotes(museum,"en").join(" ")).toContain("level -1 as stairs-only");
    for(const id of ["salle-des-mariages-jean-cocteau","palais-de-leurope-menton","musee-jean-cocteau-bastion"]) expect(placeMinimumAge(places.find(place=>place.id===id)!)).toBeUndefined();
    expect(placeVisitNotes(places.find(place=>place.id==="ventimiglia-station")!,"en").join(" ")).toContain("Other platforms are not listed as barrier-free");
  });
  it("suppresses invalid provenance and missing locale text rather than inventing a fallback",()=>{
    const value={en:"Official condition",fr:"",it:"Condizione",uk:"Умова"};
    expect(placeVisitNotes({visitRules:{conditions:[{...source,value}]}},"fr")).toEqual([]);
    expect(placeVisitNotes({visitRules:{conditions:[{...source,sourceUrl:"http://example.com",value}]}},"en")).toEqual([]);
  });
  it("warns without filtering out stops or asserting suitability",()=>{
    const catalog=[{id:"checked",title:"Checked",href:"/en/guide/test",minimumAge:8},{id:"unknown",title:"Unknown",href:"/en/guide/test"}];
    expect(tripAgeChecks(2,[7,null],catalog)).toEqual({unknownAges:1,unverifiedPlaces:["unknown"],belowMinimum:["checked"]});
    expect(tripAgeChecks(1,[12],catalog).belowMinimum).toEqual([]);
    expect(tripAgeChecks(0,undefined,catalog)).toEqual({unknownAges:0,unverifiedPlaces:[],belowMinimum:[]});
  });
});
