export function firstPlaceSectionIndices(sections: ReadonlyArray<{ relatedPlaceIds?: readonly string[] }>) {
  const first = new Map<string, number>();
  sections.forEach((section, index) => section.relatedPlaceIds?.forEach((id) => {
    if (!first.has(id)) first.set(id, index);
  }));
  return first;
}
