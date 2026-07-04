import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { BookingCTA } from "@/components/content/BookingCTA";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPublicWeeklyDigest } from "@/content/weekly-digests";
import { isLocale, type Locale } from "@/i18n/locales";
import { bookingFunnelEvents } from "@/lib/analytics";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    home: "Home",
    events: "Events",
    title: "This week near Menton",
    seoTitle: "This week near Menton",
    description: "A human-reviewed weekly digest foundation for events and useful local ideas near Menton, Monaco, Nice and Sanremo.",
    empty: "This week’s update is being prepared. Browse the full events calendar.",
    calendar: "Browse events calendar",
    apartments: "View apartments",
    ctaTitle: "Planning a stay this week?",
    ctaText: "Send your dates and we will confirm apartment availability directly.",
    check: "Check availability",
    lastChecked: "Last checked",
    source: "Human-reviewed digest",
  },
  fr: {
    home: "Accueil",
    events: "Evenements",
    title: "Cette semaine pres de Menton",
    seoTitle: "Cette semaine pres de Menton",
    description: "Base de digest hebdomadaire relu humainement pour les evenements et idees utiles pres de Menton, Monaco, Nice et Sanremo.",
    empty: "La mise a jour de la semaine est en preparation. Consultez le calendrier complet des evenements.",
    calendar: "Voir le calendrier",
    apartments: "Voir les appartements",
    ctaTitle: "Vous planifiez un sejour cette semaine ?",
    ctaText: "Envoyez vos dates et nous confirmerons directement la disponibilite des appartements.",
    check: "Verifier disponibilite",
    lastChecked: "Derniere verification",
    source: "Digest relu humainement",
  },
  it: {
    home: "Home",
    events: "Eventi",
    title: "Questa settimana vicino a Mentone",
    seoTitle: "Questa settimana vicino a Mentone",
    description: "Base per un digest settimanale rivisto da una persona per eventi e idee utili vicino a Mentone, Monaco, Nizza e Sanremo.",
    empty: "L'aggiornamento della settimana e in preparazione. Consulta il calendario completo degli eventi.",
    calendar: "Vedi calendario eventi",
    apartments: "Vedi appartamenti",
    ctaTitle: "Stai pianificando un soggiorno questa settimana?",
    ctaText: "Inviaci le date e confermeremo direttamente la disponibilita degli appartamenti.",
    check: "Controlla disponibilita",
    lastChecked: "Ultimo controllo",
    source: "Digest rivisto da una persona",
  },
  uk: {
    home: "Головна",
    events: "Події",
    title: "Цього тижня біля Ментона",
    seoTitle: "Цього тижня біля Ментона",
    description: "Основа щотижневого дайджесту з людською перевіркою для подій та локальних ідей біля Ментона, Монако, Ніцци й Санремо.",
    empty: "Оновлення цього тижня готується. Перегляньте повний календар подій.",
    calendar: "Переглянути календар подій",
    apartments: "Переглянути апартаменти",
    ctaTitle: "Плануєте перебування цього тижня?",
    ctaText: "Надішліть дати, і ми напряму підтвердимо доступність апартаментів.",
    check: "Перевірити доступність",
    lastChecked: "Остання перевірка",
    source: "Дайджест із людською перевіркою",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = copy[safeLocale];

  return createMetadata({
    locale: safeLocale,
    path: "events/this-week",
    title: labels.seoTitle,
    description: labels.description,
    type: "article",
  });
}

export default async function ThisWeekNearMentonPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = copy[locale];
  const digest = getPublicWeeklyDigest(locale);
  const pageUrl = absoluteUrl(localizedPath(locale, "events/this-week"));

  return (
    <>
      <JsonLdScript
        data={articleJsonLd({
          title: digest?.title ?? labels.title,
          description: digest?.summary ?? labels.description,
          url: pageUrl,
          locale,
        })}
      />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: labels.home, url: absoluteUrl(localizedPath(locale)) },
          { name: labels.events, url: absoluteUrl(localizedPath(locale, "events")) },
          { name: labels.title, url: pageUrl },
        ])}
      />

      <section className="border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="max-w-3xl py-12 sm:py-16">
            <p className="editorial-label">{labels.source}</p>
            <h1 className="serif-heading mt-4 text-5xl leading-[0.95] text-[#173f36] sm:text-6xl">{digest?.title ?? labels.title}</h1>
            <p className="mt-6 text-lg leading-8 text-[#5f574c]">{digest?.summary ?? labels.empty}</p>
            {digest?.lastChecked ? <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#b07820]">{labels.lastChecked}: {digest.lastChecked}</p> : null}
          </div>
        </Container>
      </section>

      <Section className="bg-[#fffaf0] py-10 sm:py-14">
        <Container>
          {digest?.items.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {digest.items.map((item) => (
                <Card key={`${item.city}-${item.title}`} className="p-5">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{item.city} · {item.dateLabel}</p>
                  <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.description}</p>
                  <p className="mt-3 text-sm leading-6 text-[#6f665b]">{item.travelNoteFromMenton}</p>
                  <a className="mt-4 inline-flex text-sm font-semibold text-[#0b6f8f] underline-offset-4 hover:underline" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                    Official source
                  </a>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6">
              <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{labels.empty}</h2>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link className="inline-flex min-h-11 items-center justify-center border border-[#173f36] bg-[#173f36] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]" href={`/${locale}/events` as Route}>
                  {labels.calendar}
                </Link>
                <Link className="inline-flex min-h-11 items-center justify-center border border-[#c6a66a] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={`/${locale}/apartments` as Route}>
                  {labels.apartments}
                </Link>
              </div>
            </Card>
          )}
        </Container>
      </Section>

      <Section className="py-10 sm:py-14">
        <Container>
          <BookingCTA
            locale={locale}
            title={labels.ctaTitle}
            text={labels.ctaText}
            primaryLabel={labels.check}
            secondaryLabel={labels.apartments}
            sourceAttribution={{ sourcePageType: "event", sourceSlug: "this-week-near-menton" }}
            trackingEventName={bookingFunnelEvents.eventCtaClick}
          />
        </Container>
      </Section>
    </>
  );
}
