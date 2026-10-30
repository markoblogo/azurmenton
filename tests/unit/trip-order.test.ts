import { describe, expect, it } from "vitest";
import { applySuggestedPlaceOrder, canSuggestPlaceOrder, suggestPlaceOrder } from "@/lib/trip-order";
import { emptyTrip } from "@/lib/my-trip";
const ids=["a","b","c","d"];
const points={a:0,b:10,c:1,d:2};
describe("optional proximity suggestion",()=>{
  it("keeps the starting stop and complete set, only offering an improvement",()=>{
    const distance=(a:string,b:string)=>Math.abs(points[a as keyof typeof points]-points[b as keyof typeof points]);
    expect(suggestPlaceOrder(ids,distance)).toEqual(["a","c","d","b"]);
    expect(suggestPlaceOrder(["a","c","d","b"],distance)).toBeNull();
    expect(suggestPlaceOrder(ids,()=>NaN)).toBeNull();
    expect(suggestPlaceOrder(["a","a","b"],distance)).toBeNull();
  });
  it("does not offer multi-city, unknown, invalid-coordinate or tiny plans",()=>{
    const places=ids.map((id,index)=>({id,title:id,href:"/en/guide/test",city:"Menton",point:`43.${index},7.5`}));
    const day={date:"2027-02-17",placeIds:ids};
    expect(canSuggestPlaceOrder(day,places)).toBe(true);
    expect(canSuggestPlaceOrder(day,places.map((place,index)=>index?place:{...place,city:"Monaco"}))).toBe(false);
    expect(canSuggestPlaceOrder(day,places.map(place=>({...place,city:undefined})))).toBe(false);
    expect(canSuggestPlaceOrder(day,places.map(place=>({...place,point:"99,7"})))).toBe(false);
    expect(canSuggestPlaceOrder({...day,placeIds:["a","b"]},places)).toBe(false);
  });
  it("applies and undoes against a fresh matching plan, never dropping or adding stops",()=>{
    const trip={...emptyTrip,checkIn:"2027-02-15",checkOut:"2027-02-20",placeDays:[{date:"2027-02-17",placeIds:ids}]};
    const after=["a","c","d","b"];
    const next=applySuggestedPlaceOrder(trip,"2027-02-17",ids,after)!;
    expect(applySuggestedPlaceOrder(next,"2027-02-17",after,ids)).toEqual(trip);
    expect(applySuggestedPlaceOrder(next,"2027-02-17",ids,after)).toBeNull();
    expect(applySuggestedPlaceOrder(trip,"2027-02-17",ids,["a","a","c","d"])).toBeNull();
    expect(applySuggestedPlaceOrder(trip,"2027-02-17",ids,["a","b","c","unknown"])).toBeNull();
  });
});
