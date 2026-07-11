import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ArrivalParkingBlock } from "@/components/content/ArrivalParkingBlock";
import { BookingCTA } from "@/components/content/BookingCTA";
import { RelatedApartmentsBlock } from "@/components/content/RelatedApartmentsBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { getGuideArticle } from "@/content/guide";
import { getEventDetail, getEventTitle } from "@/content/riviera-events";
import { getStayPage, localizeStayPage, stayPages } from "@/content/stay-pages";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { bookingFunnelEvents, compactBookingAttributionProps } from "@/lib/analytics";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const labels = {
  en: {
    home: "Home",
    stay: "Stay in Menton",
    intent: "Trip intent",
    apartments: "Recommended apartments",
    guides: "Related guides",
    events: "Related events",
    faq: "Questions guests ask",
    lastChecked: "Last checked",
  },
  fr: {
    home: "Accueil",
    stay: "Sejour a Menton",
    intent: "Objectif du voyage",
    apartments: "Appartements recommandes",
    guides: "Guides lies",
    events: "Evenements lies",
    faq: "Questions frequentes",
    lastChecked: "Derniere verification",
  },
  it: {
    home: "Home",
    stay: "Soggiorno a Mentone",
    intent: "Tipo di viaggio",
    apartments: "Appartamenti consigliati",
    guides: "Guide correlate",
    events: "Eventi correlati",
    faq: "Domande frequenti",
    lastChecked: "Ultimo controllo",
  },
  uk: {
    home: "Головна",
    stay: "Перебування в Ментоні",
    intent: "Мета поїздки",
    apartments: "Рекомендовані апартаменти",
    guides: "Пов'язані гіди",
    events: "Пов'язані події",
    faq: "Запитання гостей",
    lastChecked: "Остання перевірка",
  },
} satisfies Record<Locale, Record<string, string>>;

export function generateStaticParams() {
  return locales.flatMap((locale) => stayPages.map((page) => ({ locale, slug: page.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const page = getStayPage(slug);

  if (!page) {
    return {};
  }

  const localized = localizeStayPage(page, safeLocale);

  return createMetadata({
    locale: safeLocale,
    path: `stay/${page.slug}`,
    title: localized.seoTitle,
    description: localized.metaDescription,
    image: localized.heroImage,
    imageAlt: localized.heroImageAlt,
    type: "article",
  });
}

export default async function StayPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const page = getStayPage(slug);
  if (!page) notFound();

  const localized = localizeStayPage(page, locale);
  const copy = labels[locale];
  const pageUrl = absoluteUrl(localizedPath(locale, `stay/${page.slug}`));
  const sourceAttribution = {
    sourcePageType: "stay" as const,
    sourceSlug: page.slug,
  };
  const ctaProps = {
    locale,
    ...compactBookingAttributionProps(sourceAttribution),
  };
  const relatedGuides = page.relatedGuideSlugs
    .map((guideSlug) => getGuideArticle(guideSlug))
    .filter((guide): guide is NonNullable<ReturnType<typeof getGuideArticle>> => Boolean(guide));
  const relatedEvents = page.relatedEventSlugs
    .map((eventSlug) => getEventDetail(eventSlug))
    .filter((event): event is NonNullable<ReturnType<typeof getEventDetail>> => Boolean(event));
  const recommendedApartments = page.relatedApartmentSlugs
    .map((apartmentSlug) => apartments.find((apartment) => apartment.slug === apartmentSlug))
    .filter((apartment): apartment is (typeof apartments)[number] => Boolean(apartment));
  const showArrivalParking = new Set(["lemon-festival-menton", "monaco-events-from-menton", "menton-without-a-car"]).has(page.slug);

  return (
    <>
      <JsonLdScript
        data={articleJsonLd({
          title: localized.title,
          description: localized.metaDescription,
          url: pageUrl,
          image: localized.heroImage ? absoluteUrl(localized.heroImage) : undefined,
          locale,
        })}
      />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: copy.home, url: absoluteUrl(localizedPath(locale)) },
          { name: copy.stay, url: absoluteUrl(localizedPath(locale, "stay")) },
          { name: localized.title, url: pageUrl },
        ])}
      />
      {localized.faq.length ? <JsonLdScript data={faqPageJsonLd(localized.faq)} /> : null}

      <section className="border-b border-[#dfd2b8] bg-[#f8f3ea] py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_0.52fr] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">{copy.stay}</p>
              <h1 className="mt-4 max-w-4xl serif-heading text-5xl leading-[0.96] text-[#173f36] sm:text-6xl">{localized.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#5c5044]">{localized.excerpt}</p>
              <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <Fact label={copy.intent} value={localized.primaryTripIntent} />
                <Fact label={copy.lastChecked} value={localized.lastChecked} />
              </dl>
            </div>
            <aside className="overflow-hidden border border-[#dfd2b8] bg-[#fffaf0]">
              <div className="relative aspect-[4/3] bg-[#efe4d1]">
                {localized.heroImage ? (
                  <Image
                    src={localized.heroImage}
                    alt={localized.heroImageAlt ?? localized.title}
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <BookingCTA
                  locale={locale}
                  title={localized.cta.title}
                  text={localized.cta.text}
                  primaryLabel={localized.cta.primaryLabel}
                  secondaryLabel={localized.cta.secondaryLabel}
                  sourceAttribution={sourceAttribution}
                  trackingEventName={bookingFunnelEvents.apartmentCtaClick}
                  trackingProps={ctaProps}
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Section className="bg-[#f8f3ea] py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <article className="space-y-5">
              {localized.sections.map((section) => (
                <section key={section.heading} className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
                  <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{section.heading}</h2>
                  <div className="mt-4 space-y-3 text-base leading-8 text-[#5c5044]">
                    {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-5 grid gap-2 text-sm leading-6 text-[#5c5044] sm:grid-cols-2">
                      {section.bullets.map((bullet) => <li key={bullet} className="border-l-2 border-[#c6a66a] pl-3">{bullet}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}
              {showArrivalParking ? (
                <ArrivalParkingBlock
                  locale={locale}
                  sourceAttribution={sourceAttribution}
                  trackingEventName={bookingFunnelEvents.apartmentCtaClick}
                  context={page.slug === "menton-without-a-car" ? "carFree" : "default"}
                />
              ) : null}
            </article>

            <aside className="h-fit space-y-4 lg:sticky lg:top-24">
              {recommendedApartments.length ? (
                <Card className="p-5">
                  <h2 className="serif-heading text-2xl leading-none text-[#173f36]">{copy.apartments}</h2>
                  <div className="mt-4 grid gap-3">
                    {recommendedApartments.map((apartment) => (
                      <Link
                        key={apartment.slug}
                        className="border-l-2 border-[#c6a66a] pl-3 text-sm font-semibold leading-6 text-[#173f36] underline-offset-4 hover:underline"
                        href={`/${locale}/apartments/${apartment.slug}` as Route}
                      >
                        {apartment.shortName[locale]}
                      </Link>
                    ))}
                  </div>
                </Card>
              ) : null}
              <RelatedLinks title={copy.guides} items={relatedGuides.map((guide) => ({ slug: guide.slug, title: guide.title[locale], href: `/${locale}/guide/${guide.slug}` }))} />
              <RelatedLinks title={copy.events} items={relatedEvents.map((event) => ({ slug: event.slug, title: getEventTitle(event, locale), href: `/${locale}/events/${event.slug}` }))} />
            </aside>
          </div>
        </Container>
      </Section>

      {page.relatedApartmentSlugs.length ? (
        <Section className="bg-[#fffaf0] py-10 sm:py-14">
          <Container>
            <RelatedApartmentsBlock apartmentKeys={page.relatedApartmentSlugs} locale={locale} title={copy.apartments} compact />
          </Container>
        </Section>
      ) : null}

      {localized.faq.length ? (
        <Section className="bg-[#f8f3ea] py-10 sm:py-14">
          <Container>
            <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.faq}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {localized.faq.map((item) => (
                <Card key={item.question} className="p-5">
                  <h3 className="text-base font-semibold text-[#17313a]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.answer}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="py-12 sm:py-16">
        <Container>
          <BookingCTA
            locale={locale}
            title={localized.cta.title}
            text={localized.cta.text}
            primaryLabel={localized.cta.primaryLabel}
            secondaryLabel={localized.cta.secondaryLabel}
            sourceAttribution={sourceAttribution}
            trackingEventName={bookingFunnelEvents.apartmentCtaClick}
            trackingProps={ctaProps}
          />
        </Container>
      </Section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#dfd2b8] bg-[#fffaf0] px-4 py-3">
      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-[#173f36]">{value}</dd>
    </div>
  );
}

function RelatedLinks({ title, items }: { title: string; items: Array<{ slug: string; title: string; href: string }> }) {
  if (!items.length) {
    return null;
  }

  return (
    <Card className="p-5">
      <h2 className="serif-heading text-2xl leading-none text-[#173f36]">{title}</h2>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <Link key={item.slug} className="text-sm font-semibold text-[#173f36] underline-offset-4 hover:underline" href={item.href as Route}>
            {item.title}
          </Link>
        ))}
      </div>
    </Card>
  );
}
