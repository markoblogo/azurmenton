import type { Metadata } from "next";
import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { apartments } from "@/content/apartments";
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
    path: "check-availability",
    title: safeLocale === "en"
      ? "Check Availability | Direct Booking Request | Azur Menton"
      : `${t[safeLocale].checkAvailability} | Azur Menton`,
    description:
      safeLocale === "en"
        ? "Send a direct booking request for Azur Menton apartments. We will confirm availability and the best direct offer manually."
        : "TODO_TRANSLATE: Send a direct booking request for Azur Menton apartments. Availability and direct offers are confirmed manually.",
  });
}

export default async function CheckAvailabilityPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = t[safeLocale];
  const comparison = apartments.map((apartment) => ({
    name: apartment.shortName[safeLocale],
    bestFor: apartment.bestFor[safeLocale],
    guests: apartment.maxGuests,
    features: apartment.keyFeatures
      .slice(0, apartment.slug === "beachside-family-apartment" ? 4 : 3)
      .map((feature) => feature[safeLocale]),
  }));

  return (
    <>
      <PageIntro
        title="Direct booking request"
        description="Tell us your preferred dates and apartment. This is not instant confirmation: the host will check availability and reply with the best direct offer."
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="grid h-fit gap-5">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#17313a]">How it works</h2>
                <div className="mt-5 space-y-4 text-sm leading-6 text-[#5c5044]">
                  <p>This is a direct booking request, not instant confirmation.</p>
                  <p>The host checks availability manually and replies with the best direct offer.</p>
                  <p>
                    You can also contact us via WhatsApp or email:{" "}
                    <a
                      className="font-semibold text-[#0b6f8f]"
                      href={siteConfig.whatsappHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      WhatsApp {siteConfig.whatsappDisplay}
                    </a>
                    {" "}or{" "}
                    <a className="font-semibold text-[#0b6f8f]" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                    .
                  </p>
                  <p className="rounded-md border border-[#d9cdbd] bg-[#fff3df] p-4">
                    To avoid double bookings while we connect our channel manager, all direct requests are confirmed manually by the host.
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#17313a]">Which apartment fits?</h2>
                <div className="mt-5 grid gap-4">
                  {comparison.map((apartment) => (
                    <div key={apartment.name} className="border-b border-[#eadfce] pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-[#17313a]">{apartment.name}</h3>
                        <span className="shrink-0 rounded-md bg-[#e7f2f4] px-2 py-1 text-xs font-semibold text-[#0b6f8f]">
                          Up to {apartment.guests}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#5c5044]">{apartment.bestFor}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {apartment.features.map((feature) => (
                          <li
                            key={feature}
                            className="rounded-md border border-[#eadfce] bg-white/70 px-2 py-1 text-xs font-semibold text-[#5c5044]"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-5 sm:p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-[#17313a]">
                  {labels.requestOnly}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5c5044]">
                  Share your dates and contact details. Email or phone/WhatsApp is enough.
                </p>
              </div>
              <BookingRequestForm apartments={apartments} locale={safeLocale} />
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
