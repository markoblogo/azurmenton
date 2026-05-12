import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingCTA } from "@/components/content/BookingCTA";
import { InternalLinkList } from "@/components/content/InternalLinkList";
import { PracticalTips } from "@/components/content/PracticalTips";
import { RelatedApartmentsBlock } from "@/components/content/RelatedApartmentsBlock";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { eventPages, getEventPage } from "@/content/events";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    eventPages[locale].map((event) => ({
      locale,
      slug: event.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const event = getEventPage(safeLocale, slug);

  if (!event) {
    return {};
  }

  return createMetadata({
    locale: safeLocale,
    path: `events/${event.slug}`,
    title: event.seoTitle,
    description: event.seoDescription,
    type: "article",
  });
}

export default async function EventArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const event = getEventPage(locale, slug);

  if (!event) {
    notFound();
  }
  const pageUrl = absoluteUrl(localizedPath(locale, `events/${event.slug}`));

  return (
    <>
      <JsonLdScript
        data={articleJsonLd({
          title: event.title,
          description: event.seoDescription,
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
      <PageIntro title={event.title} description={event.intro} />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr]">
            <article className="grid gap-6">
              <Card className="p-6">
                <dl className="grid gap-4 text-sm sm:grid-cols-3">
                  {[
                    ["Type", event.eventType],
                    ["Location", event.location],
                    ["Expected season", event.expectedSeason],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[#6b5f50]">{label}</dt>
                      <dd className="mt-1 font-semibold text-[#17313a]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 rounded-md border border-[#d9cdbd] bg-[#fff9f0] p-4 text-sm leading-6 text-[#5c5044]">
                  Exact dates are not published here until they are verified from a source. Check official information before making event plans.
                </p>
              </Card>

              {event.sections.map((section) => (
                <Card key={section.heading} className="p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-[#17313a]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-[#5c5044]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </article>
            <aside className="grid h-fit gap-5">
              <PracticalTips tips={event.bookingTips} title="Booking tips" />
              <InternalLinkList links={event.relatedLinks} locale={locale} />
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <RelatedApartmentsBlock apartmentKeys={event.relatedApartmentKeys} locale={locale} />
        </Container>
      </Section>

      <Section>
        <Container>
          <BookingCTA
            locale={locale}
            title={event.cta.title}
            text={event.cta.text}
            primaryLabel={event.cta.primaryLabel}
            secondaryLabel={event.cta.secondaryLabel}
          />
        </Container>
      </Section>
    </>
  );
}
