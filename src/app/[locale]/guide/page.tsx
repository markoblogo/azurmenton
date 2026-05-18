import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { GuideExplorer } from "@/components/guide/GuideExplorer";
import { GuideVisual } from "@/components/guide/GuideVisual";
import { PlaceCard } from "@/components/guide/PlaceCard";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { guideArticles, guideLanding, localizeGuideArticle } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { isLocale, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

const labels = {
  en: {
    usefulPlaces: "Useful places in Menton",
    usefulIntro: "Addresses and local stops to help you plan food, walks, beaches and easy evenings. Check current hours before relying on a visit.",
    eventsTitle: "Planning around an event?",
    eventsText: "Menton and the nearby Riviera have a busy calendar, from the Lemon Festival and summer music to Monaco weekends and Nice events.",
    eventsCta: "View events calendar",
    apartmentsTitle: "Where to stay for guide trips",
    apartmentsText: "Choose a central seaside base, then shape each day around beaches, markets, old-town walks and Riviera day trips.",
    viewApartments: "View apartments",
    checkAvailability: "Check availability",
  },
  fr: {
    usefulPlaces: "Adresses utiles a Menton",
    usefulIntro: "Lieux pratiques pour organiser cuisine, balades, plages et soirees faciles. Verifiez les horaires actuels avant de vous deplacer.",
    eventsTitle: "Vous venez pour un evenement?",
    eventsText: "Menton et la Riviera voisine ont un calendrier anime, de la Fete du Citron aux concerts d'ete, week-ends a Monaco et evenements a Nice.",
    eventsCta: "Voir le calendrier des evenements",
    apartmentsTitle: "Ou sejourner pour explorer",
    apartmentsText: "Choisissez une base centrale en bord de mer, puis organisez vos journees entre plages, marches, vieille ville et excursions.",
    viewApartments: "Voir les appartements",
    checkAvailability: "Verifier disponibilite",
  },
  it: {
    usefulPlaces: "Luoghi utili a Mentone",
    usefulIntro: "Indirizzi e tappe locali per organizzare cibo, passeggiate, spiagge e serate semplici. Controlla gli orari aggiornati prima della visita.",
    eventsTitle: "Stai pianificando per un evento?",
    eventsText: "Mentone e la Riviera vicina hanno un calendario vivace: Festa del Limone, musica estiva, weekend a Monaco ed eventi a Nizza.",
    eventsCta: "Vedi calendario eventi",
    apartmentsTitle: "Dove soggiornare per esplorare",
    apartmentsText: "Scegli una base centrale sul mare, poi organizza le giornate tra spiagge, mercati, centro storico e gite.",
    viewApartments: "Vedi appartamenti",
    checkAvailability: "Controlla disponibilita",
  },
  uk: {
    usefulPlaces: "Корисні місця в Ментоні",
    usefulIntro: "Адреси й локальні зупинки для їжі, прогулянок, пляжів і спокійних вечорів. Перед візитом перевіряйте актуальні години роботи.",
    eventsTitle: "Плануєте поїздку навколо події?",
    eventsText: "У Ментоні та на сусідній Рив'єрі насичений календар: Фестиваль лимонів, літня музика, вікенди в Монако та події в Ніцці.",
    eventsCta: "Переглянути календар подій",
    apartmentsTitle: "Де зупинитися для прогулянок і поїздок",
    apartmentsText: "Оберіть центральну базу біля моря, а дні плануйте навколо пляжів, ринків, старого міста й поїздок Рив'єрою.",
    viewApartments: "Переглянути апартаменти",
    checkAvailability: "Перевірити доступність",
  },
};

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = guideLanding[safeLocale];

  return createMetadata({ locale: safeLocale, path: "guide", title: copy.seoTitle, description: copy.seoDescription });
}

export default async function GuideLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = guideLanding[safeLocale];
  const local = labels[safeLocale];
  const pageUrl = absoluteUrl(localizedPath(safeLocale, "guide"));
  const articles = guideArticles.map((article) => {
    const localized = localizeGuideArticle(article, safeLocale);
    const relatedPlaces = getPlaces(article.relatedPlaces ?? []);
    return {
      slug: localized.slug,
      title: localized.title,
      excerpt: localized.excerpt,
      category: article.category,
      categoryLabel: localized.categoryLabel,
      tags: localized.tags,
      bestFor: localized.bestFor,
      duration: article.duration,
      durationLabel: localized.durationLabel,
      locationTags: article.locationTags,
      placeNames: relatedPlaces.map((place) => place.name),
      featured: article.featured,
      coverImage: localized.coverImage,
      coverImageAlt: localized.coverImageAlt,
      visualTheme: localized.visualTheme,
      visualStatus: localized.visualStatus,
    };
  });
  const usefulPlaces = getPlaces([
    "halles-du-marche",
    "plage-sablettes",
    "rampes-saint-michel",
    "promenade-du-soleil",
    "jardin-val-rahmeh",
    "port-de-garavan",
  ]);
  const featuredPriority = ["menton-without-a-car", "best-beaches-in-menton", "local-food-menton", "menton-one-day-itinerary"];
  const featuredArticles = guideArticles
    .filter((article) => article.featured)
    .sort((a, b) => {
      const aIndex = featuredPriority.indexOf(a.slug);
      const bIndex = featuredPriority.indexOf(b.slug);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    })
    .slice(0, 4);

  return (
    <>
      <JsonLdScript data={collectionPageJsonLd({ name: copy.title, description: copy.seoDescription, url: pageUrl, locale: safeLocale })} />
      <JsonLdScript
        data={itemListJsonLd({
          name: copy.title,
          description: copy.seoDescription,
          url: pageUrl,
          items: articles.map((article) => ({
            name: article.title,
            description: article.excerpt,
            url: absoluteUrl(localizedPath(safeLocale, `guide/${article.slug}`)),
            image: article.coverImage ? absoluteUrl(article.coverImage) : undefined,
          })),
        })}
      />
      <section className="border-b border-[#dfd2b8] bg-[#f8f3ea] py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.78fr] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">Azur Menton guide</p>
              <h1 className="mt-5 max-w-4xl serif-heading text-5xl leading-[0.95] text-[#173f36] sm:text-6xl lg:text-7xl">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5c5044]">{copy.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="inline-flex min-h-11 items-center border border-[#173f36] bg-[#173f36] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]" href={`/${safeLocale}/apartments` as Route}>{copy.cta.primaryLabel}</Link>
                <Link className="inline-flex min-h-11 items-center border border-[#c6a66a] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={`/${safeLocale}/check-availability` as Route}>{copy.cta.secondaryLabel}</Link>
              </div>
            </div>
            <div className="border border-[#dfd2b8] bg-[#fffaf0] p-4">
              <div className="grid grid-cols-2 gap-3">
                {featuredArticles.map((article) => {
                  const localized = localizeGuideArticle(article, safeLocale);
                  return (
                    <Link key={article.slug} href={`/${safeLocale}/guide/${article.slug}` as Route} className="group overflow-hidden border border-[#dfd2b8] bg-[#fffaf0] transition hover:border-[#173f36]">
                      <GuideVisual
                        image={localized.coverImage}
                        imageAlt={localized.coverImageAlt}
                        locale={safeLocale}
                        theme={localized.visualTheme ?? "sea"}
                        label={localized.categoryLabel}
                        className="aspect-[4/2.05]"
                      />
                      <div className="p-3.5">
                        <h2 className="serif-heading text-lg leading-[1.05] text-[#173f36] transition-colors group-hover:text-[#0b6f8f]">{localized.title}</h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#f8f3ea] py-10 sm:py-14">
        <Container>
          <GuideExplorer locale={safeLocale} articles={articles} />
        </Container>
      </Section>

      <Section className="bg-[#fffaf0] py-10 sm:py-14">
        <Container>
          <div className="mb-6 max-w-3xl">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">Menton notes</p>
            <h2 className="mt-3 serif-heading text-4xl leading-none text-[#173f36]">{local.usefulPlaces}</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c5044]">{local.usefulIntro}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {usefulPlaces.map((place) => <PlaceCard key={place.id} place={place} locale={safeLocale} compact />)}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#173f36] py-8 text-white sm:py-10">
        <Container>
          <div className="grid gap-5 md:grid-cols-[0.78fr_1fr] md:items-center">
            <h2 className="serif-heading text-3xl leading-none sm:text-4xl">{local.eventsTitle}</h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-[#e8dcc9]">{local.eventsText}</p>
              <Link className="inline-flex shrink-0 border border-[#c6a66a] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10" href={`/${safeLocale}/events` as Route}>{local.eventsCta}</Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f8f3ea] py-10 sm:py-12">
        <Container>
          <div className="mb-6 max-w-3xl">
            <h2 className="serif-heading text-4xl leading-none text-[#173f36]">{local.apartmentsTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c5044]">{local.apartmentsText}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {apartments.map((apartment) => <ApartmentCard key={apartment.slug} apartment={apartment} locale={safeLocale} compact />)}
          </div>
        </Container>
      </Section>
    </>
  );
}
