import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { HeroImageSlides } from "@/components/home/HeroImageSlides";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { apartments } from "@/content/apartments";
import { guidePages } from "@/content/guide";
import { faqItems, homeCopy } from "@/content/pages";
import { t } from "@/content/translations";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";
import { lodgingBusinessJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const sectionCopy = {
  en: {
    apartmentEyebrow: "Azur Menton collection",
    apartmentTitle: "Three beachfront stays in central Menton",
    apartmentIntro:
      "Each apartment offers a different way to experience Menton — from panoramic sea-view studios to a larger terrace apartment near the beach, all within walking distance of the seafront, cafés and the old town.",
    directTitle: "Why book direct",
    directIntro:
      "Direct requests keep the conversation personal. Tell us your dates and we will confirm availability and the best direct offer ourselves.",
    directPoints: [
      "Direct communication with a family-run host",
      "Best available direct offer",
      "Local recommendations before and during your stay",
      "Simple request-to-book process",
      "No platform service fee on direct requests",
    ],
    mentonTitle: "Why Menton",
    mentonIntro:
      "A Riviera town for slow mornings by the water, colourful streets, easy train days and evenings along the promenade.",
    guideTitle: "Plan your stay in Menton",
    guideIntro: "A practical guide to beaches, old town walks, day trips and event periods.",
    guideCta: "Explore the Menton guide",
    eventsTitle: "Visiting for Lemon Festival or a Riviera weekend?",
    eventsIntro:
      "Menton's Lemon Festival, summer evenings and major Riviera weekends can make beachside apartments especially attractive. Check your dates early.",
    eventsCta: "View events",
    faqTitle: "Questions before you request?",
    faqIntro: "A few practical answers before you send dates.",
    faqCta: "Read FAQ",
    finalTitle: "Tell us your dates and we'll confirm availability directly.",
    finalIntro:
      "This is a direct booking request, not instant confirmation. We will reply with availability and the best direct offer shortly.",
  },
  fr: {
    apartmentEyebrow: "Collection Azur Menton",
    apartmentTitle: "Trois séjours en bord de mer au centre de Menton",
    apartmentIntro:
      "Chaque appartement propose une façon différente de vivre Menton — des studios avec vue panoramique sur la mer à un appartement plus spacieux avec terrasse près de la plage, tous à distance de marche du front de mer, des cafés et de la vieille ville.",
    directTitle: "Pourquoi reserver en direct",
    directIntro:
      "La demande directe garde l'echange simple et personnel. Envoyez vos dates, nous verifierons la disponibilite et la meilleure offre directe.",
    directPoints: [
      "Echange direct avec un hote familial",
      "Meilleure offre directe disponible",
      "Recommandations locales avant et pendant le sejour",
      "Processus simple de demande de reservation",
      "Pas de frais de service de plateforme sur les demandes directes",
    ],
    mentonTitle: "Pourquoi Menton",
    mentonIntro:
      "Une ville de Riviera pour les matins au bord de l'eau, les rues colorees, les escapades faciles et les soirees sur la promenade.",
    guideTitle: "Preparer votre sejour a Menton",
    guideIntro: "Un guide pratique des plages, de la vieille ville, des excursions et des periodes d'evenements.",
    guideCta: "Explorer le guide de Menton",
    eventsTitle: "Vous venez pour la Fete du Citron ou un week-end Riviera ?",
    eventsIntro:
      "La Fete du Citron, les soirees d'ete et les grands week-ends de la Riviera rendent les appartements proches de la mer particulierement recherches. Demandez vos dates tot.",
    eventsCta: "Voir les evenements",
    faqTitle: "Des questions avant de demander ?",
    faqIntro: "Quelques reponses pratiques avant d'envoyer vos dates.",
    faqCta: "Lire la FAQ",
    finalTitle: "Envoyez vos dates, nous confirmerons la disponibilite directement.",
    finalIntro:
      "Il s'agit d'une demande de reservation directe, pas d'une confirmation instantanee. Nous repondrons avec la disponibilite et la meilleure offre directe.",
  },
  it: {
    apartmentEyebrow: "Collezione Azur Menton",
    apartmentTitle: "Tre soggiorni fronte mare nel centro di Mentone",
    apartmentIntro:
      "Ogni appartamento offre un modo diverso di vivere Mentone — dai monolocali con vista panoramica sul mare a un appartamento più ampio con terrazza vicino alla spiaggia, tutti a pochi passi dal lungomare, dai caffè e dal centro storico.",
    directTitle: "Perche prenotare in diretto",
    directIntro:
      "La richiesta diretta mantiene il contatto personale. Inviaci le date e confermeremo disponibilita e migliore offerta diretta.",
    directPoints: [
      "Comunicazione diretta con un host familiare",
      "Migliore offerta diretta disponibile",
      "Consigli locali prima e durante il soggiorno",
      "Processo semplice di richiesta prenotazione",
      "Nessun costo di servizio piattaforma sulle richieste dirette",
    ],
    mentonTitle: "Perche Mentone",
    mentonIntro:
      "Una cittadina di Riviera per mattine sul mare, strade colorate, gite facili e passeggiate serali sul lungomare.",
    guideTitle: "Organizza il tuo soggiorno a Mentone",
    guideIntro: "Una guida pratica a spiagge, centro storico, gite ed eventi stagionali.",
    guideCta: "Esplora la guida di Mentone",
    eventsTitle: "Arrivi per la Festa dei Limoni o un weekend in Riviera?",
    eventsIntro:
      "La Festa dei Limoni, le serate estive e i grandi weekend della Riviera rendono gli appartamenti vicino al mare particolarmente richiesti. Controlla le date in anticipo.",
    eventsCta: "Vedi eventi",
    faqTitle: "Domande prima della richiesta?",
    faqIntro: "Alcune risposte pratiche prima di inviare le date.",
    faqCta: "Leggi FAQ",
    finalTitle: "Inviaci le date e confermeremo direttamente la disponibilita.",
    finalIntro:
      "E una richiesta diretta, non una conferma immediata. Risponderemo con disponibilita e migliore offerta diretta.",
  },
  uk: {
    apartmentEyebrow: "Колекція Azur Menton",
    apartmentTitle: "Три варіанти проживання біля моря в центрі Ментона",
    apartmentIntro:
      "Кожні апартаменти відкривають Ментон по-своєму — від студій із панорамним видом на море до просторішої квартири з терасою поруч із пляжем; усі розташовані на пішій відстані від набережної, кав’ярень і старого міста.",
    directTitle: "Чому варто звернутися напряму",
    directIntro:
      "Прямий запит зберігає спілкування особистим. Надішліть дати, і ми вручну підтвердимо доступність та найкращу пряму пропозицію.",
    directPoints: [
      "Пряме спілкування з сімейним господарем",
      "Найкраща доступна пряма пропозиція",
      "Локальні рекомендації до та під час перебування",
      "Простий процес запиту на бронювання",
      "Без сервісного збору платформи для прямих запитів",
    ],
    mentonTitle: "Чому Ментон",
    mentonIntro:
      "Місто Рив'єри для ранків біля води, кольорових вулиць, легких поїздок і вечорів на набережній.",
    guideTitle: "Сплануйте перебування в Ментоні",
    guideIntro: "Практичний гід пляжами, старим містом, денними поїздками та подіями.",
    guideCta: "Відкрити гід Ментона",
    eventsTitle: "Приїжджаєте на Фестиваль лимонів або вікенд на Рив'єрі?",
    eventsIntro:
      "Фестиваль лимонів, літні вечори та великі події Рив'єри роблять апартаменти біля моря особливо бажаними. Запитуйте дати заздалегідь.",
    eventsCta: "Переглянути події",
    faqTitle: "Є питання перед запитом?",
    faqIntro: "Кілька практичних відповідей перед тим, як надіслати дати.",
    faqCta: "Читати FAQ",
    finalTitle: "Надішліть дати, і ми напряму підтвердимо доступність.",
    finalIntro:
      "Це прямий запит на бронювання, не миттєве підтвердження. Ми відповімо з доступністю та найкращою прямою пропозицією.",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const guideTeaserLabels: Record<Locale, Record<string, string>> = {
  en: {
    "best-beaches-in-menton": "Beaches",
    "menton-old-town": "Old town",
    "day-trips-from-menton": "Day trips",
    "../events": "Riviera calendar",
  },
  fr: {
    "best-beaches-in-menton": "Plages",
    "menton-old-town": "Vieille ville",
    "day-trips-from-menton": "Excursions",
    "../events": "Calendrier Riviera",
  },
  it: {
    "best-beaches-in-menton": "Spiagge",
    "menton-old-town": "Centro storico",
    "day-trips-from-menton": "Gite",
    "../events": "Calendario Riviera",
  },
  uk: {
    "best-beaches-in-menton": "Пляжі",
    "menton-old-town": "Старе місто",
    "day-trips-from-menton": "Поїздки",
    "../events": "Календар Рив'єри",
  },
};

const guideTeaserImages: Record<string, { src: string; alt: string }> = {
  "best-beaches-in-menton": {
    src: "/images/guide/best-beaches-in-menton.png",
    alt: "Illustration of Menton beaches and the Mediterranean",
  },
  "menton-old-town": {
    src: "/images/guide/menton-old-town.png",
    alt: "Illustration of colourful old town streets in Menton",
  },
  "day-trips-from-menton": {
    src: "/images/guide/day-trips-from-menton.png",
    alt: "Illustration of Riviera day trips from Menton",
  },
  "../events": {
    src: "/images/events/menton-lemon-festival.png",
    alt: "Illustration of Menton Lemon Festival and Riviera events",
  },
};

const heroMainSlides = [
  { src: "/images/home/SeaViewBalconyStudio.png", objectPosition: "50% 50%" },
  { src: "/images/home/TerraceParkingApartment.png", objectPosition: "50% 50%" },
  { src: "/images/home/BeachfrontStudio-portret.png", objectPosition: "50% 50%" },
];

const heroInsetSlides = [
  { src: "/images/apartments/sea-view-balcony-studio/02-living-room-balcony-view.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/sea-view-balcony-studio/03-open-plan-studio-layout.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/sea-view-balcony-studio/04-bedroom-balcony-view.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/sea-view-balcony-studio/07-sofa-seating-area.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/sea-view-balcony-studio/11-balcony-sea-view.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/beachside-family-apartment/02-living-room-terrace-access.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/beachside-family-apartment/03-comfortable-bedroom.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/beachside-family-apartment/04-dining-area-equipped-kitchen.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/beachside-family-apartment/05-living-room-sofa-bed.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/beachside-family-apartment/21-living-room-tv-terrace.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/panoramic-sea-view-studio/02-balcony-harbour-view.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/panoramic-sea-view-studio/03-balcony-seafront-view.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/panoramic-sea-view-studio/04-kitchenette-dining-corner.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/panoramic-sea-view-studio/06-bright-studio-double-bed.png", objectPosition: "50% 50%" },
  { src: "/images/apartments/panoramic-sea-view-studio/16-living-room-sea-view.png", objectPosition: "50% 50%" },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    title: homeCopy[safeLocale].seoTitle,
    description: homeCopy[safeLocale].seoDescription,
  });
}

export default async function LocaleHome({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = homeCopy[safeLocale];
  const labels = t[safeLocale];
  const sections = sectionCopy[safeLocale];
  const guideTeasers = [
    guidePages[safeLocale].find((page) => page.slug === "best-beaches-in-menton"),
    guidePages[safeLocale].find((page) => page.slug === "menton-old-town"),
    guidePages[safeLocale].find((page) => page.slug === "day-trips-from-menton"),
    {
      slug: "../events",
      title: safeLocale === "en" ? "Events" : safeLocale === "fr" ? "Evenements" : safeLocale === "it" ? "Eventi" : "Події",
      intro: String(sections.eventsIntro),
      coverImage: guideTeaserImages["../events"].src,
      coverImageAlt: guideTeaserImages["../events"].alt,
      categoryLabel: guideTeaserLabels[safeLocale]["../events"],
    },
  ].flatMap((item) => (item ? [item] : []));
  const homeCardImages: Record<string, { src: string; alt: string }> = {
    "sea-view-balcony-studio": {
      src: "/images/home/SeaViewBalconyStudio.png",
      alt: "Private balcony table with coffee and Mediterranean sea view in Menton",
    },
    "beachside-family-apartment": {
      src: "/images/home/TerraceParkingApartment.png",
      alt: "Private terrace with outdoor dining table and garden view in central Menton",
    },
    "panoramic-sea-view-studio": {
      src: "/images/home/BeachfrontStudio-portret.png",
      alt: "Private balcony breakfast table with Mediterranean sea view in Menton",
    },
  };

  return (
    <>
      <JsonLdScript data={lodgingBusinessJsonLd()} />
      <section className="relative overflow-hidden border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="grid min-h-[760px] items-center gap-12 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:py-20">
            <div>
              <h1 className="serif-heading max-w-3xl text-5xl leading-[0.95] text-[#173f36] sm:text-7xl lg:text-8xl">
                {copy.title}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f574c]">{copy.intro}</p>
              <div className="mt-8 grid max-w-xl grid-cols-2 border-y border-[#dfd4c1] text-sm sm:grid-cols-4">
                {copy.proof.map((item) => (
                  <div key={item} className="border-r border-[#dfd4c1] px-3 py-4 last:border-r-0">
                    <p className="font-semibold text-[#173f36]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/apartments`}>{copy.primaryCta}</Button>
                <Button href={`/${safeLocale}/check-availability`} variant="secondary">
                  {copy.secondaryCta}
                </Button>
              </div>
            </div>
            <HeroImageSlides mainSlides={heroMainSlides} insetSlides={heroInsetSlides} />
          </div>
        </Container>
      </section>

      <Section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 border-b border-[#dfd4c1] pb-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="editorial-label">{sections.apartmentEyebrow}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {sections.apartmentTitle}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[#5f574c]">{sections.apartmentIntro}</p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <ApartmentCard
                key={apartment.slug}
                apartment={apartment}
                imageOverride={homeCardImages[apartment.slug]}
                locale={safeLocale}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#173f36] py-14 text-white sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="editorial-label">{sections.directTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight sm:text-5xl">
                {sections.finalTitle}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/70">{sections.directIntro}</p>
            </div>
            <div className="grid border border-white/15 md:grid-cols-2">
              {(sections.directPoints as string[]).map((item) => (
                <div key={item} className="border-b border-r border-white/15 p-6 last:border-b-0 md:[&:nth-child(even)]:border-r-0">
                  <p className="text-sm font-semibold leading-6 text-white/86">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <WeatherWidget locale={safeLocale} />

      <Section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative min-h-[430px] sm:min-h-[500px] lg:min-h-[560px]">
              <div className="absolute left-0 top-8 w-[66%] overflow-hidden border border-[#dfd4c1] bg-[#fffdf8] p-2">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#efe4d1]">
                  <Image
                    src="/images/guide/menton-old-town.png"
                    alt="Illustration of colourful old town streets and sea views in Menton"
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 360px, 62vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 right-0 w-[58%] overflow-hidden border border-[#dfd4c1] bg-[#fffdf8] p-2">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#efe4d1]">
                  <Image
                    src="/images/guide/best-beaches-in-menton-alt.png"
                    alt="Illustration of Menton beaches, palm trees and the Mediterranean coast"
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 320px, 56vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-[12%] hidden w-[34%] overflow-hidden border border-[#dfd4c1] bg-[#fffdf8] p-2 shadow-[0_18px_40px_rgba(39,30,18,0.08)] sm:block">
                <div className="relative aspect-[5/4] overflow-hidden bg-[#efe4d1]">
                  <Image
                    src="/images/guide/quiet-evening-in-menton.png"
                    alt="Illustration of a quiet evening walk in Menton"
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 180px, 34vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="editorial-label">{sections.mentonTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {sections.guideTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5f574c]">{sections.mentonIntro}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {guideTeasers.map((item) => {
                  const visual = guideTeaserImages[item.slug] ?? (item.coverImage ? { src: item.coverImage, alt: item.coverImageAlt ?? item.title } : undefined);
                  const href = item.slug === "../events" ? `/${safeLocale}/events` : `/${safeLocale}/guide/${item.slug}`;

                  return (
                    <Link
                      key={item.slug}
                      href={href as Route}
                      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173f36]"
                    >
                      <Card className="h-full overflow-hidden bg-[#fffdf8] transition group-hover:border-[#c6a66a]">
                        {visual ? (
                          <div className="relative aspect-[16/9] overflow-hidden border-b border-[#dfd4c1] bg-[#efe4d1]">
                            <Image
                              src={visual.src}
                              alt={visual.alt}
                              fill
                              quality={90}
                              sizes="(min-width: 1024px) 250px, (min-width: 640px) 50vw, 100vw"
                              className="object-cover transition duration-500 group-hover:scale-[1.025]"
                            />
                          </div>
                        ) : null}
                        <div className="p-4">
                          <p className="editorial-label">{guideTeaserLabels[safeLocale][item.slug] ?? item.categoryLabel}</p>
                          <h3 className="serif-heading mt-2 text-[1.35rem] leading-tight text-[#173f36]">{item.title}</h3>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5f574c]">{item.intro}</p>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-8">
                <Button href={`/${safeLocale}/guide`} variant="secondary">
                  {sections.guideCta}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-[#dfd4c1] bg-[#f6efe3] py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="editorial-label">Riviera calendar</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {sections.eventsTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5f574c]">{sections.eventsIntro}</p>
              <div className="mt-7">
                <Button href={`/${safeLocale}/events`} variant="secondary">
                  {sections.eventsCta}
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden border border-[#dfd4c1] bg-[#fffdf8] p-3">
              <Image
                src="/images/events/menton-lemon-festival.png"
                alt="Illustration of Menton Lemon Festival and Riviera events"
                width={1270}
                height={900}
                quality={90}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="editorial-label">FAQ</p>
              <h2 className="serif-heading mt-3 text-4xl text-[#173f36]">{sections.faqTitle}</h2>
              <p className="mt-3 max-w-2xl text-[#5f574c]">{sections.faqIntro}</p>
            </div>
            <Button href={`/${safeLocale}/faq`} variant="secondary">
              {sections.faqCta}
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.slice(0, 4).map((item) => (
              <Card key={item.question} className="p-6">
                <h3 className="serif-heading text-2xl text-[#173f36]">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f574c]">{item.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#111615] py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="serif-heading text-4xl leading-tight text-white sm:text-6xl">
              {sections.finalTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-white/72">{sections.finalIntro}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
              <Button href={`/${safeLocale}/apartments`} variant="secondary">
                {labels.compareApartments}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
