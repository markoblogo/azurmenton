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
    path: "check-availability",
    title: "Request to book",
    description:
      "Send a manual request to book an Azur Menton apartment. This is not instant booking.",
  });
}

export default async function CheckAvailabilityPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <PageIntro
        title="Request to book"
        description="This is a manual enquiry form placeholder. Submitting it does not reserve an apartment and no backend email handling is connected yet."
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[#17313a]">How requests will work</h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-[#5c5044]">
                <p>Guests send preferred dates and apartment interest.</p>
                <p>The family confirms availability manually before any booking is accepted.</p>
                <p>No payment, channel manager, or instant confirmation is implemented yet.</p>
              </div>
            </Card>

            <Card className="p-6">
              <form className="grid gap-5" aria-label="Booking request placeholder form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
                    Name
                    <input className="rounded-md border border-[#d9cdbd] bg-white px-3 py-2 font-normal outline-none focus:border-[#0b6f8f]" name="name" placeholder="Guest name" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
                    Email
                    <input className="rounded-md border border-[#d9cdbd] bg-white px-3 py-2 font-normal outline-none focus:border-[#0b6f8f]" name="email" placeholder="guest@example.com" type="email" />
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
                    Arrival
                    <input className="rounded-md border border-[#d9cdbd] bg-white px-3 py-2 font-normal outline-none focus:border-[#0b6f8f]" name="arrival" type="date" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
                    Departure
                    <input className="rounded-md border border-[#d9cdbd] bg-white px-3 py-2 font-normal outline-none focus:border-[#0b6f8f]" name="departure" type="date" />
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
                  Apartment
                  <select className="rounded-md border border-[#d9cdbd] bg-white px-3 py-2 font-normal outline-none focus:border-[#0b6f8f]" name="apartment" defaultValue="">
                    <option value="" disabled>
                      Select an apartment
                    </option>
                    {apartments.map((apartment) => (
                      <option key={apartment.slug} value={apartment.slug}>
                        {apartment.title[safeLocale]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
                  Message
                  <textarea className="min-h-32 rounded-md border border-[#d9cdbd] bg-white px-3 py-2 font-normal outline-none focus:border-[#0b6f8f]" name="message" placeholder="Tell us who is travelling and any questions." />
                </label>
                <div className="rounded-md border border-[#d9cdbd] bg-[#fff3df] p-4 text-sm leading-6 text-[#5c5044]">
                  Placeholder only: backend submission and email delivery will be added later.
                </div>
                <Button type="button">Preview request only</Button>
              </form>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
