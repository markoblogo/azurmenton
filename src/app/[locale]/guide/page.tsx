import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { GuideCollections } from "@/components/guide/GuideCollections";
import { GuideExplorer } from "@/components/guide/GuideExplorer";
import { GuideVisual } from "@/components/guide/GuideVisual";
import { UsefulPlacesMiniMapPreview } from "@/components/places/UsefulPlacesMiniMapPreview";
import { TransportHelperBlock } from "@/components/transport/TransportHelperBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { contentCollections, isContentCollectionId, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { guideArticles, guideLanding, localizeGuideArticle } from "@/content/guide";
import { placeMapPoints } from "@/content/planning/place-map-points";
import { getPlaces, places } from "@/content/places";
import { isLocale, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

const labels = {
  en: {
    usefulPlaces: "Useful places in Menton",
    usefulIntro: "A real map for beaches, markets, gardens, viewpoints, family stops and practical errands.",
    mapTitle: "Open the useful places map",
    mapText: "Filter mapped places from the guide and open live routes in Google Maps.",
    collectionsEyebrow: "Browse by interest",
    collectionsTitle: "A compact catalogue for Menton days",
    collectionsIntro: "Choose a subject, then use Guide Finder to explore the matching articles without leaving the page.",
    eventsTitle: "Planning around an event?",
    eventsText: "Menton and the nearby Riviera have a busy calendar, from the Lemon Festival and summer music to Monaco weekends and Nice events.",
    eventsNote: "Seasonal events, confirmed dates and planning pages",
    eventsCta: "View events calendar",
    mapCta: "Open useful places map",
    transportTitle: "Easy routes from Menton",
    transportText: "Open train, bus and station links for common Riviera routes.",
    hostEyebrow: "For current and future guests",
    hostTitle: "Local planning, tied to real stays",
    hostText:
      "Use the guide to choose beaches, day trips, restaurants, events and the right apartment base. If you are planning a stay, send your dates and we will help match the trip to the apartment that fits best.",
    statGuides: "Local guides",
    statPlaces: "Useful places",
    statCollections: "Guide collections",
    statApartments: "Apartments",
    apartmentsTitle: "Where to stay for guide trips",
    apartmentsText: "Choose a central seaside base, then shape each day around beaches, markets, old-town walks and Riviera day trips.",
    viewApartments: "View apartments",
    checkAvailability: "Check availability",
  },
  fr: {
    usefulPlaces: "Adresses utiles a Menton",
    usefulIntro: "Une vraie carte pour plages, marches, jardins, points de vue, famille et adresses pratiques.",
    mapTitle: "Ouvrir la carte des lieux utiles",
    mapText: "Filtrez les lieux du guide et ouvrez les itineraire actuels dans Google Maps.",
    collectionsEyebrow: "Explorer par sujet",
    collectionsTitle: "Un catalogue compact pour vos journees a Menton",
    collectionsIntro: "Choisissez un sujet, puis utilisez Guide Finder pour parcourir les articles correspondants sans quitter la page.",
    eventsTitle: "Vous venez pour un evenement?",
    eventsText: "Menton et la Riviera voisine ont un calendrier anime, de la Fete du Citron aux concerts d'ete, week-ends a Monaco et evenements a Nice.",
    eventsNote: "Evenements saisonniers, dates confirmees et pages de preparation",
    eventsCta: "Voir le calendrier des evenements",
    mapCta: "Ouvrir la carte des lieux utiles",
    transportTitle: "Trajets faciles depuis Menton",
    transportText: "Ouvrir les liens train, bus et gare pour les trajets Riviera utiles.",
    hostEyebrow: "Pour les voyageurs actuels et futurs",
    hostTitle: "Conseils locaux relies a un vrai sejour",
    hostText:
      "Utilisez le guide pour choisir plages, excursions, restaurants, evenements et la bonne base d'appartement. Si vous preparez un sejour, envoyez vos dates et nous vous aiderons a choisir l'appartement le plus adapte.",
    statGuides: "Guides locaux",
    statPlaces: "Lieux utiles",
    statCollections: "Collections de guides",
    statApartments: "Appartements",
    apartmentsTitle: "Ou sejourner pour explorer",
    apartmentsText: "Choisissez une base centrale en bord de mer, puis organisez vos journees entre plages, marches, vieille ville et excursions.",
    viewApartments: "Voir les appartements",
    checkAvailability: "Verifier disponibilite",
  },
  it: {
    usefulPlaces: "Luoghi utili a Mentone",
    usefulIntro: "Una vera mappa per spiagge, mercati, giardini, panorami, famiglia e indirizzi pratici.",
    mapTitle: "Apri la mappa dei luoghi utili",
    mapText: "Filtra i luoghi della guida e apri percorsi aggiornati in Google Maps.",
    collectionsEyebrow: "Esplora per interesse",
    collectionsTitle: "Un catalogo compatto per le giornate a Mentone",
    collectionsIntro: "Scegli un argomento, poi usa Guide Finder per esplorare gli articoli corrispondenti senza lasciare la pagina.",
    eventsTitle: "Stai pianificando per un evento?",
    eventsText: "Mentone e la Riviera vicina hanno un calendario vivace: Festa del Limone, musica estiva, weekend a Monaco ed eventi a Nizza.",
    eventsNote: "Eventi stagionali, date confermate e pagine pratiche",
    eventsCta: "Vedi calendario eventi",
    mapCta: "Apri mappa dei luoghi utili",
    transportTitle: "Percorsi facili da Mentone",
    transportText: "Apri link treno, bus e stazione per le rotte utili della Riviera.",
    hostEyebrow: "Per ospiti attuali e futuri",
    hostTitle: "Consigli locali collegati a soggiorni reali",
    hostText:
      "Usa la guida per scegliere spiagge, gite, ristoranti, eventi e la base giusta. Se stai pianificando un soggiorno, inviaci le date e ti aiuteremo a scegliere l'appartamento piu adatto.",
    statGuides: "Guide locali",
    statPlaces: "Luoghi utili",
    statCollections: "Raccolte di guide",
    statApartments: "Appartamenti",
    apartmentsTitle: "Dove soggiornare per esplorare",
    apartmentsText: "Scegli una base centrale sul mare, poi organizza le giornate tra spiagge, mercati, centro storico e gite.",
    viewApartments: "Vedi appartamenti",
    checkAvailability: "Controlla disponibilita",
  },
  uk: {
    usefulPlaces: "Корисні місця в Ментоні",
    usefulIntro: "Справжня карта для пляжів, ринків, садів, краєвидів, сімейних місць і практичних адрес.",
    mapTitle: "Відкрити карту корисних місць",
    mapText: "Фільтруйте місця з гіда й відкривайте актуальні маршрути в Google Maps.",
    collectionsEyebrow: "Перегляд за інтересами",
    collectionsTitle: "Компактний каталог для днів у Ментоні",
    collectionsIntro: "Оберіть тему, а потім скористайтеся Guide Finder, щоб переглянути відповідні статті, не залишаючи сторінку.",
    eventsTitle: "Плануєте поїздку навколо події?",
    eventsText: "У Ментоні та на сусідній Рив'єрі насичений календар: Фестиваль лимонів, літня музика, вікенди в Монако та події в Ніцці.",
    eventsNote: "Сезонні події, підтверджені дати й сторінки планування",
    eventsCta: "Переглянути календар подій",
    mapCta: "Відкрити карту корисних місць",
    transportTitle: "Зручні маршрути з Ментона",
    transportText: "Відкрийте посилання на потяги, автобуси й станції для маршрутів Рив'єрою.",
    hostEyebrow: "Для нинішніх і майбутніх гостей",
    hostTitle: "Локальне планування, пов'язане з реальним проживанням",
    hostText:
      "Використовуйте гід, щоб обрати пляжі, поїздки, ресторани, події та правильну базу для проживання. Якщо плануєте зупинку, надішліть дати, і ми допоможемо підібрати апартамент під сценарій поїздки.",
    statGuides: "Локальні гіди",
    statPlaces: "Корисні місця",
    statCollections: "Добірки гідів",
    statApartments: "Апартаменти",
    apartmentsTitle: "Де зупинитися для прогулянок і поїздок",
    apartmentsText: "Оберіть центральну базу біля моря, а дні плануйте навколо пляжів, ринків, старого міста й поїздок Рив'єрою.",
    viewApartments: "Переглянути апартаменти",
    checkAvailability: "Перевірити доступність",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ collection?: string | string[] }>;
};

export async function generateMetadata({ params }: Pick<PageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = guideLanding[safeLocale];

  return createMetadata({ locale: safeLocale, path: "guide", title: copy.seoTitle, description: copy.seoDescription });
}

export default async function GuideLandingPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = guideLanding[safeLocale];
  const local = labels[safeLocale];
  const query = await searchParams;
  const collectionQuery = typeof query.collection === "string" ? query.collection : undefined;
  const selectedCollection = isContentCollectionId(collectionQuery) ? contentCollections.find((collection) => collection.id === collectionQuery) : undefined;
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
  const mapPointByPlaceId = new Map(placeMapPoints.map((point) => [point.placeId, point]));
  const mapPreviewPlaces = getPlaces([
    "plage-sablettes",
    "plage-casino",
    "plage-fossan",
    "plage-rondelli",
    "rondelli-garavan-side",
    "borrigo-beaches",
    "halles-du-marche",
    "u-express-menton-centre",
    "carrefour-city-felix-faure",
    "gelateria-sofia-menton",
    "demontis-gelateria-menton",
    "tutti-frutti-menton",
    "biera-daqui",
    "inky-bar",
  ])
    .map((place) => {
      const mapPoint = mapPointByPlaceId.get(place.id);
      return mapPoint ? { ...place, mapPoint } : null;
    })
    .filter((place): place is NonNullable<typeof place> => Boolean(place));
  const featuredPriority = seasonalGuideSlugs();
  const featuredArticles = guideArticles
    .filter((article) => featuredPriority.includes(article.slug) || article.featured)
    .sort((a, b) => {
      const aIndex = featuredPriority.indexOf(a.slug);
      const bIndex = featuredPriority.indexOf(b.slug);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    })
    .slice(0, 4);
  const collectionCards = contentCollections.map((collection) => {
    const guideSlugs = resolveContentCollectionGuideSlugs(collection, guideArticles);
    const leadGuide = guideArticles.find((article) => article.slug === guideSlugs[0]);
    const localizedLeadGuide = leadGuide ? localizeGuideArticle(leadGuide, safeLocale) : undefined;
    return {
      id: collection.id,
      title: collection.title[safeLocale],
      description: collection.description[safeLocale],
      guideCount: guideSlugs.length,
      leadGuide: localizedLeadGuide ? {
        coverImage: localizedLeadGuide.coverImage,
        coverImageAlt: localizedLeadGuide.coverImageAlt,
        visualTheme: localizedLeadGuide.visualTheme,
      } : undefined,
    };
  });
  const numberFormatter = new Intl.NumberFormat(safeLocale);
  const guideStats = [
    { value: guideArticles.length, label: local.statGuides },
    { value: places.length, label: local.statPlaces },
    { value: contentCollections.length, label: local.statCollections },
    { value: apartments.length, label: local.statApartments },
  ];

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
      <section className="border-b border-[#dfd2b8] bg-[#f8f3ea] py-10 sm:py-14">
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
              <aside className="mt-8 border-y border-[#dfd2b8] py-5" aria-label={local.hostTitle}>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{local.hostEyebrow}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-4">
                  {guideStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="serif-heading text-3xl leading-none text-[#173f36]">{numberFormatter.format(stat.value)}</p>
                      <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#6f665a]">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <h2 className="mt-4 serif-heading text-2xl leading-tight text-[#173f36]">{local.hostTitle}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5c5044]">{local.hostText}</p>
              </aside>
            </div>
            <div className="border border-[#dfd2b8] bg-[#fffaf0] p-3">
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
                        className="aspect-[4/2.25]"
                        showLabel={false}
                      />
                      <div className="p-3">
                        <h2 className="serif-heading text-base leading-[1.08] text-[#173f36] transition-colors group-hover:text-[#0b6f8f]">{localized.title}</h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="!py-2 bg-[#f8f3ea] sm:!py-3">
        <Container>
          <GuideExplorer
            key={selectedCollection?.id ?? "all-guides"}
            locale={safeLocale}
            articles={articles}
            initialCollection={selectedCollection ? {
              title: selectedCollection.title[safeLocale],
              articleSlugs: resolveContentCollectionGuideSlugs(selectedCollection, guideArticles),
            } : undefined}
          />
        </Container>
      </Section>

      <Section className="!py-4 bg-[#fffaf0] sm:!py-5">
        <Container>
          <div className="mb-4 grid gap-4 md:grid-cols-[0.42fr_1fr] md:items-end">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{local.collectionsEyebrow}</p>
              <h2 className="mt-2 serif-heading text-3xl leading-none text-[#173f36]">{local.collectionsTitle}</h2>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-[#5c5044]">{local.collectionsIntro}</p>
          </div>
          <GuideCollections locale={safeLocale} collections={collectionCards} />
        </Container>
      </Section>

      <Section className="!py-3 bg-[#173f36] text-white sm:!py-4">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[0.45fr_1fr] lg:items-center">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#c6a66a]">Menton map</p>
              <h2 className="mt-2 serif-heading text-3xl leading-none">{local.mapTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#e8dcc9]">{local.mapText}</p>
              <Link className="mt-4 inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10" href={`/${safeLocale}/map` as Route}>{local.mapCta}</Link>
            </div>
            <UsefulPlacesMiniMapPreview locale={safeLocale} places={mapPreviewPlaces} />
          </div>
        </Container>
      </Section>

      <Section className="!py-4 bg-[#f8f3ea] sm:!py-5">
        <Container>
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{local.transportTitle}</p>
              <h2 className="mt-2 serif-heading text-3xl leading-none text-[#173f36]">{local.transportText}</h2>
            </div>
          </div>
          <TransportHelperBlock locale={safeLocale} compact />
        </Container>
      </Section>

      <Section className="!py-5 bg-[#173f36] text-white sm:!py-6">
        <Container>
          <div className="grid gap-5 md:grid-cols-[0.55fr_1fr_auto] md:items-center">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#c6a66a]">{local.eventsNote}</p>
              <h2 className="mt-2 serif-heading text-3xl leading-none sm:text-4xl">{local.eventsTitle}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[#e8dcc9]">{local.eventsText}</p>
            <div>
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

function seasonalGuideSlugs() {
  const month = new Date().getMonth() + 1;

  if (month >= 6 && month <= 9) {
    return ["stay-cool-in-menton-summer", "best-beaches-in-menton", "best-ice-cream-menton", "menton-without-a-car"];
  }

  if (month >= 10 && month <= 11) {
    return ["menton-in-autumn", "best-walks-and-hikes-around-menton", "museums-in-menton-nice-monaco", "day-trips-from-menton"];
  }

  if (month === 12 || month <= 2) {
    return ["fete-du-citron-menton-practical-guide", "winter-events-near-menton", "museums-in-menton-nice-monaco", "mountains-snow-skiing-near-menton"];
  }

  return ["menton-without-a-car", "day-trips-from-menton", "local-food-menton", "where-to-stay-in-menton"];
}
