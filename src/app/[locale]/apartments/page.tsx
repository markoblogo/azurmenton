import type { Metadata } from "next";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { routeLabels } from "@/content/navigation";
import { t } from "@/content/translations";
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
    title: safeLocale === "en"
      ? "Apartments in Menton by the Sea | Azur Menton"
      : `${routeLabels[safeLocale].apartments} | Azur Menton`,
    description:
      safeLocale === "en"
        ? "Choose from three family-run Menton apartments: sea-view balcony studios for couples and a spacious beachside apartment with terrace and parking for families."
        : "TODO_TRANSLATE: Choose from three family-run Menton apartments close to the sea, old town and promenade.",
  });
}

export default async function ApartmentsPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = t[safeLocale];

  return (
    <>
      <PageIntro
        title={labels.compareApartments}
        description="A simple comparison of the three Azur Menton apartments. No prices or live availability are shown until a confirmed booking system is connected."
      />
      <Section>
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.slug} apartment={apartment} locale={safeLocale} />
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-[#fff3df]">
        <Container>
          <Card className="overflow-hidden">
            <div className="grid divide-y divide-[#eadfce] text-sm md:grid-cols-[1.2fr_repeat(3,1fr)] md:divide-x md:divide-y-0">
              <div className="bg-[#17313a] p-4 font-semibold text-white">Apartment</div>
              {apartments.map((apartment) => (
                <div key={apartment.slug} className="p-4 font-semibold text-[#17313a]">
                  {apartment.shortName[safeLocale]}
                </div>
              ))}
            </div>
            {[
              [labels.guests, apartments.map((a) => `Up to ${a.maxGuests}`)],
              [labels.bestFor, apartments.map((a) => a.bestFor[safeLocale])],
              [labels.size, apartments.map((a) => `${a.sizeSqm} sqm`)],
              [labels.keyFeatures, apartments.map((a) => a.keyFeatures.map((f) => f[safeLocale]).join(", "))],
            ].map(([label, values]) => (
              <div
                key={label as string}
                className="grid divide-y divide-[#eadfce] border-t border-[#eadfce] text-sm md:grid-cols-[1.2fr_repeat(3,1fr)] md:divide-x md:divide-y-0"
              >
                <div className="bg-white/70 p-4 font-semibold text-[#17313a]">{label as string}</div>
                {(values as string[]).map((value, index) => (
                  <div key={apartments[index].slug} className="p-4 leading-6 text-[#5c5044]">
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </Card>
          <div className="mt-8">
            <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
