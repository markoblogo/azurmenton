import type { PlanPlace } from "./trip-place-days";

export function tripAgeChecks(children: number, ages: (number|null)[] | undefined, places: PlanPlace[]) {
  const known=(ages??[]).slice(0,children).filter((age):age is number=>Number.isInteger(age)&&age!==null&&age>=0&&age<=17);
  return {
    unknownAges: Math.max(0,children-known.length),
    unverifiedPlaces: children>0 ? places.filter(place=>place.minimumAge===undefined).map(place=>place.id) : [],
    belowMinimum: children>0 ? places.filter(place=>place.minimumAge!==undefined&&known.some(age=>age<place.minimumAge!)).map(place=>place.id) : [],
  };
}
