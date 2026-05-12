import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ApartmentGallery } from "@/components/apartments/ApartmentGallery";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments, getApartment } from "@/content/apartments";
import { t } from "@/content/translations";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { getHeroImage, imageObjectPosition } from "@/lib/apartment-images";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { breadcrumbJsonLd, vacationRentalJsonLd } from "@/lib/structured-data";

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
    title: apartment?.seoTitle[safeLocale] ?? "Apartment",
    description: apartment?.seoDescription[safeLocale],
    image: apartment?.cardImage,
  });
}

export default async function ApartmentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const apartment = getApartment(slug);

  if (!apartment) {
    notFound();
  }

  const labels = t[safeLocale];
  const heroImage = getHeroImage(apartment);
  const apartmentUrl = absoluteUrl(localizedPath(safeLocale, `apartments/${apartment.slug}`));

  return (
    <>
      <JsonLdScript
        data={vacationRentalJsonLd({
          name: apartment.name[safeLocale],
          description: apartment.seoDescription[safeLocale],
          url: apartmentUrl,
          image: apartment.gallery.slice(0, 8).map((image) => absoluteUrl(image.src)),
          accommodationCategory: apartment.structuredData.accommodationCategory,
          occupancy: apartment.structuredData.occupancy,
          rooms: apartment.structuredData.numberOfRooms,
          sizeSqm: apartment.sizeSqm,
          amenities: apartment.amenities.map((amenity) => amenity[safeLocale]),
        })}
      />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl(localizedPath(safeLocale)) },
          { name: labels.compareApartments, url: absoluteUrl(localizedPath(safeLocale, "apartments")) },
          { name: apartment.shortName[safeLocale], url: apartmentUrl },
        ])}
      />
      <section className="border-b border-[#dfd4c1] bg-[#f6efe3]">
        <Container>
          <div className="grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
            <div>
              <p className="editorial-label">
                {apartment.shortName[safeLocale]}
              </p>
              <h1 className="serif-heading mt-3 text-5xl leading-none text-[#173f36] sm:text-7xl">
                {apartment.name[safeLocale]}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#5f574c]">{apartment.tagline[safeLocale]}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                {[
                  [labels.guests, `${labels.upTo} ${apartment.maxGuests}`],
                  [labels.size, `${apartment.sizeSqm} m²`],
                  [labels.beds, apartment.beds],
                  [labels.bathrooms, apartment.bathrooms],
                ].map(([label, value]) => (
                  <div key={label} className="border border-[#dfd4c1] bg-white/55 p-3">
                    <dt className="text-[#6b5f50]">{label}</dt>
                    <dd className="mt-1 font-semibold text-[#17313a]">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
                <Button href={`/${safeLocale}/apartments`} variant="secondary">
                  {labels.compareApartments}
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden border border-[#dfd4c1] bg-white p-3">
              <Image
                src={heroImage.src}
                alt={heroImage.alt[safeLocale]}
                width={1200}
                height={850}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`aspect-[4/3] w-full object-cover ${imageObjectPosition(apartment, heroImage)}`}
              />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
            <div>
              <h2 className="serif-heading text-4xl text-[#173f36]">Overview</h2>
              <p className="mt-4 text-base leading-8 text-[#5f574c]">{apartment.longDescription[safeLocale]}</p>
              <ApartmentGallery apartment={apartment} locale={safeLocale} />
            </div>
            <Card className="h-fit p-6">
              <dl className="grid gap-4 text-sm">
                {[
                  [labels.guests, `${labels.upTo} ${apartment.maxGuests}`],
                  [labels.bedrooms, apartment.bedrooms],
                  [labels.beds, apartment.beds],
                  [labels.bathrooms, apartment.bathrooms],
                  [labels.size, `${apartment.sizeSqm} m²`],
                  [labels.bestFor, apartment.bestFor[safeLocale]],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-[#eadfce] pb-3 last:border-b-0 last:pb-0">
                    <dt className="text-[#6b5f50]">{label}</dt>
                    <dd className="mt-1 font-semibold text-[#17313a]">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [labels.keyFeatures, apartment.keyFeatures],
              [labels.amenities, apartment.amenities],
              [labels.location, apartment.locationHighlights],
            ].map(([title, items]) => (
              <Card key={title as string} className="p-6">
                <h2 className="text-xl font-semibold text-[#17313a]">{title as string}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5c5044]">
                  {(items as typeof apartment.keyFeatures).map((item) => (
                    <li key={item[safeLocale]}>{item[safeLocale]}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[#17313a]">
              Plan around this stay
            </h2>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-[#0b6f8f] sm:grid-cols-3">
              <Button href={`/${safeLocale}/guide/best-beaches-in-menton`} variant="secondary">
                Nearby beaches
              </Button>
              <Button href={`/${safeLocale}/guide/menton-without-a-car`} variant="secondary">
                Without a car
              </Button>
              <Button href={`/${safeLocale}/events/menton-lemon-festival`} variant="secondary">
                Lemon Festival stays
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="bg-[#17313a] p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Ask about this apartment
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                  Send your dates and preferred language. We will confirm availability manually and reply with the best direct offer.
                </p>
              </div>
              <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
