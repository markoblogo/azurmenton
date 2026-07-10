import Link from "next/link";
import type { Route } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Locale } from "@/i18n/locales";
import { bookingAttributionHref, bookingFunnelEvents, compactBookingAttributionProps } from "@/lib/analytics";

export type GuideTripPlanCard = {
  id: string;
  title: string;
  excerpt: string;
  duration: string;
  bestFor: string;
  transportNote: string;
  primaryGuide: { slug: string; title: string };
  apartment?: { slug: string; shortName: string };
};

const labels = {
  en: { transport: "Transport note", base: "Suggested base", open: "Open guide", availability: "Check availability" },
  fr: { transport: "Note transport", base: "Base suggeree", open: "Ouvrir le guide", availability: "Verifier disponibilite" },
  it: { transport: "Nota trasporti", base: "Base consigliata", open: "Apri la guida", availability: "Controlla disponibilita" },
  uk: { transport: "Нотатка про транспорт", base: "Рекомендована база", open: "Відкрити гід", availability: "Перевірити доступність" },
};

export function GuideTripPlans({ locale, plans }: { locale: Locale; plans: GuideTripPlanCard[] }) {
  const copy = labels[locale];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => {
        const attribution = {
          sourcePageType: "guide" as const,
          sourceSlug: plan.id,
          sourceGuideSlug: plan.primaryGuide.slug,
          ...(plan.apartment ? { sourceApartmentSlug: plan.apartment.slug } : {}),
        };

        return (
          <article key={plan.id} className="flex min-h-64 flex-col border border-[#dfd2b8] bg-[#f8f3ea] p-4">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{plan.duration} · {plan.bestFor}</p>
            <h3 className="mt-2 serif-heading text-2xl leading-[1.02] text-[#173f36]">{plan.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5c5044]">{plan.excerpt}</p>
            <div className="mt-4 border-y border-[#dfd2b8] py-3 text-xs leading-5 text-[#5c5044]">
              <p className="font-bold uppercase tracking-[0.11em] text-[#71665b]">{copy.transport}</p>
              <p className="mt-1">{plan.transportNote}</p>
              {plan.apartment ? (
                <p className="mt-3"><span className="font-bold uppercase tracking-[0.11em] text-[#71665b]">{copy.base}: </span><Link className="underline underline-offset-4 hover:text-[#173f36]" href={`/${locale}/apartments/${plan.apartment.slug}` as Route}>{plan.apartment.shortName}</Link></p>
              ) : null}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              <Link className="inline-flex min-h-10 items-center border border-[#c6a66a] px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]" href={`/${locale}/guide/${plan.primaryGuide.slug}` as Route}>{copy.open}</Link>
              <TrackedLink
                className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#102f28]"
                eventName={bookingFunnelEvents.guideCtaClick}
                href={bookingAttributionHref(locale, attribution)}
                props={{ locale, ...compactBookingAttributionProps(attribution), ...(plan.apartment ? { apartmentPreference: plan.apartment.slug } : {}) }}
              >
                {copy.availability}
              </TrackedLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}
