import { describe, expect, it } from "vitest";
import { emptyTrip, parseTrip, saveTrip, tripBookingValues } from "@/lib/my-trip";

const trip = {...emptyTrip,checkIn:"2027-02-15",checkOut:"2027-02-20",children:3};
const raw = (value: unknown) => JSON.stringify({version:1,trip:value});
describe("optional device-only child ages",()=>{
  it("keeps legacy profiles and unknown ages valid",()=>{
    expect(parseTrip(raw(trip))).toEqual(trip);
    expect(parseTrip(raw({...trip,childAges:[null,null,null]}))).toEqual(trip);
    expect(parseTrip(raw({...trip,childAges:[7,null,0]}))).toEqual({...trip,childAges:[7,null,0]});
  });
  it("bounds ages and keeps positions without discarding valid plans",()=>{
    expect(parseTrip(raw({...trip,childAges:[17,18,-1,8]}))?.childAges).toEqual([17,null,null]);
    expect(parseTrip(raw({...trip,children:1,childAges:[7,8,9]}))?.childAges).toEqual([7]);
    expect(parseTrip(raw({...trip,children:0,childAges:[7]}))).not.toHaveProperty("childAges");
    expect(parseTrip(raw({...trip,childAges:[7.5,"8",9]}))?.childAges).toEqual([null,null,9]);
  });
  it("never adds ages to booking prefill and normalizes storage",()=>{
    const profile={...trip,childAges:[7,null,12]};
    expect(tripBookingValues(profile,"2027-01-01")).not.toHaveProperty("childAges");
    let stored="";
    expect(saveTrip({setItem:(_key,value)=>{stored=value;}},profile)).toBe(true);
    expect(parseTrip(stored)?.childAges).toEqual([7,null,12]);
    expect(stored).not.toContain("birth");
  });
});
