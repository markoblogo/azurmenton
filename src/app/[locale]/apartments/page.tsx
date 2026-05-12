import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    path: "apartments",
    title: "Apartments",
    description: "Placeholder profiles for Azur Menton's three central Menton apartments.",
  });
}

export default async function ApartmentsPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <PageIntro
        title="Apartments"
        description="Initial apartment pages are ready for verified descriptions, photo ordering, amenities, and practical guest notes."
      />
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {apartments.map((apartment) => (
              <Card key={apartment.slug} className="overflow-hidden">
                <div className="aspect-[4/3] bg-[#dcecf0] p-4">
                  <div className="flex h-full items-end rounded-md bg-[#0b6f8f]/20 p-4 text-sm font-semibold text-[#17313a]">
                    {apartment.imageLabel}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-semibold text-[#17313a]">{apartment.title[safeLocale]}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#5c5044]">{apartment.summary[safeLocale]}</p>
                  <div className="mt-5">
                    <Button href={`/${safeLocale}/apartments/${apartment.slug}`}>View details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
