import Image from "next/image";
import type { Route } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { apartments } from "@/content/apartments";
import type { RivieraEvent } from "@/content/riviera-events";
import type { ContextualApartmentScenario } from "@/content/contextual-apartment-recommendations";
import type { Locale } from "@/i18n/locales";
import {
  bookingAttributionHref,
  apartmentDetailAttributionHref,
  compactBookingAttributionProps,
  type BookingFunnelEvent,
  type BookingSourceAttribution,
} from "@/lib/analytics";
import { getCardImage, imageObjectPosition } from "@/lib/apartment-images";
import { contextualStayHref, eventStayWindow } from "@/lib/contextual-stay";
import { CalendarDays } from "lucide-react";

const labels = {
  en: {
    guests: "Guests",
    upTo: "Up to",
    feature: "Key feature",
    view: "View apartment",
    check: "Check availability",
  },
  fr: {
    guests: "Voyageurs",
    upTo: "Jusqu'a",
    feature: "Point fort",
    view: "Voir appartement",
    check: "Verifier disponibilite",
  },
  it: {
    guests: "Ospiti",
    upTo: "Fino a",
    feature: "Punto forte",
    view: "Vedi appartamento",
    check: "Controlla disponibilita",
  },
  uk: {
    guests: "Гості",
    upTo: "До",
    feature: "Ключова перевага",
    view: "Переглянути апартаменти",
    check: "Перевірити доступність",
  },
} satisfies Record<Locale, Record<string, string>>;

const eventCopy = {
  en: { plan: "Request these dates", note: "Suggested stay: event opening day to the morning after its final day. Review the dates before sending; accommodation and event tickets are not confirmed.", choose: "Choose your own stay dates: this programme has multiple sessions, a longer run, or dates that cannot be used for a current stay request." },
  fr: { plan: "Demander ces dates", note: "Séjour suggéré : du premier jour de l'événement au matin suivant le dernier. Vérifiez les dates avant l'envoi ; hébergement et billets ne sont pas confirmés.", choose: "Choisissez vos dates de séjour : ce programme comprend plusieurs séances, une longue période ou des dates non utilisables pour une demande actuelle." },
  it: { plan: "Richiedi queste date", note: "Soggiorno suggerito: dal primo giorno dell'evento alla mattina dopo l'ultimo. Controllate le date prima dell'invio; alloggio e biglietti non sono confermati.", choose: "Scegliete le date del soggiorno: il programma ha più sessioni, una lunga durata o date non utilizzabili per una richiesta attuale." },
  uk: { plan: "Запитати ці дати", note: "Орієнтовне перебування: від першого дня події до ранку після останнього. Перевірте дати перед надсиланням; житло й квитки на подію не підтверджені.", choose: "Оберіть дати перебування самі: програма має кілька сеансів, тривалий період або дати, непридатні для актуального запиту." },
};

export function ContextualApartmentRecommendations({
  locale,
  scenario,
  sourceAttribution,
  trackingEventName,
  event,
}: {
  locale: Locale;
  scenario?: ContextualApartmentScenario;
  sourceAttribution: BookingSourceAttribution;
  trackingEventName: BookingFunnelEvent;
  event?: RivieraEvent;
}) {
  if (!scenario?.recommendations.length) {
    return null;
  }

  const copy = labels[locale];
  const stayWindow = event ? eventStayWindow(event) : undefined;
  const dateFormat = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const stayLabel = stayWindow ? `${dateFormat.format(new Date(`${stayWindow.start}T12:00:00Z`))} → ${dateFormat.format(new Date(`${stayWindow.end}T12:00:00Z`))}` : undefined;
  const bookingHref = bookingAttributionHref(locale, sourceAttribution);
  const trackingProps = {
    locale,
    ...compactBookingAttributionProps(sourceAttribution),
  };
  const recommendations = scenario.recommendations
    .slice(0, 3)
    .map((recommendation) => ({
      recommendation,
      apartment: apartments.find((apartment) => apartment.slug === recommendation.apartmentSlug),
    }))
    .filter((item): item is { recommendation: (typeof scenario.recommendations)[number]; apartment: (typeof apartments)[number] } => Boolean(item.apartment));

  if (!recommendations.length) {
    return null;
  }

  return (
    <section aria-labelledby="contextual-apartments" data-contextual-apartments>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="contextual-apartments" className="serif-heading text-3xl leading-none text-[#173f36]">
          {scenario.title[locale]}
        </h2>
        <TrackedLink
          className="inline-flex min-h-10 w-fit items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
          eventName={trackingEventName}
          href={bookingHref}
          props={trackingProps}
        >
          {scenario.checkLabel?.[locale] ?? copy.check}
        </TrackedLink>
      </div>
      {scenario.intro ? <p className="mt-4 max-w-3xl text-base leading-7 text-[#5c5044]">{scenario.intro[locale]}</p> : null}
      {event ? <div data-event-stay className="mt-4 max-w-3xl text-base leading-7 text-[#5c5044]">
        {stayLabel ? <p className="flex items-center gap-2 font-semibold text-[#173f36]"><CalendarDays size={20} aria-hidden="true" className="shrink-0 text-[#0b6f8f]" />{stayLabel}</p> : null}
        <p className="mt-2">{stayWindow ? eventCopy[locale].note : eventCopy[locale].choose}</p>
      </div> : null}
      <div className={`mt-5 grid gap-4 ${recommendations.length === 2 ? "lg:grid-cols-2" : recommendations.length > 2 ? "lg:grid-cols-3" : ""}`}>
        {recommendations.map(({ recommendation, apartment }) => {
          const image = getCardImage(apartment);

          return (
            <article key={apartment.slug} className={`${recommendations.length === 1 ? "grid md:grid-cols-[0.42fr_0.58fr]" : "flex flex-col"} h-full overflow-hidden border border-[#dfd4c1] bg-[#fbf7ef]`}>
              <div className={`relative ${recommendations.length === 1 ? "min-h-56" : "aspect-[4/2.35]"} overflow-hidden border-b border-[#dfd4c1] bg-[#f7efe1]`}>
                <Image
                  src={image.src}
                  alt={image.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition duration-500 ease-out hover:scale-[1.035] ${imageObjectPosition(apartment, image)}`}
                  quality={88}
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{apartment.shortName[locale]}</p>
                <h3 className="mt-2 serif-heading text-2xl leading-none text-[#173f36]">{apartment.name[locale]}</h3>
                <p className="mt-3 text-base leading-7 text-[#5c5044]">{recommendation.reason[locale]}</p>
                <dl className="mt-4 grid gap-3 border-y border-[#dfd4c1] py-3 text-sm">
                  <div>
                    <dt className="text-[#6b5f50]">{copy.guests}</dt>
                    <dd className="font-semibold text-[#173f36]">
                      {copy.upTo} {apartment.maxGuests}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6b5f50]">{copy.feature}</dt>
                    <dd className="font-semibold text-[#173f36]">{recommendation.keyFeature[locale]}</dd>
                  </div>
                </dl>
                <TrackedLink
                  className="mt-auto inline-flex min-h-10 items-center justify-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
                  eventName="apartment_discovery"
                  href={apartmentDetailAttributionHref(locale, apartment.slug, sourceAttribution) as Route}
                  props={{
                    locale,
                    ...compactBookingAttributionProps({ ...sourceAttribution, sourceApartmentSlug: apartment.slug }),
                  }}
                >
                  {copy.view}
                </TrackedLink>
                {stayWindow ? <TrackedLink
                  className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 border border-[#173f36] bg-[#173f36] px-4 py-2 text-sm font-semibold text-white hover:bg-[#102f28]"
                  eventName={trackingEventName}
                  href={contextualStayHref(locale, apartment.slug, sourceAttribution, stayWindow)}
                  props={{ ...trackingProps, sourceApartmentSlug: apartment.slug }}
                ><CalendarDays size={18} aria-hidden="true" className="shrink-0" />{eventCopy[locale].plan}</TrackedLink> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
