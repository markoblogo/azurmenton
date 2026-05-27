import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { apartments } from "@/content/apartments";
import { isLocale, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Localized = Record<Locale, string>;
const text = (en: string, fr: string, it: string, uk: string): Localized => ({ en, fr, it, uk });

const copy = {
  eyebrow: text("Azur Menton collection", "Collection Azur Menton", "Collezione Azur Menton", "Колекція Azur Menton"),
  title: text("Three beachfront stays in Menton", "Trois séjours en bord de mer à Menton", "Tre soggiorni fronte mare a Mentone", "Три варіанти проживання біля моря в Ментоні"),
  intro: text(
    "Each apartment offers a different Riviera experience — from panoramic sea-view studios to a larger terrace apartment near the Mediterranean promenade.",
    "Chaque appartement propose une expérience Riviera différente — des studios avec vue panoramique sur la mer à un appartement plus spacieux avec terrasse près de la promenade méditerranéenne.",
    "Ogni appartamento offre un’esperienza Riviera diversa — dai monolocali con vista panoramica sul mare a un appartamento più ampio con terrazza vicino alla passeggiata mediterranea.",
    "Кожні апартаменти відкривають Рив’єру по-своєму — від студій із панорамним видом на море до просторішої квартири з терасою біля середземноморської набережної.",
  ),
  note: text(
    "All apartments are located in central Menton near the seafront, beaches, cafés and Riviera day trips.",
    "Tous les appartements se trouvent dans les quartiers centraux de Menton, près du front de mer, des plages, des cafés et des excursions Riviera.",
    "Tutti gli appartamenti sono nelle zone centrali di Mentone, vicino al lungomare, alle spiagge, ai caffè e alle gite in Riviera.",
    "Усі апартаменти розташовані в центральних районах Ментона поруч із морем, пляжами, кав’ярнями та маршрутами Рив’єрою.",
  ),
  howTitle: text("How the apartments differ", "Ce qui différencie les appartements", "Come si differenziano gli appartamenti", "Чим відрізняються апартаменти"),
  howEyebrow: text("Apartment guide", "Guide des appartements", "Guida agli appartamenti", "Гід по апартаментах"),
  howIntro: text(
    "Choose by stay style first: view, space, terrace, parking or the easiest no-car seaside rhythm.",
    "Choisissez d’abord selon votre style de séjour : vue, espace, terrasse, parking ou rythme balnéaire sans voiture.",
    "Scegli prima in base allo stile di soggiorno: vista, spazio, terrazza, parcheggio o ritmo sul mare senza auto.",
    "Спершу обирайте за стилем подорожі: вид, простір, тераса, паркування або найзручніший відпочинок без авто.",
  ),
  recommendationTitle: text("Which apartment fits your stay?", "Quel appartement correspond à votre séjour ?", "Quale appartamento fa per il tuo soggiorno?", "Які апартаменти підходять саме вам?"),
  contextTitle: text("Menton as a base for the Riviera", "Menton comme base sur la Riviera", "Mentone come base per la Riviera", "Ментон як база для Рив’єри"),
  contextText: text(
    "From Menton, slow beach mornings can sit beside Monaco train days, Italian Riviera markets, old town walks and Mediterranean evenings along the promenade.",
    "Depuis Menton, les matins de plage se combinent avec les journées en train à Monaco, les marchés italiens, les balades en vieille ville et les soirées méditerranéennes sur la promenade.",
    "Da Mentone, mattine lente in spiaggia si alternano a giornate in treno a Monaco, mercati italiani, passeggiate nel centro storico e serate mediterranee sul lungomare.",
    "З Ментона легко поєднати повільні ранки на пляжі, поїздки потягом до Монако, ринки Італійської Рив’єри, старе місто й вечори на набережній.",
  ),
  finalTitle: text("Need help choosing between the apartments?", "Besoin d’aide pour choisir entre les appartements ?", "Hai bisogno di aiuto per scegliere?", "Потрібна допомога з вибором апартаментів?"),
  finalText: text(
    "Tell us your dates and we’ll recommend the best fit for your Riviera stay.",
    "Envoyez vos dates et nous vous recommanderons l’appartement le plus adapté à votre séjour Riviera.",
    "Inviaci le date e ti consiglieremo l’appartamento più adatto al tuo soggiorno in Riviera.",
    "Надішліть дати, і ми порадимо найкращий варіант для вашого перебування на Рив’єрі.",
  ),
  check: text("Check availability", "Vérifier disponibilité", "Controlla disponibilità", "Перевірити доступність"),
  contact: text("Contact us", "Nous contacter", "Contattaci", "Написати нам"),
  view: text("View apartment", "Voir l’appartement", "Vedi appartamento", "Переглянути апартаменти"),
  guideLabel: text("Menton guide", "Guide de Menton", "Guida di Mentone", "Гід Ментона"),
  eventGuide: text("Event guide", "Guide événement", "Guida evento", "Гід події"),
  eventsLabel: text("Riviera events", "Événements Riviera", "Eventi Riviera", "Події Рив’єри"),
  bestFor: text("Best for", "Idéal pour", "Ideale per", "Найкраще для"),
  highlights: text("Highlights", "Points forts", "Punti forti", "Переваги"),
  goodToKnow: text("Good to know", "À savoir", "Da sapere", "Варто знати"),
  seoTitle: text(
    "Apartments in Menton by the Sea | Azur Menton",
    "Appartements à Menton près de la mer | Azur Menton",
    "Appartamenti a Mentone vicino al mare | Azur Menton",
    "Апартаменти в Ментоні біля моря | Azur Menton",
  ),
  seoDescription: text(
    "Choose from three family-run Menton apartments: sea-view balcony studios for couples and a spacious beachside apartment with terrace and parking for families.",
    "Choisissez parmi trois appartements familiaux à Menton : studios vue mer pour couples et appartement plus spacieux avec terrasse et parking.",
    "Scegli tra tre appartamenti a gestione familiare a Mentone: monolocali vista mare per coppie e un appartamento più ampio con terrazza e parcheggio.",
    "Оберіть серед трьох сімейних апартаментів у Ментоні: студії з видом на море для пар і просторішу квартиру з терасою та паркуванням.",
  ),
};

const positioning: Record<string, { short: Localized; best: Localized; good: Localized; tags: Localized[]; compareImage: string }> = {
  "sea-view-balcony-studio": {
    short: text("Couples & beachfront mornings", "Couples & matins face à la mer", "Coppie e mattine sul mare", "Пари та ранки біля моря"),
    best: text("Couples, solo travellers and shorter Riviera stays", "Couples, voyageurs solo et courts séjours Riviera", "Coppie, viaggiatori singoli e brevi soggiorni in Riviera", "Пари, соло-мандрівники й коротші перебування на Рив’єрі"),
    good: text("Compact studio layout with strong seafront positioning.", "Studio compact avec un emplacement très proche du front de mer.", "Monolocale compatto con forte posizione sul lungomare.", "Компактна студія з сильним розташуванням біля моря."),
    tags: [
      text("Private balcony", "Balcon privé", "Balcone privato", "Приватний балкон"),
      text("Beachfront location", "Emplacement bord de mer", "Posizione fronte mare", "Біля моря"),
      text("Morning sea views", "Vues mer le matin", "Vista mare al mattino", "Ранковий вид на море"),
      text("Promenade nearby", "Promenade proche", "Lungomare vicino", "Набережна поруч"),
    ],
    compareImage: "/images/apartments/sea-view-balcony-studio/04-bedroom-balcony-view.png",
  },
  "beachside-family-apartment": {
    short: text("Families & longer Riviera stays", "Familles & longs séjours Riviera", "Famiglie e soggiorni Riviera più lunghi", "Сім’ї та довші перебування на Рив’єрі"),
    best: text("Families, longer stays and guests arriving by car", "Familles, longs séjours et voyageurs arrivant en voiture", "Famiglie, soggiorni lunghi e ospiti in auto", "Сім’ї, довші перебування та гості з авто"),
    good: text("Most practical apartment for longer Riviera stays.", "L’appartement le plus pratique pour les longs séjours Riviera.", "L’appartamento più pratico per soggiorni più lunghi in Riviera.", "Найпрактичніші апартаменти для довшого перебування на Рив’єрі."),
    tags: [
      text("Private terrace", "Terrasse privée", "Terrazza privata", "Приватна тераса"),
      text("Full kitchen", "Cuisine complète", "Cucina completa", "Повна кухня"),
      text("Parking request", "Parking sur demande", "Parcheggio su richiesta", "Паркування за запитом"),
      text("Larger living area", "Espace plus grand", "Zona giorno più ampia", "Більше простору"),
    ],
    compareImage: "/images/apartments/beachside-family-apartment/21-living-room-tv-terrace.png",
  },
  "panoramic-sea-view-studio": {
    short: text("Mediterranean views & Monaco weekends", "Vues Méditerranée & week-ends Monaco", "Vista Mediterraneo e weekend a Monaco", "Види на море та вікенди в Монако"),
    best: text("Mediterranean views and Riviera weekends", "Vues Méditerranée et week-ends Riviera", "Vista Mediterraneo e weekend in Riviera", "Середземноморські види та вікенди на Рив’єрі"),
    good: text("Strongest sea-view experience in the collection.", "L’expérience vue mer la plus forte de la collection.", "L’esperienza vista mare più forte della collezione.", "Найвиразніший вид на море в колекції."),
    tags: [
      text("Panoramic sea view", "Vue mer panoramique", "Vista mare panoramica", "Панорамний вид на море"),
      text("Balcony", "Balcon", "Balcone", "Балкон"),
      text("Beach access", "Accès plage", "Accesso spiaggia", "Пляж поруч"),
      text("Monaco/Nice trips", "Excursions Monaco/Nice", "Gite Monaco/Nizza", "Поїздки до Монако/Ніцци"),
    ],
    compareImage: "/images/apartments/panoramic-sea-view-studio/06-bright-studio-double-bed.png",
  },
};

const heroCollageImages = {
  large: "/images/apartments/panoramic-sea-view-studio/16-living-room-sea-view.jpg",
  medium: "/images/apartments/beachside-family-apartment/04-dining-area-equipped-kitchen.jpg",
  small: "/images/apartments/sea-view-balcony-studio/02-living-room-balcony-view.jpg",
};

const recommendations = [
  {
    label: text("For Lemon Festival weekends", "Pour la Fête du Citron", "Per la Festa dei Limoni", "Для Фестивалю лимонів"),
    apartment: "panoramic-sea-view-studio",
    guide: "/events/menton-lemon-festival",
  },
  {
    label: text("For families with children", "Pour familles avec enfants", "Per famiglie con bambini", "Для сімей з дітьми"),
    apartment: "beachside-family-apartment",
    guide: "/guide/best-beaches-in-menton",
  },
  {
    label: text("For a car-free Riviera stay", "Pour un séjour sans voiture", "Per un soggiorno senza auto", "Для перебування без авто"),
    apartment: "sea-view-balcony-studio",
    guide: "/guide/menton-without-a-car",
  },
  {
    label: text("For Monaco day trips", "Pour excursions à Monaco", "Per gite a Monaco", "Для поїздок до Монако"),
    apartment: "panoramic-sea-view-studio",
    guide: "/guide/public-transport-in-menton",
  },
  {
    label: text("For longer summer stays", "Pour longs séjours d’été", "Per soggiorni estivi più lunghi", "Для довших літніх перебувань"),
    apartment: "beachside-family-apartment",
    guide: "/guide/menton-three-day-itinerary",
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    path: "apartments",
    title: copy.seoTitle[safeLocale],
    description: copy.seoDescription[safeLocale],
  });
}

function localPath(locale: Locale, href: string) {
  return `/${locale}${href}` as Route;
}

export default async function ApartmentsPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const pageUrl = absoluteUrl(localizedPath(safeLocale, "apartments"));

  return (
    <>
      <JsonLdScript data={collectionPageJsonLd({ name: copy.title[safeLocale], description: copy.seoDescription[safeLocale], url: pageUrl, locale: safeLocale })} />
      <JsonLdScript
        data={itemListJsonLd({
          name: copy.title[safeLocale],
          description: copy.seoDescription[safeLocale],
          url: pageUrl,
          items: apartments.map((apartment) => ({
            name: apartment.name[safeLocale],
            description: apartment.seoDescription[safeLocale],
            url: absoluteUrl(localizedPath(safeLocale, `apartments/${apartment.slug}`)),
            image: absoluteUrl(apartment.heroImage),
          })),
        })}
      />
      <section className="border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="grid gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
            <div>
              <p className="editorial-label">{copy.eyebrow[safeLocale]}</p>
              <h1 className="serif-heading mt-4 max-w-3xl text-5xl leading-[0.95] text-[#173f36] sm:text-6xl">
                {copy.title[safeLocale]}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f574c]">{copy.intro[safeLocale]}</p>
              <p className="mt-5 max-w-xl border-l border-[#c6a66a] pl-4 text-sm leading-6 text-[#6b5f50]">{copy.note[safeLocale]}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{copy.check[safeLocale]}</Button>
                <Button href={`/${safeLocale}/guide`} variant="secondary">{copy.guideLabel[safeLocale]}</Button>
              </div>
            </div>
            <div className="relative min-h-[430px]">
              <div className="absolute right-0 top-0 w-[72%] border border-[#dfd4c1] bg-white p-3">
                <Image
                  src={heroCollageImages.large}
                  alt="Living area with Mediterranean sea view at Azur Menton"
                  width={864}
                  height={1184}
                  preload
                  quality={90}
                  sizes="(min-width: 1024px) 35vw, 70vw"
                  className="aspect-[4/5] w-full object-cover object-[50%_50%]"
                />
              </div>
              <div className="absolute left-0 top-16 w-[46%] border border-[#dfd4c1] bg-[#fbf7ef] p-3 shadow-[0_18px_45px_rgba(23,63,54,0.12)]">
                <Image
                  src={heroCollageImages.medium}
                  alt="Dining area and equipped kitchen in the terrace apartment"
                  width={900}
                  height={1200}
                  quality={90}
                  sizes="(min-width: 1024px) 20vw, 44vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-[24%] w-[38%] border border-[#dfd4c1] bg-white p-3 shadow-[0_18px_45px_rgba(23,63,54,0.10)]">
                <Image
                  src={heroCollageImages.small}
                  alt="Living room with balcony view in the sea view studio"
                  width={900}
                  height={1200}
                  quality={90}
                  sizes="(min-width: 1024px) 16vw, 38vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <div key={apartment.slug} className="grid gap-3">
                <ApartmentCard apartment={apartment} locale={safeLocale} />
                <p className="border-l border-[#c6a66a] pl-3 text-sm font-semibold leading-6 text-[#173f36]">
                  {positioning[apartment.slug].short[safeLocale]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#dfd4c1] bg-[#f6efe3] py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 border-b border-[#dfd4c1] pb-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="editorial-label">{copy.howEyebrow[safeLocale]}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.howTitle[safeLocale]}</h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[#5f574c]">{copy.howIntro[safeLocale]}</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <Link key={apartment.slug} href={localPath(safeLocale, `/apartments/${apartment.slug}`)} className="group block">
                <Card className="h-full overflow-hidden bg-[#fffdf8] transition group-hover:border-[#c6a66a]">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[#dfd4c1] bg-[#efe4d1]">
                    <Image
                      src={positioning[apartment.slug].compareImage}
                      alt={apartment.shortName[safeLocale]}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="serif-heading text-3xl leading-tight text-[#173f36]">{apartment.shortName[safeLocale]}</h3>
                    <dl className="mt-5 grid gap-4 text-sm">
                      <div>
                        <dt className="editorial-label">{copy.bestFor[safeLocale]}</dt>
                        <dd className="mt-2 leading-6 text-[#5f574c]">{positioning[apartment.slug].best[safeLocale]}</dd>
                      </div>
                      <div>
                        <dt className="editorial-label">{copy.highlights[safeLocale]}</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {positioning[apartment.slug].tags.map((tag) => (
                            <span key={tag.en} className="border border-[#eadfce] bg-white/70 px-2 py-1 text-xs font-semibold text-[#5f574c]">
                              {tag[safeLocale]}
                            </span>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="editorial-label">{copy.goodToKnow[safeLocale]}</dt>
                        <dd className="mt-2 leading-6 text-[#5f574c]">{positioning[apartment.slug].good[safeLocale]}</dd>
                      </div>
                    </dl>
                    <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0b6f8f]">{copy.view[safeLocale]}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="editorial-label">{copy.recommendationTitle[safeLocale]}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.recommendationTitle[safeLocale]}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendations.map((item) => {
                const apartment = apartments.find((candidate) => candidate.slug === item.apartment)!;
                return (
                  <Card key={item.label.en} className="p-5">
                    <p className="editorial-label">{item.label[safeLocale]}</p>
                    <h3 className="serif-heading mt-3 text-2xl leading-tight text-[#173f36]">{apartment.shortName[safeLocale]}</h3>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0b6f8f] underline decoration-[#0b6f8f]/25 underline-offset-4 hover:text-[#173f36]" href={localPath(safeLocale, `/apartments/${apartment.slug}`)}>
                        {copy.view[safeLocale]}
                      </Link>
                      <Link className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0b6f8f] underline decoration-[#0b6f8f]/25 underline-offset-4 hover:text-[#173f36]" href={localPath(safeLocale, item.guide)}>
                        {item.guide.includes("/events/") ? copy.eventGuide[safeLocale] : copy.guideLabel[safeLocale]}
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#dfd4c1] bg-[#fbf7ef] py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="editorial-label">{copy.contextTitle[safeLocale]}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.contextTitle[safeLocale]}</h2>
              <p className="mt-5 text-lg leading-8 text-[#5f574c]">{copy.contextText[safeLocale]}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`/${safeLocale}/guide`} variant="secondary">{copy.guideLabel[safeLocale]}</Button>
                <Button href={`/${safeLocale}/events`} variant="secondary">{copy.eventsLabel[safeLocale]}</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                "/images/guide/menton-old-town.jpg",
                "/images/guide/promenade-du-soleil.jpg",
                "/images/guide/port-de-garavan.jpg",
              ].map((src, index) => (
                <div key={src} className={`relative aspect-[3/4] overflow-hidden border border-[#dfd4c1] bg-white p-2 ${index === 1 ? "mt-8" : ""}`}>
                  <Image src={src} alt="" fill quality={90} sizes="(min-width: 1024px) 14vw, 33vw" className="object-cover p-2" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-6 border-t border-[#dfd4c1] pt-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="serif-heading text-4xl leading-tight text-[#173f36]">{copy.finalTitle[safeLocale]}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f574c]">{copy.finalText[safeLocale]}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability`}>{copy.check[safeLocale]}</Button>
              <Button href={`/${safeLocale}/contact`} variant="secondary">{copy.contact[safeLocale]}</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
