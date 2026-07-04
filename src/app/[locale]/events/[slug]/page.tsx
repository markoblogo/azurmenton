import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { BookingCTA } from "@/components/content/BookingCTA";
import { ContextualApartmentRecommendations } from "@/components/content/ContextualApartmentRecommendations";
import { RelatedApartmentsBlock } from "@/components/content/RelatedApartmentsBlock";
import { ShareActions } from "@/components/content/ShareActions";
import { EventImage } from "@/components/events/EventImage";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { getGuideArticle } from "@/content/guide";
import { eventApartmentScenarios } from "@/content/contextual-apartment-recommendations";
import {
  eventCategoryLabels,
  eventDateStatusLabels,
  eventDetailSlugs,
  familySuitabilityLabels,
  getEventDateLabel,
  getEventTitle,
  getEventDetail,
  rivieraEvents,
  sourceStatusLabels,
} from "@/content/riviera-events";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { bookingAttributionHref, bookingFunnelEvents, compactBookingAttributionProps } from "@/lib/analytics";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { canRenderEventJsonLd, getEventDateStatus } from "@/lib/events";
import { articleJsonLd, breadcrumbJsonLd, eventJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 86400;

const copy = {
  en: {
    eyebrow: "Riviera event guide",
    date: "Date / season",
    location: "Location",
    family: "Family suitability",
    status: "Source status",
    dateStatus: "Date status",
    distance: "Distance from Menton",
    lastChecked: "Last checked",
    theme: "Theme",
    bestFor: "Best for",
    verify: "Planning note",
    verifyText:
      "Dates, access rules and event details can change. Check official sources before booking travel or buying tickets.",
    why: "Why it matters",
    plan: "How to plan your stay",
    overview: "Event overview",
    venues: "Where it happens",
    familyDetails: "With children",
    tickets: "Official links, tickets and prices",
    tips: "Practical tips",
    apartments: "Where to stay",
    practicalNotes: "Practical notes",
    links: "Useful links",
    sidePlan: "Plan",
    relatedGuide: "Menton without a car",
    transportGuide: "Public transport in Menton",
    homeCrumb: "Home",
    eventsCrumb: "Events",
    availability: "Check availability",
    viewApartments: "View apartments",
    nextEdition: "Next edition",
    passed: "This event has passed.",
    similarEvents: "Similar upcoming events",
    relatedGuides: "Related guides",
    whyStay: "Why stay in Menton",
    getThere: "How to get there",
    arrive: "Best time to arrive",
    combine: "What to combine nearby",
  },
  fr: {
    eyebrow: "Guide evenement Riviera",
    date: "Date / saison",
    location: "Lieu",
    family: "Adaptation famille",
    status: "Statut source",
    dateStatus: "Statut des dates",
    distance: "Distance depuis Menton",
    lastChecked: "Derniere verification",
    theme: "Theme",
    bestFor: "Ideal pour",
    verify: "Note pratique",
    verifyText:
      "Dates, acces et details peuvent changer. Verifiez les sources officielles avant de reserver votre voyage ou des billets.",
    why: "Pourquoi c'est utile",
    plan: "Comment organiser le sejour",
    overview: "Apercu de l'evenement",
    venues: "Ou cela se passe",
    familyDetails: "Avec des enfants",
    tickets: "Liens officiels, billets et prix",
    tips: "Conseils pratiques",
    apartments: "Ou loger",
    practicalNotes: "Notes pratiques",
    links: "Liens utiles",
    sidePlan: "Plan",
    relatedGuide: "Menton sans voiture",
    transportGuide: "Transports publics à Menton",
    homeCrumb: "Accueil",
    eventsCrumb: "Evenements",
    availability: "Verifier disponibilite",
    viewApartments: "Voir appartements",
    nextEdition: "Prochaine edition",
    passed: "Cet evenement est passe.",
    similarEvents: "Evenements a venir similaires",
    relatedGuides: "Guides lies",
    whyStay: "Pourquoi loger a Menton",
    getThere: "Comment y aller",
    arrive: "Meilleur moment d'arrivee",
    combine: "A combiner a proximite",
  },
  it: {
    eyebrow: "Guida eventi Riviera",
    date: "Data / stagione",
    location: "Localita",
    family: "Adatto a famiglie",
    status: "Stato fonte",
    dateStatus: "Stato date",
    distance: "Distanza da Mentone",
    lastChecked: "Ultimo controllo",
    theme: "Tema",
    bestFor: "Ideale per",
    verify: "Nota pratica",
    verifyText:
      "Date, accessi e dettagli possono cambiare. Controlla fonti ufficiali prima di prenotare viaggio o biglietti.",
    why: "Perche conta",
    plan: "Come organizzare il soggiorno",
    overview: "Panoramica evento",
    venues: "Dove si svolge",
    familyDetails: "Con bambini",
    tickets: "Link ufficiali, biglietti e prezzi",
    tips: "Consigli pratici",
    apartments: "Dove soggiornare",
    practicalNotes: "Note pratiche",
    links: "Link utili",
    sidePlan: "Piano",
    relatedGuide: "Mentone senza auto",
    transportGuide: "Trasporti pubblici a Mentone",
    homeCrumb: "Home",
    eventsCrumb: "Eventi",
    availability: "Controlla disponibilita",
    viewApartments: "Vedi appartamenti",
    nextEdition: "Prossima edizione",
    passed: "Questo evento e passato.",
    similarEvents: "Eventi simili in arrivo",
    relatedGuides: "Guide correlate",
    whyStay: "Perche soggiornare a Mentone",
    getThere: "Come arrivare",
    arrive: "Quando arrivare",
    combine: "Cosa abbinare vicino",
  },
  uk: {
    eyebrow: "Гід подій Рив'єри",
    date: "Дата / сезон",
    location: "Локація",
    family: "Для сімей",
    status: "Статус джерела",
    dateStatus: "Статус дат",
    distance: "Відстань від Ментона",
    lastChecked: "Остання перевірка",
    theme: "Тема",
    bestFor: "Найкраще для",
    verify: "Практична примітка",
    verifyText:
      "Дати, правила доступу та деталі можуть змінюватися. Перевіряйте офіційні джерела перед бронюванням подорожі чи квитків.",
    why: "Чому це важливо",
    plan: "Як планувати перебування",
    overview: "Огляд події",
    venues: "Де проходить",
    familyDetails: "З дітьми",
    tickets: "Офіційні посилання, квитки та ціни",
    tips: "Практичні поради",
    apartments: "Де зупинитися",
    practicalNotes: "Практичні нотатки",
    links: "Корисні посилання",
    sidePlan: "План",
    relatedGuide: "Ментон без авто",
    transportGuide: "Громадський транспорт у Ментоні",
    homeCrumb: "Головна",
    eventsCrumb: "Події",
    availability: "Перевірити доступність",
    viewApartments: "Переглянути апартаменти",
    nextEdition: "Наступний випуск",
    passed: "Ця подія вже минула.",
    similarEvents: "Схожі майбутні події",
    relatedGuides: "Пов'язані гіди",
    whyStay: "Чому зупинитися в Ментоні",
    getThere: "Як дістатися",
    arrive: "Коли краще приїхати",
    combine: "Що поєднати поруч",
  },
} satisfies Record<Locale, Record<string, string>>;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    eventDetailSlugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const event = getEventDetail(slug);

  if (!event) {
    return {};
  }
  const title = getEventTitle(event, safeLocale);

  return createMetadata({
    locale: safeLocale,
    path: `events/${slug}`,
    title: `${title} | Azur Menton`,
    description: event.shortDescription[safeLocale],
    image: event.media?.image,
    imageAlt: event.media?.imageAlt?.[safeLocale],
    type: "article",
  });
}

export default async function EventArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const event = getEventDetail(slug);

  if (!event || !eventDetailSlugs.includes(event.slug as (typeof eventDetailSlugs)[number])) {
    notFound();
  }

  const labels = copy[locale];
  const title = getEventTitle(event, locale);
  const dateLabel = getEventDateLabel(event, locale);
  const pageUrl = absoluteUrl(localizedPath(locale, `events/${slug}`));
  const eventStatus = getEventDateStatus(event);
  const relatedGuides = (event.relatedGuideSlugs ?? ["menton-without-a-car", "public-transport-in-menton"])
    .map((guideSlug) => getGuideArticle(guideSlug))
    .filter((guide): guide is NonNullable<ReturnType<typeof getGuideArticle>> => Boolean(guide))
    .slice(0, 5);
  const similarEvents = rivieraEvents
    .filter((candidate) => candidate.slug !== event.slug && candidate.detailPage)
    .filter((candidate) => {
      const status = getEventDateStatus(candidate);
      return status === "upcoming" || status === "current" || status === "dates_pending" || status === "estimated_annual_window";
    })
    .filter((candidate) => candidate.location === event.location || candidate.category.some((category) => event.category.includes(category)))
    .slice(0, 3);
  const relatedApartmentKeys =
    event.relatedApartmentKeys ??
    ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"];
  const apartmentScenario = eventApartmentScenarios[event.slug];
  const sourceAttribution = {
    sourcePageType: "event" as const,
    sourceSlug: event.slug,
    sourceEventSlug: event.slug,
  };
  const eventCtaProps = {
    locale,
    ...compactBookingAttributionProps(sourceAttribution),
  };
  const eventBookingHref = bookingAttributionHref(locale, sourceAttribution);
  const detail = event.detailContent;
  const eventFacts: Array<[string, string]> = [
    [labels.date, dateLabel],
    [labels.location, event.location],
    [labels.dateStatus, event.dateStatus ? eventDateStatusLabels[locale][event.dateStatus] : sourceStatusLabels[locale][event.sourceStatus]],
    [labels.family, familySuitabilityLabels[locale][event.familySuitability]],
    [labels.status, sourceStatusLabels[locale][event.sourceStatus]],
    [labels.distance, event.distanceFromMentonKm !== undefined ? `${event.distanceFromMentonKm} km` : ""],
    [labels.bestFor, event.category.map((category) => eventCategoryLabels[locale][category]).slice(0, 2).join(", ")],
  ];
  if (event.theme) eventFacts.splice(6, 0, [labels.theme, event.theme[locale]]);
  if (event.lastChecked) eventFacts.splice(6, 0, [labels.lastChecked, event.lastChecked]);

  return (
    <>
      <JsonLdScript
        data={articleJsonLd({
          title,
          description: event.shortDescription[locale],
          url: pageUrl,
          image: event.media?.image ? absoluteUrl(event.media.image) : undefined,
          locale,
        })}
      />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: labels.homeCrumb, url: absoluteUrl(localizedPath(locale)) },
          { name: labels.eventsCrumb, url: absoluteUrl(localizedPath(locale, "events")) },
          { name: title, url: pageUrl },
        ])}
      />
      {canRenderEventJsonLd(event) ? (
        <JsonLdScript
          data={eventJsonLd({
            name: title,
            description: event.shortDescription[locale],
            url: pageUrl,
            startDate: event.startDate!,
            endDate: event.endDate,
            locationName: event.city ?? event.location,
            image: event.media?.image ? absoluteUrl(event.media.image) : undefined,
          })}
        />
      ) : null}

      <section className="border-b border-[#dfd4c1] bg-[#f6efe3]">
        <Container>
          <div className="grid gap-8 py-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-14">
            <div>
              <p className="editorial-label">{labels.eyebrow}</p>
              <h1 className="serif-heading mt-4 max-w-4xl break-words text-4xl leading-[0.96] text-[#173f36] sm:text-6xl sm:leading-[0.92]">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-7 text-[#5f574c]">{event.shortDescription[locale]}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {event.category.map((category) => (
                  <span key={category} className="border border-[#dfd4c1] bg-[#fffdf8] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[#4f5b57]">
                    {eventCategoryLabels[locale][category]}
                  </span>
                ))}
                <span className="border border-[#d2a748] bg-[#fff5d8] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[#7b5515]">
                  {sourceStatusLabels[locale][event.sourceStatus]}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  eventName={bookingFunnelEvents.eventCtaClick}
                  href={eventBookingHref}
                  props={eventCtaProps}
                  className="inline-flex min-h-11 items-center justify-center border border-[#173f36] bg-[#173f36] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
                >
                  {labels.availability}
                </TrackedLink>
                <Link
                  href={`/${locale}/apartments` as Route}
                  className="inline-flex min-h-11 items-center justify-center border border-[#c6a66a] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]"
                >
                  {labels.viewApartments}
                </Link>
              </div>
            </div>
            <div>
              <EventImage
                event={event}
                locale={locale}
                priority
                expandable
                className="min-h-[18rem] bg-[#fffdf8] p-2 lg:min-h-[26rem]"
                sizes="(min-width: 1024px) 48vw, 92vw"
              />
              {event.media?.imageCaption ? (
                <p className="mt-3 text-xs leading-5 text-[#6b5f50]">{event.media.imageCaption[locale]}</p>
              ) : null}
              <div className="mt-4">
                <ShareActions locale={locale} title={title} url={pageUrl} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[1fr_18rem]">
            <article className="grid gap-7">
              <div className="border-y border-[#dfd4c1] bg-[#fffdf8] p-4 sm:p-5">
                <dl className="grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-5">
                  {eventFacts.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[#6b5f50]">{label}</dt>
                      <dd className="mt-1.5 serif-heading break-words text-lg leading-tight text-[#17313a]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-l border-[#c6a66a] bg-[#fff9f0] p-3 text-sm leading-6 text-[#5c5044]">
                  <span className="font-bold text-[#173f36]">{labels.verify}: </span>
                  {labels.verifyText}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <section className="border border-[#dfd4c1] bg-[#fffdf8] p-5">
                  <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{labels.why}</h2>
                  <p className="mt-4 font-serif text-xl italic leading-8 text-[#315d53]">{event.whyShowOnSite[locale]}</p>
                  {detail?.overview.slice(0, 2).map((paragraph) => (
                    <p key={paragraph[locale]} className="mt-4 text-sm leading-7 text-[#5c5044]">{paragraph[locale]}</p>
                  ))}
                </section>

                <section className="border border-[#dfd4c1] bg-[#fffdf8] p-5">
                  <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{labels.plan}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#5c5044]">{event.bookingTip[locale]}</p>
                  <p className="mt-4 border-l border-[#c6a66a] bg-[#fff9f0] p-3 text-sm leading-6 text-[#5c5044]">
                    {labels.verifyText}
                  </p>
                </section>
              </div>

              {event.recurrence === "annual" ? (
                <section className="border border-[#dfd4c1] bg-[#fffdf8] p-5">
                  <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
                    <div>
                      <p className="editorial-label">{labels.nextEdition}</p>
                      <h2 className="serif-heading mt-2 text-3xl leading-none text-[#173f36]">{dateLabel}</h2>
                    </div>
                    <div className="grid gap-3 text-sm leading-7 text-[#5c5044]">
                      {eventStatus === "past" ? <p className="font-semibold text-[#7b5515]">{labels.passed}</p> : null}
                      <p>{event.bookingTip[locale]}</p>
                      {similarEvents.length ? (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b07820]">{labels.similarEvents}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {similarEvents.map((similar) => (
                              <Link key={similar.slug} href={`/${locale}/events/${similar.occurrenceSlug ?? similar.slug}` as Route} className="border border-[#dfd4c1] px-3 py-2 text-xs font-semibold text-[#0b6f8f] hover:border-[#c6a66a]">
                                {getEventTitle(similar, locale)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              ) : null}

              {detail ? (
                <section className="border-t border-[#dfd4c1] pt-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="serif-heading text-3xl leading-none text-[#173f36] sm:text-4xl">{labels.practicalNotes}</h2>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b07820]">{sourceStatusLabels[locale][event.sourceStatus]}</p>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                      <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.venues}</h3>
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#5c5044]">
                        {detail.venues.map((venue) => (
                          <li key={venue[locale]} className="border-l border-[#c6a66a] pl-3">{venue[locale]}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                      <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.familyDetails}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#5c5044]">{detail.family[locale]}</p>
                    </div>
                    <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                      <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.tickets}</h3>
                      <div className="mt-4 grid gap-3 text-sm leading-7 text-[#5c5044]">
                        {detail.tickets.map((ticket) => (
                          <p key={ticket[locale]}>{ticket[locale]}</p>
                        ))}
                        {detail.officialLinks?.length ? (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {detail.officialLinks.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-10 items-center border border-[#c6a66a] px-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]"
                              >
                                {link.label[locale]}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                      <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.tips}</h3>
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#5c5044]">
                        {detail.tips.map((tip) => (
                          <li key={tip[locale]} className="border-l border-[#c6a66a] pl-3">{tip[locale]}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              ) : null}

              <section className="border-t border-[#dfd4c1] pt-6">
                <h2 className="serif-heading text-3xl leading-none text-[#173f36] sm:text-4xl">{labels.plan}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                    <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.whyStay}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5c5044]">{event.location === "Menton" ? event.whyShowOnSite[locale] : event.travelNote?.[locale] ?? event.bookingTip[locale]}</p>
                  </div>
                  <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                    <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.getThere}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5c5044]">{event.travelNote?.[locale] ?? event.bookingTip[locale]}</p>
                  </div>
                  <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                    <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.arrive}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5c5044]">{labels.verifyText}</p>
                  </div>
                  <div className="border border-[#dfd4c1] bg-[#fffdf8] p-4">
                    <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{labels.combine}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5c5044]">{event.whyShowOnSite[locale]}</p>
                  </div>
                </div>
              </section>
            </article>

            <aside className="grid h-fit gap-4 border border-[#dfd4c1] bg-[#fffdf8] p-5 lg:sticky lg:top-24">
              <div>
                <p className="editorial-label">{labels.sidePlan}</p>
                <h2 className="serif-heading mt-2 text-3xl leading-none text-[#17313a]">{labels.links}</h2>
                <div className="mt-4 grid gap-3">
                  <TrackedLink className="border-b border-[#dfd4c1] pb-3 text-sm font-semibold text-[#0b6f8f]" eventName={bookingFunnelEvents.eventCtaClick} href={eventBookingHref} props={eventCtaProps}>
                    {labels.availability}
                  </TrackedLink>
                  <Link className="border-b border-[#dfd4c1] pb-3 text-sm font-semibold text-[#0b6f8f]" href={`/${locale}/apartments` as Route}>
                    {labels.viewApartments}
                  </Link>
                  {relatedGuides.length ? (
                    <div className="border-b border-[#dfd4c1] pb-3">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#b07820]">{labels.relatedGuides}</p>
                      <div className="grid gap-2">
                        {relatedGuides.map((guide) => (
                          <Link key={guide.slug} className="text-sm font-semibold text-[#0b6f8f]" href={`/${locale}/guide/${guide.slug}` as Route}>
                            {guide.title[locale]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <p className="text-xs leading-5 text-[#6b5f50]">{labels.verifyText}</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-[#fff3df] py-10 sm:py-12">
        <Container>
          {apartmentScenario ? (
            <ContextualApartmentRecommendations
              locale={locale}
              scenario={apartmentScenario}
              sourceAttribution={sourceAttribution}
              trackingEventName={bookingFunnelEvents.eventCtaClick}
            />
          ) : (
            <RelatedApartmentsBlock
              apartmentKeys={relatedApartmentKeys}
              locale={locale}
              title={labels.apartments}
              compact
            />
          )}
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container>
          <BookingCTA
            locale={locale}
            title={title}
            text={event.bookingTip[locale]}
            primaryLabel={labels.availability}
            secondaryLabel={labels.viewApartments}
            sourceAttribution={sourceAttribution}
            trackingEventName={bookingFunnelEvents.eventCtaClick}
            trackingProps={eventCtaProps}
          />
        </Container>
      </section>
    </>
  );
}
