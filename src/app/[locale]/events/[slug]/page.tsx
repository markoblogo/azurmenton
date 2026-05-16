import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { BookingCTA } from "@/components/content/BookingCTA";
import { RelatedApartmentsBlock } from "@/components/content/RelatedApartmentsBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  eventCategoryLabels,
  eventDetailSlugs,
  familySuitabilityLabels,
  getEventDetail,
  sourceStatusLabels,
} from "@/content/riviera-events";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const copy = {
  en: {
    eyebrow: "Riviera event guide",
    date: "Date / season",
    location: "Location",
    family: "Family suitability",
    verify: "Planning note",
    verifyText:
      "Dates, access rules and event details can change. Check official sources before booking travel or buying tickets.",
    why: "Why it matters",
    plan: "How to plan your stay",
    apartments: "Recommended apartments",
    links: "Useful next steps",
    availability: "Check availability",
    viewApartments: "View apartments",
  },
  fr: {
    eyebrow: "Guide evenement Riviera",
    date: "Date / saison",
    location: "Lieu",
    family: "Adaptation famille",
    verify: "Note pratique",
    verifyText:
      "Dates, acces et details peuvent changer. Verifiez les sources officielles avant de reserver votre voyage ou des billets.",
    why: "Pourquoi c'est utile",
    plan: "Comment organiser le sejour",
    apartments: "Appartements recommandes",
    links: "Etapes utiles",
    availability: "Verifier disponibilite",
    viewApartments: "Voir appartements",
  },
  it: {
    eyebrow: "Guida eventi Riviera",
    date: "Data / stagione",
    location: "Localita",
    family: "Adatto a famiglie",
    verify: "Nota pratica",
    verifyText:
      "Date, accessi e dettagli possono cambiare. Controlla fonti ufficiali prima di prenotare viaggio o biglietti.",
    why: "Perche conta",
    plan: "Come organizzare il soggiorno",
    apartments: "Appartamenti consigliati",
    links: "Prossimi passi utili",
    availability: "Controlla disponibilita",
    viewApartments: "Vedi appartamenti",
  },
  uk: {
    eyebrow: "Гід подій Рив'єри",
    date: "Дата / сезон",
    location: "Локація",
    family: "Для сімей",
    verify: "Практична примітка",
    verifyText:
      "Дати, правила доступу та деталі можуть змінюватися. Перевіряйте офіційні джерела перед бронюванням подорожі чи квитків.",
    why: "Чому це важливо",
    plan: "Як планувати перебування",
    apartments: "Рекомендовані апартаменти",
    links: "Корисні наступні кроки",
    availability: "Перевірити доступність",
    viewApartments: "Переглянути апартаменти",
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

  return createMetadata({
    locale: safeLocale,
    path: `events/${event.slug}`,
    title: `${event.title} | Azur Menton`,
    description: event.shortDescription[safeLocale],
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
  const pageUrl = absoluteUrl(localizedPath(locale, `events/${event.slug}`));
  const relatedApartmentKeys =
    event.relatedApartmentKeys ??
    ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"];

  return (
    <>
      <JsonLdScript
        data={articleJsonLd({
          title: event.title,
          description: event.shortDescription[locale],
          url: pageUrl,
        })}
      />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl(localizedPath(locale)) },
          { name: "Events", url: absoluteUrl(localizedPath(locale, "events")) },
          { name: event.title, url: pageUrl },
        ])}
      />

      <section className="border-b border-[#dfd4c1] bg-[#f6efe3]">
        <Container>
          <div className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:py-24">
            <div>
              <p className="editorial-label">{labels.eyebrow}</p>
              <h1 className="serif-heading mt-4 text-5xl leading-[0.96] text-[#173f36] sm:text-7xl">
                {event.title}
              </h1>
            </div>
            <div>
              <p className="text-lg leading-8 text-[#5f574c]">{event.shortDescription[locale]}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {event.category.map((category) => (
                  <span key={category} className="border border-[#dfd4c1] bg-[#fffdf8] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[#4f5b57]">
                    {eventCategoryLabels[locale][category]}
                  </span>
                ))}
                <span className="border border-[#d2a748] bg-[#fff5d8] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[#7b5515]">
                  {sourceStatusLabels[locale][event.sourceStatus]}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.36fr]">
            <article className="grid gap-6">
              <Card className="p-6">
                <dl className="grid gap-4 text-sm sm:grid-cols-3">
                  {[
                    [labels.date, event.dateLabel],
                    [labels.location, event.location],
                    [labels.family, familySuitabilityLabels[locale][event.familySuitability]],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[#6b5f50]">{label}</dt>
                      <dd className="mt-1 font-semibold text-[#17313a]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border border-[#d9cdbd] bg-[#fff9f0] p-4 text-sm leading-6 text-[#5c5044]">
                  <span className="font-bold text-[#173f36]">{labels.verify}: </span>
                  {labels.verifyText}
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="serif-heading text-4xl text-[#173f36]">{labels.why}</h2>
                <p className="mt-4 text-base leading-8 text-[#5c5044]">{event.whyShowOnSite[locale]}</p>
              </Card>

              <Card className="p-6">
                <h2 className="serif-heading text-4xl text-[#173f36]">{labels.plan}</h2>
                <p className="mt-4 text-base leading-8 text-[#5c5044]">{event.bookingTip[locale]}</p>
              </Card>
            </article>

            <aside className="grid h-fit gap-5">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#17313a]">{labels.links}</h2>
                <div className="mt-5 grid gap-3">
                  <Link className="text-sm font-semibold text-[#0b6f8f]" href={`/${locale}/check-availability` as Route}>
                    {labels.availability}
                  </Link>
                  <Link className="text-sm font-semibold text-[#0b6f8f]" href={`/${locale}/apartments` as Route}>
                    {labels.viewApartments}
                  </Link>
                  <Link className="text-sm font-semibold text-[#0b6f8f]" href={`/${locale}/guide/menton-without-a-car` as Route}>
                    Menton without a car
                  </Link>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <RelatedApartmentsBlock
            apartmentKeys={relatedApartmentKeys}
            locale={locale}
            title={labels.apartments}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <BookingCTA
            locale={locale}
            title={event.title}
            text={event.bookingTip[locale]}
            primaryLabel={labels.availability}
            secondaryLabel={labels.viewApartments}
          />
        </Container>
      </Section>
    </>
  );
}
