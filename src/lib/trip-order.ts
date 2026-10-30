import type { MyTrip } from "./my-trip";
import type { PlaceDay, PlanPlace } from "./trip-place-days";
import { dayGeography } from "./trip-navigation";

export function canSuggestPlaceOrder(day:PlaceDay,places:PlanPlace[]){
  const geo=dayGeography(day,places);
  return day.placeIds.length>=3&&day.placeIds.length<=12&&!geo.unknown&&geo.cities.length===1&&day.placeIds.every(id=>{
    const point=places.find(place=>place.id===id)?.point;
    if(!point||!/^[-\d.]+,[-\d.]+$/.test(point))return false;
    const [lat,lng]=point.split(",").map(Number);return Number.isFinite(lat)&&Number.isFinite(lng)&&Math.abs(lat)<=90&&Math.abs(lng)<=180;
  });
}

// Distance is supplied by the existing Leaflet geodesic API. This is a bounded
// nearby-order heuristic, never a street route, timetable or optimal-tour claim.
export function suggestPlaceOrder(ids:string[],distance:(a:string,b:string)=>number):string[]|null{
  if(ids.length<3||ids.length>12||new Set(ids).size!==ids.length)return null;
  const remaining=ids.slice(1);const order=[ids[0]];
  while(remaining.length){
    let best=0;let nearest=Infinity;
    for(let i=0;i<remaining.length;i++){
      const d=distance(order[order.length-1],remaining[i]);
      if(!Number.isFinite(d)||d<0)return null;
      if(d<nearest){nearest=d;best=i;}
    }
    order.push(remaining.splice(best,1)[0]);
  }
  const length=(items:string[])=>items.slice(1).reduce((sum,id,index)=>sum+distance(items[index],id),0);
  return length(order)+1<length(ids)?order:null;
}

export function applySuggestedPlaceOrder(trip:MyTrip,date:string,before:string[],after:string[]):MyTrip|null{
  const day=trip.placeDays?.find(day=>day.date===date);
  if(!day||JSON.stringify(day.placeIds)!==JSON.stringify(before)||after.length!==before.length||new Set(after).size!==after.length||after.some(id=>!before.includes(id)))return null;
  return {...trip,placeDays:trip.placeDays!.map(day=>day.date===date?{...day,placeIds:[...after]}:day)};
}
