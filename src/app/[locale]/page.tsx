import type { Metadata } from "next";
import Image from "next/image";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { faqItems, homeCopy } from "@/content/pages";
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
  const whyBookDirect = [
    "Direct communication with a family-run host",
    "Best available direct offer",
    "Local recommendations",
    "Simple request-to-book process",
    "No platform service fee on direct requests",
  ];
  const whyMenton = [
    "Mediterranean beaches",
    "Old town and colourful streets",
    "Walkable centre",
    "Easy access to Monaco, Nice and the Italian Riviera",
  ];
  const apartmentHighlights = [
    {
      name: "Sea View Balcony Studio",
      text: "Best for couples, with a private balcony and Mediterranean sea view.",
    },
    {
      name: "Terrace & Parking Apartment",
      text: "Best for families or longer stays, with more space, a terrace and parking.",
    },
    {
      name: "Panoramic Sea View Studio",
      text: "Best for view lovers, a compact studio for two with a wide sea view.",
    },
  ];

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
                <Button href={`/${safeLocale}/apartments`}>{copy.primaryCta}</Button>
                <Button href={`/${safeLocale}/check-availability`} variant="secondary">
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
                Three apartments, one seaside location
              </h2>
              <p className="mt-3 text-[#5c5044]">
                All three apartments are close to the sea and central Menton, but each suits a different kind of stay: a sea-view balcony studio, a spacious beachside apartment with terrace and parking, or a compact studio where the wide view is the highlight.
              </p>
            </div>
            <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {apartmentHighlights.map((item) => (
              <Card key={item.name} className="p-5">
                <h3 className="text-lg font-semibold text-[#17313a]">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.text}</p>
              </Card>
            ))}
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
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#17313a]">
                Why book direct
              </h2>
              <p className="mt-3 text-[#5c5044]">
                Direct requests keep the conversation simple. Tell us your dates and we will confirm availability and the best direct offer personally.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {whyBookDirect.map((item) => (
                <Card key={item} className="p-5">
                  <p className="text-sm font-semibold leading-6 text-[#17313a]">{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative overflow-hidden rounded-lg border border-[#e4d8c7] bg-white shadow-sm">
              <Image
                src="/images/guide/menton-seafront.svg"
                alt="Placeholder image of Menton's Mediterranean seafront and colourful streets"
                width={1200}
                height={700}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#17313a]">
                Why Menton
              </h2>
              <p className="mt-3 text-[#5c5044]">
                Menton is made for easy seaside days: beaches, a colourful old town, a walkable centre and quick connections along the Riviera.
              </p>
              <div className="mt-6 grid gap-3">
                {whyMenton.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-[#eadfce] bg-[#fff9f0] px-4 py-3 text-sm font-semibold text-[#17313a]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#17313a]">
                Events and Riviera day trips
              </h2>
              <p className="mt-3 text-[#5c5044]">
                Plan around the Menton Lemon Festival, Monaco Grand Prix, summer events and nearby Riviera day trips. Dates and details are added only when verified.
              </p>
              <div className="mt-6">
                <Button href={`/${safeLocale}/events`} variant="secondary">
                  View events
                </Button>
              </div>
            </div>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-[#17313a]">Good to know</h3>
              <p className="mt-3 text-sm leading-6 text-[#5c5044]">
                Menton works well as a calm base for beach time, local food, Monaco, Nice and the Italian Riviera. The events page is prepared for confirmed seasonal content without inventing dates.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#17313a]">FAQ</h2>
              <p className="mt-3 max-w-2xl text-[#5c5044]">
                A few practical answers before you send a booking request.
              </p>
            </div>
            <Button href={`/${safeLocale}/faq`} variant="secondary">
              Read FAQ
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.slice(0, 4).map((item) => (
              <Card key={item.question} className="p-6">
                <h3 className="text-lg font-semibold text-[#17313a]">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#17313a]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Tell us your dates and we&apos;ll confirm availability directly.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/75">
              This is a manual request-to-book process, not instant confirmation. We will reply with availability and the best direct offer shortly.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
              <Button href={`/${safeLocale}/apartments`} variant="secondary">
                {labels.compareApartments}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
