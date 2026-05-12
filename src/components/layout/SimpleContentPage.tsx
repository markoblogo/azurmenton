import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pageCopy } from "@/content/pages";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateSimpleMetadata(
  pageKey: keyof typeof pageCopy,
  { params }: PageProps,
): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = pageCopy[pageKey][safeLocale];

  return createMetadata({
    locale: safeLocale,
    path: pageKey,
    title: copy.title,
    description: copy.description,
  });
}

export function SimpleContentPage(pageKey: keyof typeof pageCopy) {
  async function Page({ params }: PageProps) {
    const { locale } = await params;
    const safeLocale: Locale = isLocale(locale) ? locale : "en";
    const copy = pageCopy[pageKey][safeLocale];

    return (
      <>
        <PageIntro title={copy.title} description={copy.description} />
        <Section>
          <Container>
            <Card className="max-w-3xl p-6 text-sm leading-7 text-[#5c5044]">
              {copy.note}
            </Card>
          </Container>
        </Section>
      </>
    );
  }

  return Page;
}
