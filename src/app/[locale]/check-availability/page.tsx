import type { Metadata } from "next";
import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
    title: "Check availability and request to book",
    description:
      "Send a manual booking request for Azur Menton's central Menton apartments. No instant confirmation.",
  });
}

export default async function CheckAvailabilityPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = t[safeLocale];

  return (
    <>
      <PageIntro
        title={labels.requestOnly}
        description={labels.noInstantBooking}
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Card className="h-fit p-6">
              <h2 className="text-xl font-semibold text-[#17313a]">Before you send a request</h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-[#5c5044]">
                <p>There is no fake live availability calendar on this temporary website.</p>
                <p>Your request is logged by a placeholder server action. Email, Telegram, Airtable, Supabase, or a channel manager can be connected later.</p>
                <p>No payment is taken here and no booking is confirmed until Azur Menton replies directly.</p>
              </div>
            </Card>
            <Card className="p-6">
              <BookingRequestForm apartments={apartments} locale={safeLocale} />
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
