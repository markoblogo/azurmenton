import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingCTA } from "@/components/content/BookingCTA";
import { InternalLinkList } from "@/components/content/InternalLinkList";
import { PracticalTips } from "@/components/content/PracticalTips";
import { RelatedApartmentsBlock } from "@/components/content/RelatedApartmentsBlock";
import { PageIntro } from "@/components/layout/PageIntro";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getGuidePage, guidePages } from "@/content/guide";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    guidePages[locale].map((page) => ({
      locale,
      slug: page.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const page = getGuidePage(safeLocale, slug);

  if (!page) {
    return {};
  }

  return createMetadata({
    locale: safeLocale,
    path: `guide/${page.slug}`,
    title: page.seoTitle,
    description: page.seoDescription,
  });
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const page = getGuidePage(locale, slug);

  if (!page) {
    notFound();
  }

  const sectionApartmentKeys = page.sections.flatMap(
    (section) => section.relatedApartmentKeys ?? [],
  );
  const relatedApartmentKeys = Array.from(new Set(sectionApartmentKeys));

  return (
    <>
      <PageIntro title={page.title} description={page.intro} />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr]">
            <article className="grid gap-6">
              {page.sections.map((section) => (
                <Card key={section.heading} className="p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-[#17313a]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-[#5c5044]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-5 grid gap-2 text-sm leading-6 text-[#5c5044]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="border-l-2 border-[#0b6f8f] pl-3">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Card>
              ))}
            </article>
            <aside className="grid h-fit gap-5">
              <PracticalTips tips={page.practicalTips} />
              <InternalLinkList links={page.relatedLinks} locale={locale} />
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <RelatedApartmentsBlock apartmentKeys={relatedApartmentKeys} locale={locale} />
        </Container>
      </Section>

      <Section>
        <Container>
          <BookingCTA
            locale={locale}
            title={page.cta.title}
            text={page.cta.text}
            primaryLabel={page.cta.primaryLabel}
            secondaryLabel={page.cta.secondaryLabel}
          />
        </Container>
      </Section>
    </>
  );
}
