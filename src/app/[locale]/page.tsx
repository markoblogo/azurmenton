import type { Metadata } from "next";
import Image from "next/image";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
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
    apartmentTitle: "Three apartments, one seaside address",
    apartmentIntro:
      "Each apartment keeps you close to central Menton and the Mediterranean, but the right choice depends on how you like to travel.",
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
    apartmentTitle: "Trois appartements, une adresse en bord de mer",
    apartmentIntro:
      "Chaque appartement reste proche du centre de Menton et de la Mediterranee, mais le bon choix depend de votre facon de voyager.",
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
    apartmentTitle: "Tre appartamenti, un indirizzo vicino al mare",
    apartmentIntro:
      "Ogni appartamento ti mantiene vicino al centro di Mentone e al Mediterraneo, ma la scelta giusta dipende dal modo in cui viaggi.",
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
    apartmentTitle: "Три апартаменти, одна адреса біля моря",
    apartmentIntro:
      "Усі апартаменти розташовані близько до центру Ментона й Середземного моря, але кожен підходить для різного типу подорожі.",
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
    },
  ].flatMap((item) => (item ? [item] : []));

  return (
    <>
      <JsonLdScript data={lodgingBusinessJsonLd()} />
      <section className="relative overflow-hidden border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="grid min-h-[760px] items-center gap-12 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
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
            <div className="relative">
              <div className="relative ml-auto max-w-[540px] border border-[#dfd4c1] bg-white p-3">
                <Image
                  src="/images/apartments/panoramic-sea-view-studio/01-balcony-breakfast-sea-view.jpeg"
                  alt="Private balcony with breakfast table and Mediterranean sea view in Menton"
                  width={1200}
                  height={850}
                  priority
                  quality={90}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="aspect-[4/5] w-full object-cover object-[50%_42%]"
                />
              </div>
              <div className="absolute -bottom-6 -left-2 hidden w-56 border border-[#dfd4c1] bg-[#fbf7ef] p-3 shadow-[0_18px_45px_rgba(23,63,54,0.12)] md:block">
                <Image
                  src="/images/apartments/sea-view-balcony-studio/04-open-plan-studio-layout.jpeg"
                  alt="Bright beachfront studio with balcony access in Menton"
                  width={700}
                  height={520}
                  quality={90}
                  sizes="224px"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 border-b border-[#dfd4c1] pb-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="editorial-label">Azur Menton</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {sections.apartmentTitle}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[#5f574c]">{sections.apartmentIntro}</p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.slug} apartment={apartment} locale={safeLocale} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#173f36] text-white">
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

      <Container>
        <WeatherWidget locale={safeLocale} />
      </Container>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <Image
                src="/images/apartments/beachside-family-apartment/17-menton-old-town.jpeg"
                alt="Colourful old town buildings and church tower in Menton"
                width={800}
                height={1000}
                quality={90}
                sizes="(min-width: 1024px) 280px, 50vw"
                className="aspect-[3/4] w-full object-cover"
              />
              <Image
                src="/images/apartments/beachside-family-apartment/14-nearby-beach.jpeg"
                alt="Nearby beach in Menton with palm trees and the Mediterranean sea"
                width={800}
                height={1000}
                quality={90}
                sizes="(min-width: 1024px) 280px, 50vw"
                className="mt-12 aspect-[3/4] w-full object-cover"
              />
            </div>
            <div>
              <p className="editorial-label">{sections.mentonTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {sections.guideTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5f574c]">{sections.mentonIntro}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {guideTeasers.map((item) => (
                  <Card key={item.slug} className="p-5">
                    <h3 className="serif-heading text-2xl text-[#173f36]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#5f574c]">{item.intro}</p>
                  </Card>
                ))}
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

      <Section className="border-y border-[#dfd4c1] bg-[#f6efe3]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="editorial-label">Riviera calendar</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {sections.eventsTitle}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-[#5f574c]">{sections.eventsIntro}</p>
              <div className="mt-7">
                <Button href={`/${safeLocale}/events`} variant="secondary">
                  {sections.eventsCta}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
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

      <Section className="bg-[#111615]">
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
