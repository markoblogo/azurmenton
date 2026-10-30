import { describe, expect, it } from "vitest";
import { dayGeography, dayNavigation } from "@/lib/trip-navigation";
import { tripPlaceCatalog } from "@/lib/trip-place-catalog";
import { placeCities } from "@/content/planning/place-cities";
import { places } from "@/content/places";

const stops = Array.from({length:12}, (_,i)=>({id:`stop-${i}`,title:`Stop ${i}`,href:`/en/guide/test#${i}`,point:`43.${i},7.${i}`,city:i ? "Monaco" : "Menton"}));
const day = {date:"2027-02-17",placeIds:stops.map(place=>place.id)};
describe("external day navigation", () => {
  it("keeps manual order and every stop across mobile-compatible overlapping segments", () => {
    const links=dayNavigation(day,stops,"walking");
    expect(links.map(link=>[link.from,link.to])).toEqual([[1,5],[5,9],[9,12]]);
    const actual=links.flatMap((link,i)=>{
      const params=new URL(link.href).searchParams;
      expect(params.get("travelmode")).toBe("walking");
      expect(link.href).not.toContain(day.date);
      const points=[params.get("origin"),...(params.get("waypoints")?.split("|") ?? []),params.get("destination")];
      expect(points.length).toBeLessThanOrEqual(5);
      return i ? points.slice(1) : points;
    });
    expect(actual).toEqual(stops.map(place=>place.point));
    const transit=dayNavigation(day,stops,"transit");
    expect(transit).toHaveLength(11);
    expect(transit.every(link=>!new URL(link.href).searchParams.has("waypoints"))).toBe(true);
  });
  it("never silently omits unknown or unreviewed stops", () => {
    expect(dayNavigation({...day,placeIds:["missing",stops[0].id]},stops,"walking")).toEqual([]);
    expect(dayNavigation(day,stops.map((place,i)=>i===1 ? {...place,point:undefined} : place),"walking")).toEqual([]);
    expect(dayNavigation({...day,placeIds:[stops[0].id]},stops,"walking")).toEqual([]);
    expect(dayNavigation(day,stops.map(place=>({...place,point:"999,7"})),"walking")).toEqual([]);
  });
  it("warns from explicit city metadata and keeps unknown distinct", () => {
    expect(dayGeography(day,stops)).toEqual({cities:["Menton","Monaco"],unknown:false});
    expect(dayGeography({...day,placeIds:["missing"]},stops)).toEqual({cities:[],unknown:true});
    for(const id of Object.keys(placeCities)) expect(places.some(place=>place.id===id),id).toBe(true);
    const catalog=tripPlaceCatalog("uk");
    expect(catalog.find(place=>place.id==="halles-du-marche")).toMatchObject({city:"Menton",point:"43.77608,7.50847"});
  });
});
