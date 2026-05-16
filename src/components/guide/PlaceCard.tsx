import Link from "next/link";
import type { Route } from "next";
import type { Locale } from "@/i18n/locales";
import type { Place } from "@/content/places";

const labels = {
  en: { map: "Open in Google Maps", hours: "Hours", price: "Price", note: "Check current details before visiting" },
  fr: { map: "Ouvrir dans Google Maps", hours: "Horaires", price: "Tarifs", note: "Verifiez les informations actuelles avant la visite" },
  it: { map: "Apri in Google Maps", hours: "Orari", price: "Prezzo", note: "Controlla i dettagli aggiornati prima della visita" },
  uk: { map: "Відкрити в Google Maps", hours: "Години", price: "Ціни", note: "Перед візитом перевірте актуальні деталі" },
};

export function PlaceCard({ place, locale, compact = false }: { place: Place; locale: Locale; compact?: boolean }) {
  const copy = labels[locale];
  const location = place.address ?? place.area?.[locale];

  return (
    <article className="border border-[#dfd2b8] bg-[#fffaf0] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{place.type.replaceAll("-", " ")}</p>
          <h3 className="mt-2 serif-heading text-xl leading-tight text-[#173f36]">{place.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#5c5044]">{place.shortNote[locale]}</p>
      {location ? <p className="mt-3 text-xs leading-5 text-[#71665b]">{location}</p> : null}
      {!compact && place.openingHoursLabel ? (
        <p className="mt-3 text-xs leading-5 text-[#71665b]"><span className="font-bold uppercase tracking-[0.12em] text-[#173f36]">{copy.hours}: </span>{place.openingHoursLabel[locale]}</p>
      ) : null}
      {!compact && place.priceLabel ? (
        <p className="mt-2 text-xs leading-5 text-[#71665b]"><span className="font-bold uppercase tracking-[0.12em] text-[#173f36]">{copy.price}: </span>{place.priceLabel[locale]}</p>
      ) : null}
      {place.sourceStatus === "needs_verification" ? <p className="mt-3 text-xs italic text-[#71665b]">{copy.note}</p> : null}
      {place.googleMapsUrl ? (
        <Link className="mt-4 inline-flex border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={place.googleMapsUrl as Route} target="_blank" rel="noopener noreferrer">
          {copy.map}
        </Link>
      ) : null}
    </article>
  );
}
