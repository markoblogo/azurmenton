import { notFound } from "next/navigation";
import { FavouritesList, type SavedContent } from "@/components/content/FavouritesList";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { getEventTitle, rivieraEvents } from "@/content/riviera-events";
import { isLocale } from "@/i18n/locales";
import { placeSharePath } from "@/lib/place-share-target";

export const metadata = { robots: { index: false, follow: true } };

export default async function FavouritesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const catalog: SavedContent[] = [
    ...guideArticles.map(guide => ({ type: "guide" as const, id: guide.slug, title: guide.title[locale], href: `/${locale}/guide/${guide.slug}` })),
    ...rivieraEvents.filter(event => event.detailPage).map(event => ({ type: "event" as const, id: event.occurrenceSlug ?? event.slug, title: getEventTitle(event, locale), href: `/${locale}/events/${event.occurrenceSlug ?? event.slug}` })),
    ...places.flatMap(place => {
      const href = placeSharePath(place.id, locale);
      return href ? [{ type: "place" as const, id: place.id, title: place.name, href }] : [];
    }),
  ];
  return <FavouritesList locale={locale} catalog={catalog} />;
}
