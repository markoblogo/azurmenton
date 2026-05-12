import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments, getApartment } from "@/content/apartments";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    apartments.map((apartment) => ({
      locale,
      slug: apartment.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const apartment = getApartment(slug);

  return createMetadata({
    locale: safeLocale,
    path: `apartments/${slug}`,
    title: apartment?.title[safeLocale] ?? "Apartment",
    description: apartment?.summary[safeLocale],
  });
}

export default async function ApartmentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const apartment = getApartment(slug);

  if (!apartment) {
    notFound();
  }

  return (
    <>
      <PageIntro title={apartment.title[safeLocale]} description={apartment.summary[safeLocale]} />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-[#e4d8c7] bg-[#dcecf0] p-4">
              <div className="flex aspect-[4/3] items-end rounded-md bg-[#0b6f8f]/20 p-6 text-[#17313a]">
                <p className="text-lg font-semibold">{apartment.imageLabel}</p>
              </div>
            </div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[#17313a]">Details to add</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#5c5044]">
                <li>Verified description from the owner or listing source.</li>
                <li>Confirmed photo order and image files.</li>
                <li>Accurate amenities, guest capacity, house notes, and location guidance.</li>
                <li>No availability, prices, ratings, or reviews are shown until confirmed.</li>
              </ul>
              <div className="mt-6">
                <Button href={`/${safeLocale}/check-availability`}>Request to book</Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
