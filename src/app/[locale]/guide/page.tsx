import type { Metadata } from "next";
import { GuideCard } from "@/components/content/GuideCard";
import { BookingCTA } from "@/components/content/BookingCTA";
import { LiveMentonWebcams } from "@/components/LiveMentonWebcams";
import { PageIntro } from "@/components/layout/PageIntro";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { guideLanding, guidePages } from "@/content/guide";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = guideLanding[safeLocale];

  return createMetadata({
    locale: safeLocale,
    path: "guide",
    title: copy.seoTitle,
    description: copy.seoDescription,
  });
}

export default async function GuideLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = guideLanding[safeLocale];
  const pages = guidePages[safeLocale];
  const sections = copy.sections.length ? copy.sections : guideLanding.en.sections;

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
                Practical Menton planning guides
              </h2>
              <p className="mt-3 max-w-2xl text-[#5c5044]">
                Focused notes for choosing where to stay, moving around and planning easy Riviera days.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <GuideCard key={page.slug} page={page} locale={safeLocale} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <LiveMentonWebcams locale={safeLocale} />
        </Container>
      </Section>

      <Section>
        <Container>
          <BookingCTA
            locale={safeLocale}
            title={copy.cta.title}
            primaryLabel={copy.cta.primaryLabel}
            secondaryLabel={copy.cta.secondaryLabel}
            primaryHref={`/${safeLocale}/apartments`}
            secondaryHref={`/${safeLocale}/check-availability`}
          />
        </Container>
      </Section>
    </>
  );
}
