import Link from "next/link";
import type { Route } from "next";
import type { Locale } from "@/i18n/locales";
import type { Place } from "@/content/places";
import { GuideVisual } from "@/components/guide/GuideVisual";
import { FavouriteButton } from "@/components/content/FavouriteButton";
import { ShareActions } from "@/components/content/ShareActions";
import { placeSharePath } from "@/lib/place-share-target";
import { siteConfig } from "@/config/site";
import { PlaceImageCarousel } from "@/components/guide/PlaceImageCarousel";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { bookingFunnelEvents } from "@/lib/analytics";

const labels = {
  en: { map: "Open in Google Maps", programme: "View current programme", website: "Website", hours: "Hours", price: "Price", note: "Check current hours before visiting", related: "Related guide" },
  fr: { map: "Ouvrir dans Google Maps", programme: "Voir le programme actuel", website: "Site web", hours: "Horaires", price: "Tarifs", note: "Vérifiez les horaires actuels avant la visite", related: "Guide lié" },
  it: { map: "Apri in Google Maps", programme: "Vedi il programma attuale", website: "Sito web", hours: "Orari", price: "Prezzo", note: "Controlla gli orari aggiornati prima della visita", related: "Guida correlata" },
  uk: { map: "Відкрити в Google Maps", programme: "Переглянути актуальну програму", website: "Вебсайт", hours: "Години", price: "Ціни", note: "Перед візитом перевірте актуальні години роботи", related: "Пов'язаний гід" },
};
const businessLabels: Record<Locale, string> = { en: "Represent this place? Contact us", fr: "Vous représentez ce lieu ? Contactez-nous", it: "Rappresenti questo luogo? Contattaci", uk: "Представляєте цей заклад? Напишіть нам" };

export function PlaceCard({ place, locale, compact = false, currentGuideId, relatedGuideSlug, anchorId }: { place: Place; locale: Locale; compact?: boolean; currentGuideId?: string; relatedGuideSlug?: string | null; anchorId?: string }) {
  const copy = labels[locale];
  const location = place.address ?? place.area?.[locale];
  const mapsHref = place.googleMapsSearchUrl ?? place.googleMapsUrl;
  const relatedArticleId = relatedGuideSlug === undefined
    ? place.relatedArticleIds.find((articleId) => articleId !== currentGuideId)
    : relatedGuideSlug;
  const relatedHref = relatedArticleId ? (`/${locale}/guide/${relatedArticleId}` as Route) : undefined;
  const externalLinkLabel = place.type === "cinema" || place.type === "theatre" ? copy.programme : copy.website;
  const visualLabel = place.type.replaceAll("-", " ");
  const imageAlt = place.imageAlt?.[locale] ?? visualLabel;
  const sharePath = placeSharePath(place.id, locale);

  return (
    <article id={anchorId} className="group relative scroll-mt-28 overflow-hidden border border-[#dfd2b8] bg-[#fffaf0] transition-all duration-300 hover:border-[#c6a66a]">
      {place.images && place.images.length > 1 ? (
        <PlaceImageCarousel images={place.images} imageAlt={imageAlt} locale={locale} label={visualLabel} className={compact ? "aspect-[4/1.65]" : "aspect-[4/1.9]"} />
      ) : (
        <GuideVisual
          image={place.image}
          imageAlt={place.imageAlt?.[locale]}
          locale={locale}
          theme={place.visualTheme ?? "walk"}
          label={visualLabel}
          className={compact ? "aspect-[4/1.65]" : "aspect-[4/1.9]"}
          expandable
        />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{visualLabel}</p>
            <h3 className="mt-2 break-words serif-heading text-xl leading-tight text-[#173f36]">{place.name}</h3>
          </div>
          <div className="flex shrink-0 gap-2">
            {sharePath ? <ShareActions locale={locale} title={place.name} url={`${siteConfig.url}${sharePath}`} compact /> : null}
            <FavouriteButton locale={locale} item={{ type: "place", id: place.id }} />
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
          {place.programmeUrl ? (
            <TrackedLink eventName={bookingFunnelEvents.placeWebsiteClick} props={{ locale, placeId: place.id, ...(currentGuideId ? { guideSlug: currentGuideId } : {}) }} className="inline-flex border border-[#dfd2b8] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={place.programmeUrl} target="_blank" rel="noopener noreferrer">
              {externalLinkLabel}
            </TrackedLink>
          ) : null}
          {mapsHref ? (
            <TrackedLink eventName={bookingFunnelEvents.placeMapClick} props={{ locale, placeId: place.id, ...(currentGuideId ? { guideSlug: currentGuideId } : {}) }} className="inline-flex border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={mapsHref} target="_blank" rel="noopener noreferrer">
              {copy.map}
            </TrackedLink>
          ) : null}
          {!compact && relatedHref ? (
            <Link className="inline-flex border border-[#dfd2b8] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={relatedHref}>
              {copy.related}
            </Link>
          ) : null}
        </div>
        {!compact ? <Link href={`/${locale}/partners` as Route} className="mt-4 inline-block text-xs text-[#665c50] underline underline-offset-2">{businessLabels[locale]}</Link> : null}
      </div>
    </article>
  );
}
