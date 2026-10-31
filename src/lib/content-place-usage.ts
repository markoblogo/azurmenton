type GuidePlaceLinks = { relatedPlaces?: string[]; sections: { relatedPlaceIds?: string[] }[] };
type EventPlaceLinks = { relatedPlaceIds?: string[]; venue?: { placeId?: string } };

export function referencedPlaceIds(guides: GuidePlaceLinks[], events: EventPlaceLinks[]) {
  return new Set([
    ...guides.flatMap(guide => [...(guide.relatedPlaces ?? []), ...guide.sections.flatMap(section => section.relatedPlaceIds ?? [])]),
    ...events.flatMap(event => [...(event.relatedPlaceIds ?? []), ...(event.venue?.placeId ? [event.venue.placeId] : [])]),
  ]);
}
