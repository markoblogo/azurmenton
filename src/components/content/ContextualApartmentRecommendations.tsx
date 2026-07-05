import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { apartments } from "@/content/apartments";
import type { ContextualApartmentScenario } from "@/content/contextual-apartment-recommendations";
import type { Locale } from "@/i18n/locales";
import {
  bookingAttributionHref,
  compactBookingAttributionProps,
  type BookingFunnelEvent,
  type BookingSourceAttribution,
} from "@/lib/analytics";
import { getCardImage, imageObjectPosition } from "@/lib/apartment-images";

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

export function ContextualApartmentRecommendations({
  locale,
  scenario,
  sourceAttribution,
  trackingEventName,
}: {
  locale: Locale;
  scenario?: ContextualApartmentScenario;
  sourceAttribution: BookingSourceAttribution;
  trackingEventName: BookingFunnelEvent;
}) {
  if (!scenario?.recommendations.length) {
    return null;
  }

  const copy = labels[locale];
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
    <section aria-labelledby="contextual-apartments" className="border border-[#dfd4c1] bg-[#fffdf8] p-4 sm:p-6">
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
          {copy.check}
        </TrackedLink>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {recommendations.map(({ recommendation, apartment }) => {
          const image = getCardImage(apartment);

          return (
            <article key={apartment.slug} className="flex h-full flex-col overflow-hidden border border-[#dfd4c1] bg-[#fbf7ef]">
              <div className="relative aspect-[4/2.35] overflow-hidden border-b border-[#dfd4c1] bg-[#f7efe1]">
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
                <p className="mt-3 text-sm leading-6 text-[#5c5044]">{recommendation.reason[locale]}</p>
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
                <Link
                  className="mt-auto inline-flex min-h-10 items-center justify-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
                  href={`/${locale}/apartments/${apartment.slug}` as Route}
                >
                  {copy.view}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
