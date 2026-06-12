import Link from "next/link";
import type { Route } from "next";
import type { Locale } from "@/i18n/locales";
import type { Place } from "@/content/places";
import { GuideVisual } from "@/components/guide/GuideVisual";

const labels = {
  en: { map: "Open in Google Maps", hours: "Hours", price: "Price", note: "Check current hours before visiting", related: "Related guide" },
  fr: { map: "Ouvrir dans Google Maps", hours: "Horaires", price: "Tarifs", note: "Vérifiez les horaires actuels avant la visite", related: "Guide lié" },
  it: { map: "Apri in Google Maps", hours: "Orari", price: "Prezzo", note: "Controlla gli orari aggiornati prima della visita", related: "Guida correlata" },
  uk: { map: "Відкрити в Google Maps", hours: "Години", price: "Ціни", note: "Перед візитом перевірте актуальні години роботи", related: "Пов'язаний гід" },
};

export function PlaceCard({ place, locale, compact = false }: { place: Place; locale: Locale; compact?: boolean }) {
  const copy = labels[locale];
  const location = place.address ?? place.area?.[locale];
  const mapsHref = place.googleMapsSearchUrl ?? place.googleMapsUrl;
  const relatedHref = place.relatedArticleIds[0] ? (`/${locale}/guide/${place.relatedArticleIds[0]}` as Route) : undefined;

  return (
    <article className="group relative overflow-hidden border border-[#dfd2b8] bg-[#fffaf0] transition-all duration-300 hover:border-[#c6a66a]">
      <GuideVisual
        image={place.image}
        imageAlt={place.imageAlt?.[locale]}
        locale={locale}
        theme={place.visualTheme ?? "walk"}
        label={place.type.replaceAll("-", " ")}
        className={compact ? "aspect-[4/1.65]" : "aspect-[4/1.9]"}
        expandable
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{place.type.replaceAll("-", " ")}</p>
            <h3 className="mt-2 serif-heading text-xl leading-tight text-[#173f36]">{place.name}</h3>
          </div>
        </div>
        <p className="mt-3 overflow-hidden text-sm leading-6 text-[#5c5044] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">{place.shortNote[locale]}</p>
        {location ? <p className="mt-3 text-xs leading-5 text-[#71665b]">{location}</p> : null}
        {!compact && place.openingHoursLabel ? (
          <p className="mt-3 text-xs leading-5 text-[#71665b]"><span className="font-bold uppercase tracking-[0.12em] text-[#173f36]">{copy.hours}: </span>{place.openingHoursLabel[locale]}</p>
        ) : null}
        {!compact && place.priceLabel ? (
          <p className="mt-2 text-xs leading-5 text-[#71665b]"><span className="font-bold uppercase tracking-[0.12em] text-[#173f36]">{copy.price}: </span>{place.priceLabel[locale]}</p>
        ) : null}
        {place.sourceStatus === "needs_verification" ? <p className="mt-3 text-xs italic text-[#71665b]">{copy.note}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {compact && relatedHref ? (
            <Link className="inline-flex border border-[#dfd2b8] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] transition-colors hover:bg-[#f3ead7]" href={relatedHref}>
              {copy.related}
            </Link>
          ) : null}
          {mapsHref ? (
            <Link className="relative z-20 inline-flex border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={mapsHref as Route} target="_blank" rel="noopener noreferrer">
              {copy.map}
            </Link>
          ) : null}
          {!compact && relatedHref ? (
            <Link className="inline-flex border border-[#dfd2b8] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={relatedHref}>
              {copy.related}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
