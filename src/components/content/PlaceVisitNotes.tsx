import type { Place } from "@/content/places";
import type { Locale } from "@/i18n/locales";
import { placeVisitDetails } from "@/lib/place-visit-rules";

export function PlaceVisitNotes({ place, locale }: { place: Place; locale: Locale }) {
  const notes = placeVisitDetails(place, locale);
  if (!notes.length) return null;
  const label = { en: "Source checked", fr: "Source consultée", it: "Fonte verificata", uk: "Джерело перевірено" }[locale];
  return <ul data-place-visit-notes={place.id} className="mt-3 space-y-2 text-sm leading-6 text-[#765621]">
    {notes.map((note, index) => <li key={`${note.sourceUrl}-${index}`}>
      <p>{note.value}</p>
      <a href={note.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block min-h-6 underline underline-offset-4">{label}: <time dateTime={note.checkedOn}>{note.checkedOn}</time></a>
    </li>)}
  </ul>;
}
