import type { Metadata } from "next";
import Image from "next/image";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { homeCopy } from "@/content/pages";
import { t } from "@/content/translations";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";
import { lodgingBusinessJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    title: homeCopy[safeLocale].seoTitle,
    description: homeCopy[safeLocale].seoDescription,
  });
}

export default async function LocaleHome({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = homeCopy[safeLocale];
  const labels = t[safeLocale];

  return (
    <>
      <JsonLdScript data={lodgingBusinessJsonLd()} />
      <section className="bg-[#fff3df]">
        <Container>
          <div className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 md:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[#17313a] sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5c5044]">{copy.intro}</p>
              <ul className="mt-6 grid gap-2 text-sm font-semibold text-[#17313a] sm:grid-cols-3">
                {copy.proof.map((item) => (
                  <li key={item} className="rounded-md border border-[#d9cdbd] bg-white/70 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{copy.primaryCta}</Button>
                <Button href={`/${safeLocale}/apartments`} variant="secondary">
                  {copy.secondaryCta}
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-[#e4d8c7] bg-white shadow-sm">
              <Image
                src="/images/apartments/panoramic-studio-hero.svg"
                alt="Placeholder Mediterranean sea view from an Azur Menton apartment balcony"
                width={1200}
                height={850}
                priority
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[#17313a]">
                {labels.compareApartments}
              </h2>
              <p className="mt-3 text-[#5c5044]">
                Choose between two compact sea-view studios for couples and one practical terrace apartment with parking for families or longer stays.
              </p>
            </div>
            <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.slug} apartment={apartment} locale={safeLocale} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Manual request only", "No fake calendar and no instant confirmation until a real booking engine is connected."],
              ["Prepared for channel manager", "The request flow is isolated so it can later be replaced by Smoobu, Lodgify, or another engine."],
              ["Central Menton base", "Beachfront and beachside apartment pages are structured for verified photos and local guidance."],
            ].map(([title, body]) => (
              <Card key={title} className="p-6">
                <h3 className="text-lg font-semibold text-[#17313a]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5c5044]">{body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
