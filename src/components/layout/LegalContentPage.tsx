import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { legalPages, type LegalPageKey } from "@/content/legal";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateLegalMetadata(
  pageKey: LegalPageKey,
  { params }: PageProps,
): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = legalPages[pageKey][safeLocale];

  return createMetadata({
    locale: safeLocale,
    path: pageKey,
    title: copy.seoTitle,
    description: copy.seoDescription,
  });
}

export function LegalContentPage(pageKey: LegalPageKey) {
  async function Page({ params }: PageProps) {
    const { locale } = await params;
    const safeLocale: Locale = isLocale(locale) ? locale : "en";
    const copy = legalPages[pageKey][safeLocale];

    return (
      <>
        <PageIntro title={copy.title} description={copy.description} />
        <Section>
          <Container>
            <div className="grid gap-5">
              {copy.sections.map((section) => (
                <Card key={section.title} className="p-6">
                  <h2 className="text-xl font-semibold text-[#17313a]">{section.title}</h2>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-[#5c5044]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return Page;
}
