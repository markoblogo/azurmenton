import type { Metadata } from "next";
import { BookingCTA } from "@/components/content/BookingCTA";
import { EventCard } from "@/components/content/EventCard";
import { PageIntro } from "@/components/layout/PageIntro";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { eventPages, eventsLanding } from "@/content/events";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = eventsLanding[safeLocale];

  return createMetadata({
    locale: safeLocale,
    path: "events",
    title: copy.seoTitle,
    description: copy.seoDescription,
  });
}

export default async function EventsLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = eventsLanding[safeLocale];
  const pages = eventPages[safeLocale];
  const sections = copy.sections.length ? copy.sections : eventsLanding.en.sections;
  const cards = copy.cards.length ? copy.cards : eventsLanding.en.cards;

  return (
    <>
      <PageIntro title={copy.title} description={copy.intro} />
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section) => (
              <Card key={section.heading} className="p-6">
                <h2 className="text-xl font-semibold text-[#17313a]">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#5c5044]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#17313a]">
                Event planning notes
              </h2>
              <p className="mt-3 max-w-2xl text-[#5c5044]">
                Evergreen planning pages for the periods when central beachside apartments become especially useful.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((event) => (
              <EventCard key={event.slug} event={event} locale={safeLocale} />
            ))}
            {cards.filter((card) => !card.href).map((card) => (
              <EventCard key={card.title} event={card} locale={safeLocale} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <BookingCTA
            locale={safeLocale}
            title="Visiting for an event?"
            text="Menton's Lemon Festival, summer evenings and major Riviera weekends can make beachside apartments especially attractive. Check your dates early."
            primaryLabel="Check availability"
            secondaryLabel="View apartments"
            primaryHref={`/${safeLocale}/check-availability`}
            secondaryHref={`/${safeLocale}/apartments`}
          />
        </Container>
      </Section>
    </>
  );
}
