import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { EventImage } from "@/components/events/EventImage";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { apartments } from "@/content/apartments";
import {
  eventCategoryLabels,
  familySuitabilityLabels,
  getEventDateLabel,
  getEventTitle,
  rivieraEvents,
  type RivieraEvent,
} from "@/content/riviera-events";
import { isLocale, type Locale } from "@/i18n/locales";
import { getVisibleEvents } from "@/lib/events";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 86400;

const copy = {
  en: {
    title: "Events in Menton and nearby",
    subtitle:
      "Plan your stay around Menton's music festivals, Riviera sporting weekends, Monaco events, Nice exhibitions and family-friendly winter celebrations.",
    note: "Dates and event details can change. Always check official sources before booking travel.",
    availability: "Check availability",
    apartments: "View apartments",
    featured: "Featured Riviera dates",
    heroLabel: "Riviera calendar",
    highlightsLabel: "Highlights",
    practicalPlanning: "Practical planning",
    featuredIntro: "A quick scan of the moments most likely to influence where and when guests book.",
    details: "View details",
    tipsTitle: "Booking tips for event dates",
    tips: [
      "Book earlier during major Monaco and Menton events.",
      "Check access and parking rules during festivals, parades and race weekends.",
      "Consider arriving by train during busy event days.",
      "Ask the host about parking and access if travelling by car.",
      "Direct requests are manually confirmed; no instant availability is shown.",
    ],
    stayTitle: "Where to stay for events",
    stayIntro:
      "Choose the apartment around your travel style: view-first, family practical, or compact beachfront.",
    finalTitle: "Coming for an event?",
    finalText:
      "Tell us your dates and we'll confirm availability and the best direct offer personally.",
    seoTitle: "Events in Menton and nearby | Azur Menton",
    seoDescription:
      "Plan your Menton stay around the Lemon Festival, Monaco Grand Prix, Riviera music festivals, Nice exhibitions and family-friendly events.",
  },
  fr: {
    title: "Evenements a Menton et aux alentours",
    subtitle:
      "Planifiez votre sejour autour des festivals de Menton, des week-ends sportifs de la Riviera, des evenements de Monaco, des expositions a Nice et des celebrations d'hiver en famille.",
    note: "Les dates et details peuvent changer. Verifiez toujours les sources officielles avant de reserver un voyage.",
    availability: "Verifier disponibilite",
    apartments: "Voir appartements",
    featured: "Dates Riviera a surveiller",
    heroLabel: "Calendrier Riviera",
    highlightsLabel: "Temps forts",
    practicalPlanning: "Planification pratique",
    featuredIntro: "Un apercu des moments qui peuvent influencer les reservations.",
    details: "Voir details",
    tipsTitle: "Conseils pour reserver pendant les evenements",
    tips: [
      "Reservez plus tot pendant les grands evenements de Monaco et Menton.",
      "Verifiez acces et parking pendant festivals, defiles et week-ends de course.",
      "Envisagez le train les jours tres frequentes.",
      "Demandez conseil a l'hote si vous venez en voiture.",
      "Les demandes directes sont confirmees manuellement; pas de fausse disponibilite instantanee.",
    ],
    stayTitle: "Ou loger pour les evenements",
    stayIntro: "Choisissez selon votre style de voyage: vue, famille pratique ou studio compact en bord de mer.",
    finalTitle: "Vous venez pour un evenement ?",
    finalText: "Envoyez vos dates et nous confirmerons disponibilite et meilleure offre directe personnellement.",
    seoTitle: "Evenements a Menton et alentours | Azur Menton",
    seoDescription:
      "Planifiez votre sejour a Menton autour de la Fete du Citron, du Grand Prix de Monaco, des festivals de musique, des expositions a Nice et des evenements en famille.",
  },
  it: {
    title: "Eventi a Mentone e dintorni",
    subtitle:
      "Organizza il soggiorno intorno ai festival di Mentone, weekend sportivi in Riviera, eventi di Monaco, mostre a Nizza e feste invernali per famiglie.",
    note: "Date e dettagli possono cambiare. Controlla sempre le fonti ufficiali prima di prenotare il viaggio.",
    availability: "Controlla disponibilita",
    apartments: "Vedi appartamenti",
    featured: "Date Riviera in evidenza",
    heroLabel: "Calendario Riviera",
    highlightsLabel: "In evidenza",
    practicalPlanning: "Pianificazione pratica",
    featuredIntro: "Una selezione dei momenti che possono influenzare le prenotazioni.",
    details: "Dettagli",
    tipsTitle: "Consigli per prenotare durante eventi",
    tips: [
      "Prenota prima durante i grandi eventi di Monaco e Mentone.",
      "Verifica accesso e parcheggio durante festival, sfilate e weekend di gara.",
      "Considera il treno nei giorni piu affollati.",
      "Chiedi all'host consigli su accesso e parcheggio se arrivi in auto.",
      "Le richieste dirette sono confermate manualmente; non mostriamo falsa disponibilita.",
    ],
    stayTitle: "Dove soggiornare per gli eventi",
    stayIntro: "Scegli in base al viaggio: vista, famiglia pratica o studio compatto sul mare.",
    finalTitle: "Arrivi per un evento?",
    finalText: "Mandaci le date e confermeremo disponibilita e migliore offerta diretta personalmente.",
    seoTitle: "Eventi a Mentone e dintorni | Azur Menton",
    seoDescription:
      "Organizza il soggiorno a Mentone intorno alla Festa del Limone, al Gran Premio di Monaco, ai festival musicali della Riviera, alle mostre di Nizza e agli eventi per famiglie.",
  },
  uk: {
    title: "Події в Ментоні та поруч",
    subtitle:
      "Плануйте перебування навколо фестивалів Ментона, спортивних вікендів Рив'єри, подій Монако, виставок у Ніцці та зимових сімейних свят.",
    note: "Дати та деталі можуть змінюватися. Завжди перевіряйте офіційні джерела перед бронюванням подорожі.",
    availability: "Перевірити доступність",
    apartments: "Переглянути апартаменти",
    featured: "Головні дати Рив'єри",
    heroLabel: "Календар Рив'єри",
    highlightsLabel: "Головне",
    practicalPlanning: "Практичне планування",
    featuredIntro: "Швидкий огляд подій, які можуть впливати на бронювання.",
    details: "Деталі",
    tipsTitle: "Поради для бронювання на дати подій",
    tips: [
      "Бронюйте раніше під час великих подій у Монако та Ментоні.",
      "Перевіряйте доступ і паркування під час фестивалів, парадів і перегонів.",
      "Розгляньте поїзд у дуже завантажені дні.",
      "Запитайте господаря про доступ і паркування, якщо їдете авто.",
      "Прямі запити підтверджуються вручну; ми не показуємо фальшиву доступність.",
    ],
    stayTitle: "Де зупинитися на час подій",
    stayIntro: "Оберіть під стиль поїздки: вид, сімейна практичність або компактна студія біля моря.",
    finalTitle: "Їдете на подію?",
    finalText: "Надішліть дати, і ми особисто підтвердимо доступність та найкращу пряму пропозицію.",
    seoTitle: "Події в Ментоні та поруч | Azur Menton",
    seoDescription:
      "Плануйте перебування в Ментоні навколо Фестивалю лимонів, Гран-прі Монако, музичних фестивалів Рив'єри, виставок у Ніцці та сімейних подій.",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    path: "events",
    title: copy[safeLocale].seoTitle as string,
    description: copy[safeLocale].seoDescription as string,
  });
}

function FeaturedEvent({ event, locale }: { event: RivieraEvent; locale: Locale }) {
  const labels = copy[locale];
  const href = event.detailPage ? (`/${locale}/events/${event.slug}` as Route) : (`/${locale}/events` as Route);
  const title = getEventTitle(event, locale);
  const dateLabel = getEventDateLabel(event, locale);

  return (
    <Link href={href} className="group grid overflow-hidden border border-[#dfd4c1] bg-[#fffdf8] transition hover:border-[#c6a66a]">
      <EventImage event={event} locale={locale} className="min-h-44 border-0 border-b" sizes="(min-width: 1024px) 30vw, 92vw" />
      <div className="grid gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="border border-[#d2a748] bg-[#fff5d8] px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#7b5515]">
            {dateLabel}
          </span>
          <span className="border border-[#9ac7d2] bg-[#edf8fb] px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#245d6a]">
            {event.location}
          </span>
        </div>
        <h3 className="serif-heading break-words text-2xl leading-[0.98] text-[#173f36] sm:text-3xl sm:leading-[0.92]">{title}</h3>
        <p className="line-clamp-2 border-l border-[#c6a66a] pl-4 font-serif text-base italic leading-6 text-[#315d53]">
          {event.whyShowOnSite[locale]}
        </p>
        <div className="flex flex-wrap items-center gap-3 border-t border-[#dfd4c1] pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#b07820]">
            {eventCategoryLabels[locale][event.category[0]]}
          </span>
          <span className="text-xs text-[#5f574c]">
            {familySuitabilityLabels[locale][event.familySuitability]}
          </span>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#173f36] group-hover:text-[#0b6f8f]">
          {labels.details}
        </p>
      </div>
    </Link>
  );
}

export default async function EventsLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = copy[safeLocale];
  const pageUrl = absoluteUrl(localizedPath(safeLocale, "events"));
  const visibleEvents = getVisibleEvents(rivieraEvents);
  const featured = [...visibleEvents.upcoming, ...visibleEvents.datesPending].filter((event) => event.featured).slice(0, 6);
  const apartmentsForEvents = apartments.filter((apartment) =>
    ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"].includes(apartment.slug),
  );

  return (
    <>
      <JsonLdScript data={collectionPageJsonLd({ name: labels.title as string, description: labels.seoDescription as string, url: pageUrl, locale: safeLocale })} />
      <JsonLdScript
        data={itemListJsonLd({
          name: labels.title as string,
          description: labels.seoDescription as string,
          url: pageUrl,
          items: [...visibleEvents.upcoming, ...visibleEvents.datesPending]
            .filter((event) => event.detailPage)
            .map((event) => ({
              name: getEventTitle(event, safeLocale),
              description: event.shortDescription[safeLocale],
              url: absoluteUrl(localizedPath(safeLocale, `events/${event.slug}`)),
              image: event.media?.image ? absoluteUrl(event.media.image) : undefined,
            })),
        })}
      />
      <section className="border-b border-[#dfd4c1] bg-[#f6efe3]">
        <Container>
          <div className="grid gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-14">
            <div>
              <p className="editorial-label">{labels.heroLabel}</p>
              <h1 className="serif-heading mt-4 max-w-3xl break-words text-4xl leading-[0.96] text-[#173f36] sm:text-7xl sm:leading-[0.92]">
                {labels.title}
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[#5f574c]">{labels.subtitle}</p>
              <p className="mt-5 border-l border-[#c6a66a] pl-4 text-sm leading-6 text-[#6b5f50]">{labels.note}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{labels.availability}</Button>
                <Button href={`/${safeLocale}/apartments`} variant="secondary">{labels.apartments}</Button>
              </div>
            </div>
            <div className="grid grid-cols-[0.8fr_1.1fr] gap-3 lg:min-h-[24rem]">
              {featured.slice(0, 3).map((event, index) => (
                <EventImage
                  key={event.id}
                  event={event}
                  locale={safeLocale}
                  priority={index === 0}
                  className={`${index === 0 ? "col-span-2 min-h-60 lg:col-span-1 lg:row-span-2 lg:min-h-full" : "min-h-40"} bg-[#fffdf8] p-2`}
                  imageClassName="p-2"
                  sizes={index === 0 ? "(min-width: 1024px) 34vw, 92vw" : "(min-width: 1024px) 22vw, 44vw"}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="flex flex-col justify-between gap-4 border-b border-[#dfd4c1] pb-6 md:flex-row md:items-end">
            <div>
              <p className="editorial-label">{labels.highlightsLabel}</p>
              <h2 className="serif-heading mt-3 break-words text-4xl leading-none text-[#173f36]">{labels.featured}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c]">{labels.featuredIntro}</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((event) => (
              <FeaturedEvent key={event.id} event={event} locale={safeLocale} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f6efe3] py-10 sm:py-14">
        <Container>
          <EventsCalendar
            events={visibleEvents.upcoming}
            datesPendingEvents={visibleEvents.datesPending}
            pastEvents={visibleEvents.past}
            locale={safeLocale}
          />
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="editorial-label">{labels.practicalPlanning}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-none text-[#173f36]">{labels.tipsTitle}</h2>
            </div>
            <div className="grid border-y border-[#dfd4c1] md:grid-cols-2">
              {(labels.tips as string[]).map((tip, index) => (
                <p key={tip} className="border-b border-[#dfd4c1] py-4 text-sm font-semibold leading-6 text-[#173f36] md:border-r md:px-4 md:[&:nth-child(even)]:border-r-0">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#b07820]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {tip}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#fff3df] py-10 sm:py-14">
        <Container>
          <div className="grid gap-5 border-b border-[#dfd4c1] pb-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="editorial-label">Azur Menton</p>
              <h2 className="serif-heading mt-3 text-4xl leading-none text-[#173f36]">{labels.stayTitle}</h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-[#5f574c]">{labels.stayIntro}</p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {apartmentsForEvents.map((apartment) => (
              <Link key={apartment.slug} href={`/${safeLocale}/apartments/${apartment.slug}` as Route} className="border-t border-[#dfd4c1] bg-[#fffdf8]/70 p-5 transition hover:border-[#c6a66a]">
                <p className="editorial-label">{apartment.shortName[safeLocale]}</p>
                <h3 className="serif-heading mt-3 text-2xl leading-none text-[#173f36]">{apartment.name[safeLocale]}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5f574c]">{apartment.bestFor[safeLocale]}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#111615] py-10 text-white sm:py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="serif-heading text-4xl leading-tight">{labels.finalTitle}</h2>
            <p className="mt-4 text-sm leading-6 text-white/72">{labels.finalText}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability`}>{labels.availability}</Button>
              <Button href={`/${safeLocale}/apartments`} variant="secondary">{labels.apartments}</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
