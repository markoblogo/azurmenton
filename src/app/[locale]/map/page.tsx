import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { UsefulPlacesMap, type UsefulPlaceMapCategory } from "@/components/places/UsefulPlacesMap";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { placeMapPoints } from "@/content/planning/place-map-points";
import { places, type PlaceType } from "@/content/places";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Useful places in and near Menton",
    seoTitle: "Useful Places in Menton Map | Azur Menton",
    description: "A compact planning map for beaches, markets, gardens, viewpoints, food stops and practical places in and near Menton.",
    eyebrow: "Planning map",
    intro: "Filter the places most often used in Azur Menton guides, then open the current route or listing in Google Maps.",
    guide: "Back to guide",
    availability: "Check availability",
  },
  fr: {
    title: "Lieux utiles a Menton et autour",
    seoTitle: "Carte des lieux utiles a Menton | Azur Menton",
    description: "Une carte de preparation pour plages, marches, jardins, points de vue, adresses gourmandes et lieux pratiques autour de Menton.",
    eyebrow: "Carte de preparation",
    intro: "Filtrez les lieux souvent utilises dans les guides Azur Menton, puis ouvrez l'itineraire ou la fiche actuelle dans Google Maps.",
    guide: "Retour au guide",
    availability: "Verifier disponibilite",
  },
  it: {
    title: "Luoghi utili a Mentone e dintorni",
    seoTitle: "Mappa dei luoghi utili a Mentone | Azur Menton",
    description: "Una mappa compatta per spiagge, mercati, giardini, punti panoramici, soste gastronomiche e luoghi pratici vicino a Mentone.",
    eyebrow: "Mappa pratica",
    intro: "Filtra i luoghi usati piu spesso nelle guide Azur Menton, poi apri percorso o scheda aggiornata in Google Maps.",
    guide: "Torna alla guida",
    availability: "Controlla disponibilita",
  },
  uk: {
    title: "Корисні місця в Ментоні та поруч",
    seoTitle: "Карта корисних місць у Ментоні | Azur Menton",
    description: "Компактна карта для планування пляжів, ринків, садів, оглядових місць, їжі та практичних адрес у Ментоні й поруч.",
    eyebrow: "Карта для планування",
    intro: "Фільтруйте місця, які найчастіше використовуються в гідах Azur Menton, а потім відкривайте актуальний маршрут або сторінку в Google Maps.",
    guide: "Назад до гіда",
    availability: "Перевірити доступність",
  },
} satisfies Record<Locale, Record<string, string>>;

const categories: UsefulPlaceMapCategory[] = [
  category("beaches", ["beach"], "Beaches", "Plages", "Spiagge", "Пляжі"),
  category("markets", ["market"], "Markets", "Marches", "Mercati", "Ринки"),
  category("supermarkets", ["supermarket"], "Supermarkets", "Supermarches", "Supermercati", "Супермаркети"),
  category("restaurants", ["restaurant"], "Restaurants", "Restaurants", "Ristoranti", "Ресторани"),
  category("bars", ["bar", "wine-bar", "winery", "rooftop"], "Bars & wine", "Bars et vins", "Bar e vino", "Бари й вино"),
  category("ice-cream", ["ice-cream"], "Ice cream", "Glaciers", "Gelaterie", "Морозиво"),
  category("museums", ["museum"], "Museums", "Musees", "Musei", "Музеї"),
  category("cinemas", ["cinema"], "Cinemas", "Cinemas", "Cinema", "Кінотеатри"),
  category("theatres", ["theatre"], "Theatres", "Theatres", "Teatri", "Театри"),
  category("gardens", ["garden"], "Gardens", "Jardins", "Giardini", "Сади"),
  category("viewpoints", ["viewpoint", "mountain"], "Viewpoints", "Points de vue", "Panorami", "Оглядові місця"),
  category("ports", ["port"], "Ports", "Ports", "Porti", "Порти"),
  category("golf", ["golf-course"], "Golf", "Golf", "Golf", "Гольф"),
  category("ski", ["ski-resort"], "Ski", "Ski", "Sci", "Лижі"),
  category("services", ["tourist-office", "healthcare", "hospital", "police", "civic", "shopping-centre"], "Services", "Services", "Servizi", "Сервіси"),
];

function category(id: string, placeTypes: PlaceType[], en: string, fr: string, it: string, uk: string): UsefulPlaceMapCategory {
  return { id, placeTypes, label: { en, fr, it, uk } };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = copy[safeLocale];

  return createMetadata({ locale: safeLocale, path: "map", title: labels.seoTitle, description: labels.description, image: "/images/guide/menton-without-a-car.jpg" });
}

export default async function UsefulPlacesMapPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = copy[locale];
  const pageUrl = absoluteUrl(localizedPath(locale, "map"));
  const categoryTypes = new Set(categories.flatMap((item) => item.placeTypes));
  const mapPointByPlaceId = new Map(placeMapPoints.map((point) => [point.placeId, point]));
  const usefulPlaces = places
    .filter((place) => categoryTypes.has(place.type))
    .filter((place) => place.relatedArticleIds.length > 0)
    .map((place) => {
      const mapPoint = mapPointByPlaceId.get(place.id);
      return mapPoint ? { ...place, mapPoint } : null;
    })
    .filter((place): place is NonNullable<typeof place> => Boolean(place))
    .sort((a, b) => b.relatedArticleIds.length - a.relatedArticleIds.length || a.name.localeCompare(b.name));

  return (
    <>
      <JsonLdScript data={collectionPageJsonLd({ name: labels.title, description: labels.description, url: pageUrl, locale })} />
      <JsonLdScript
        data={itemListJsonLd({
          name: labels.title,
          description: labels.description,
          url: pageUrl,
          items: usefulPlaces.slice(0, 60).map((place) => ({
            name: place.name,
            description: place.shortNote[locale],
            url: absoluteUrl(localizedPath(locale, `guide/${place.relatedArticleIds[0] ?? ""}`)),
            image: place.image ? absoluteUrl(place.image) : undefined,
          })),
        })}
      />

      <Section className="!py-8 border-b border-[#dfd2b8] bg-[#f8f3ea] sm:!py-10">
        <Container>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">{labels.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl serif-heading text-4xl leading-[0.96] text-[#173f36] sm:text-5xl">{labels.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5c5044]">{labels.intro}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={`/${locale}/guide` as Route}>{labels.guide}</Link>
            <Link className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]" href={`/${locale}/check-availability` as Route}>{labels.availability}</Link>
          </div>
        </Container>
      </Section>

      <Section className="!py-6 bg-[#fffaf0] sm:!py-8">
        <Container>
          <UsefulPlacesMap locale={locale} places={usefulPlaces} categories={categories} />
        </Container>
      </Section>
    </>
  );
}
