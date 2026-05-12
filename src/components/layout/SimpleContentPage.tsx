import Image from "next/image";
import type { Metadata } from "next";
import { LiveMentonWebcams } from "@/components/LiveMentonWebcams";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { events, faqItems, guidePages, pageCopy } from "@/content/pages";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";
import { faqPageJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type SimplePageKey = keyof typeof pageCopy;

export async function generateSimpleMetadata(
  pageKey: SimplePageKey,
  { params }: PageProps,
): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = pageCopy[pageKey][safeLocale];

  return createMetadata({
    locale: safeLocale,
    path: pageKey,
    title: copy.seoTitle ?? copy.title,
    description: copy.seoDescription ?? copy.description,
  });
}

function GuideBody() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {guidePages.map((item) => (
        <Card key={item.slug} className="p-6">
          <h2 className="text-xl font-semibold text-[#17313a]">{item.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}

function EventsBody() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {events.map((item) => (
        <Card key={item.title} className="p-6">
          <h2 className="text-xl font-semibold text-[#17313a]">{item.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}

function FaqBody({ locale }: { locale: Locale }) {
  return (
    <>
      <div className="grid gap-4">
        {faqItems.map((item) => (
          <Card key={item.question} className="p-6">
            <h2 className="text-lg font-semibold text-[#17313a]">{item.question}</h2>
            <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.answer}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold text-[#17313a]">Still planning your stay?</h2>
        <p className="mt-3 text-sm leading-6 text-[#5c5044]">
          Send your dates or contact us with apartment questions before requesting a direct booking.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href={`/${locale}/check-availability`}>Check availability</Button>
          <Button href={`/${locale}/contact`} variant="secondary">Contact</Button>
        </div>
      </Card>
    </>
  );
}

function DefaultBody({
  note,
  locale,
}: {
  note: string;
  locale: Locale;
}) {
  return (
    <Card className="max-w-3xl p-6 text-sm leading-7 text-[#5c5044]">
      <p>{note}</p>
      <div className="mt-6">
        <Button href={`/${locale}/check-availability`}>Check availability</Button>
      </div>
    </Card>
  );
}

function ContactBody({ note, locale }: { note: string; locale: Locale }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <Card className="p-6 text-sm leading-7 text-[#5c5044]">
        <p>{note}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={`/${locale}/check-availability`}>Check availability</Button>
          <Button href={`mailto:${siteConfig.email}`} variant="secondary">
            Email us
          </Button>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-[#17313a]">Direct contact</h2>
        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="font-semibold text-[#17313a]">Email</dt>
            <dd className="mt-1">
              <a className="text-[#0b6f8f] hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#17313a]">WhatsApp</dt>
            <dd className="mt-1">
              <a
                className="text-[#0b6f8f] hover:underline"
                href={siteConfig.whatsappHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {siteConfig.whatsappDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#17313a]">Phone</dt>
            <dd className="mt-1">
              <a className="text-[#0b6f8f] hover:underline" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}

export function SimpleContentPage(pageKey: SimplePageKey) {
  async function Page({ params }: PageProps) {
    const { locale } = await params;
    const safeLocale: Locale = isLocale(locale) ? locale : "en";
    const copy = pageCopy[pageKey][safeLocale];

    return (
      <>
        {pageKey === "faq" ? <JsonLdScript data={faqPageJsonLd(faqItems)} /> : null}
        <PageIntro title={copy.title} description={copy.description} />
        {pageKey === "guide" ? (
          <div className="bg-[#fff3df]">
            <Container>
              <div className="py-8">
                <div className="relative overflow-hidden rounded-lg border border-[#e4d8c7]">
                  <Image
                    src="/images/guide/menton-seafront.svg"
                    alt="Placeholder illustration of the Menton seafront"
                    width={1200}
                    height={700}
                    className="aspect-[16/7] w-full object-cover"
                  />
                </div>
              </div>
            </Container>
          </div>
        ) : null}
        <Section>
          <Container>
            {pageKey === "guide" ? <GuideBody /> : null}
            {pageKey === "events" ? <EventsBody /> : null}
            {pageKey === "faq" ? <FaqBody locale={safeLocale} /> : null}
            {pageKey === "contact" ? <ContactBody note={copy.note} locale={safeLocale} /> : null}
            {["privacy", "legal"].includes(pageKey) ? (
              <DefaultBody note={copy.note} locale={safeLocale} />
            ) : null}
            {pageKey === "guide" ? (
              <div className="mt-12">
                <LiveMentonWebcams locale={safeLocale} />
              </div>
            ) : null}
          </Container>
        </Section>
      </>
    );
  }

  return Page;
}
