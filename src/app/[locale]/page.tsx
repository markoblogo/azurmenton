import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { homeCopy } from "@/content/pages";
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
    title: "Apartments in central Menton",
    description: homeCopy[safeLocale].intro,
  });
}

export default async function LocaleHome({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = homeCopy[safeLocale];

  return (
    <>
      <section className="bg-[#fff3df]">
        <Container>
          <div className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[#17313a] sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5c5044]">{copy.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{copy.primaryCta}</Button>
                <Button href={`/${safeLocale}/apartments`} variant="secondary">
                  {copy.secondaryCta}
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-[#e4d8c7] bg-[#dcecf0] p-4 shadow-sm">
              <div className="aspect-[4/5] rounded-md bg-[linear-gradient(145deg,#0b6f8f,#d9c7aa_55%,#fff9f0)] p-6">
                <div className="flex h-full flex-col justify-end rounded-md border border-white/50 p-5 text-white shadow-inner">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em]">Placeholder image</p>
                  <p className="mt-2 text-2xl font-semibold">Menton apartment photo area</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-[#17313a]">Apartments</h2>
            <p className="mt-3 text-[#5c5044]">
              Three apartment profiles are prepared for confirmed photos, amenities, location notes, and source descriptions.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {apartments.map((apartment) => (
              <Card key={apartment.slug} className="overflow-hidden">
                <div className="aspect-[4/3] bg-[#dcecf0] p-4">
                  <div className="flex h-full items-end rounded-md bg-[#0b6f8f]/20 p-4 text-sm font-semibold text-[#17313a]">
                    {apartment.imageLabel}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#17313a]">{apartment.title[safeLocale]}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5c5044]">{apartment.summary[safeLocale]}</p>
                  <div className="mt-5">
                    <Button href={`/${safeLocale}/apartments/${apartment.slug}`} variant="secondary">
                      View details
                    </Button>
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
