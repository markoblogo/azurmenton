import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/locales";
import { bookingFunnelEvents } from "@/lib/analytics";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Localized = Record<Locale, string>;
const text = (en: string, fr: string, it: string, uk: string): Localized => ({ en, fr, it, uk });

const copy = {
  eyebrow: text("Azur Menton", "Azur Menton", "Azur Menton", "Azur Menton"),
  title: text(
    "Speak with the family behind Azur Menton",
    "Échanger avec la famille derrière Azur Menton",
    "Parla con la famiglia dietro Azur Menton",
    "Зв’яжіться з родиною Azur Menton",
  ),
  intro: text(
    "Questions about beaches, Riviera events, train travel, family stays or the best apartment for your trip? Send your dates and we’ll help personally.",
    "Questions sur les plages, les événements Riviera, le train, les séjours en famille ou le meilleur appartement pour votre voyage ? Envoyez vos dates, nous vous aiderons personnellement.",
    "Domande su spiagge, eventi Riviera, treni, soggiorni in famiglia o sull’appartamento più adatto? Inviaci le date e ti aiuteremo personalmente.",
    "Питання про пляжі, події Рив’єри, поїзди, сімейний відпочинок або найкращі апартаменти для вашої подорожі? Надішліть дати, і ми допоможемо особисто.",
  ),
  checkAvailability: text("Check availability", "Vérifier disponibilité", "Controlla disponibilità", "Перевірити доступність"),
  viewApartments: text("View apartments", "Voir les appartements", "Vedi appartamenti", "Переглянути апартаменти"),
  guide: text("Explore Menton guide", "Explorer le guide de Menton", "Esplora la guida di Mentone", "Відкрити гід Ментона"),
  email: text("Email us", "Envoyer un email", "Scrivici via email", "Написати email"),
  whatsapp: text("WhatsApp us", "WhatsApp", "WhatsApp", "Написати у WhatsApp"),
  response: text(
    "We usually reply personally within a reasonable time during the day.",
    "Nous répondons généralement personnellement dans un délai raisonnable pendant la journée.",
    "Di solito rispondiamo personalmente in tempi ragionevoli durante il giorno.",
    "Зазвичай ми відповідаємо особисто протягом розумного часу вдень.",
  ),
  askTitle: text(
    "What guests usually ask before booking",
    "Ce que les voyageurs demandent souvent avant de réserver",
    "Cosa chiedono spesso gli ospiti prima di prenotare",
    "Що гості часто запитують перед бронюванням",
  ),
  askEyebrow: text("Concierge notes", "Notes concierge", "Note concierge", "Нотатки консьєржа"),
  finalTitle: text("Planning your Riviera stay?", "Vous préparez votre séjour sur la Riviera ?", "Stai pianificando il soggiorno in Riviera?", "Плануєте перебування на Рив’єрі?"),
  finalText: text(
    "Send your dates and we’ll confirm availability personally.",
    "Envoyez vos dates et nous confirmerons la disponibilité personnellement.",
    "Inviaci le date e confermeremo personalmente la disponibilità.",
    "Надішліть дати, і ми особисто підтвердимо доступність.",
  ),
};

const contactCards = [
  {
    title: text("Direct booking requests", "Demandes de réservation directe", "Richieste di prenotazione diretta", "Прямі запити на бронювання"),
    body: text(
      "Best if you already know your approximate travel dates and want a direct availability request.",
      "Idéal si vous connaissez déjà vos dates approximatives et souhaitez demander la disponibilité en direct.",
      "Ideale se conosci già le date indicative e vuoi inviare una richiesta diretta.",
      "Найкраще, якщо ви вже знаєте приблизні дати й хочете надіслати прямий запит щодо доступності.",
    ),
    href: "/check-availability",
    label: copy.checkAvailability,
  },
  {
    title: text("Practical questions", "Questions pratiques", "Domande pratiche", "Практичні питання"),
    body: text(
      "Need help choosing between Garavan, the seafront, beaches or Monaco access? Start with the Menton Guide or contact us directly.",
      "Besoin d’aide entre Garavan, le front de mer, les plages ou l’accès à Monaco ? Commencez par le guide de Menton ou contactez-nous.",
      "Serve aiuto tra Garavan, lungomare, spiagge o accesso a Monaco? Inizia dalla guida di Mentone o contattaci.",
      "Потрібна допомога з вибором між Garavan, набережною, пляжами чи доступом до Монако? Почніть з гіда Ментона або напишіть нам.",
    ),
    href: "/guide",
    label: copy.guide,
  },
];

const commonQuestions = [
  {
    title: text("Which apartment is quietest?", "Quel appartement est le plus calme ?", "Quale appartamento è più tranquillo?", "Які апартаменти найтихіші?"),
    href: "/faq",
    label: text("Read FAQ", "Lire la FAQ", "Leggi FAQ", "Читати FAQ"),
  },
  {
    title: text("Best apartment for Monaco weekends?", "Meilleur appartement pour les week-ends à Monaco ?", "Miglior appartamento per weekend a Monaco?", "Найкращі апартаменти для вікендів у Монако?"),
    href: "/events/monaco-grand-prix",
    label: text("Monaco event guide", "Guide événement Monaco", "Guida eventi Monaco", "Гід подій Монако"),
  },
  {
    title: text("Is parking useful in Menton?", "Le parking est-il utile à Menton ?", "Il parcheggio è utile a Mentone?", "Чи корисне паркування в Ментоні?"),
    href: "/guide/public-transport-in-menton",
    label: text("Transport guide", "Guide transports", "Guida trasporti", "Гід транспорту"),
  },
  {
    title: text("Can we stay without a car?", "Peut-on séjourner sans voiture ?", "Si può soggiornare senza auto?", "Чи можна жити без авто?"),
    href: "/guide/menton-without-a-car",
    label: text("No-car guide", "Guide sans voiture", "Guida senza auto", "Гід без авто"),
  },
];

const seo = {
  title: text(
    "Contact Azur Menton | Direct booking and Riviera stay questions",
    "Contact Azur Menton | Réservation directe et questions de séjour",
    "Contatti Azur Menton | Prenotazione diretta e domande sul soggiorno",
    "Контакти Azur Menton | Пряме бронювання та питання про перебування",
  ),
  description: text(
    "Contact Azur Menton for direct booking requests, apartment questions, beaches, Riviera events, train travel and practical stay planning in Menton.",
    "Contactez Azur Menton pour les demandes directes, les questions sur les appartements, les plages, les événements Riviera, le train et le séjour à Menton.",
    "Contatta Azur Menton per richieste dirette, domande sugli appartamenti, spiagge, eventi Riviera, treni e pianificazione pratica a Mentone.",
    "Зв’яжіться з Azur Menton щодо прямих запитів, апартаментів, пляжів, подій Рив’єри, поїздів і практичного планування перебування в Ментоні.",
  ),
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    path: "contact",
    title: seo.title[safeLocale],
    description: seo.description[safeLocale],
  });
}

function localPath(locale: Locale, href: string) {
  return `/${locale}${href}` as Route;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const contactTrackingProps = { locale: safeLocale, sourcePageType: "other" as const, sourceSlug: "contact" };

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Azur Menton", url: `https://azurmenton.com/${safeLocale}` },
          { name: "Contact", url: `https://azurmenton.com/${safeLocale}/contact` },
        ])}
      />

      <section className="border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="grid gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
            <div>
              <p className="editorial-label">{copy.eyebrow[safeLocale]}</p>
              <h1 className="serif-heading mt-4 max-w-3xl text-5xl leading-[0.95] text-[#173f36] sm:text-6xl">
                {copy.title[safeLocale]}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f574c]">{copy.intro[safeLocale]}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{copy.checkAvailability[safeLocale]}</Button>
                <Button href={`/${safeLocale}/apartments`} variant="secondary">{copy.viewApartments[safeLocale]}</Button>
              </div>
            </div>
            <div className="relative overflow-hidden border border-[#dfd4c1] bg-white p-3">
              <Image
                src="/images/apartments/panoramic-sea-view-studio/02-balcony-harbour-view.jpg"
                alt="Mediterranean harbour and seafront view from an Azur Menton apartment"
                width={1462}
                height={1076}
                preload
                quality={90}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full object-cover object-[50%_50%]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {contactCards.map((item) => (
              <Card key={item.title.en} className="p-6">
                <p className="editorial-label">Azur Menton</p>
                <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36]">{item.title[safeLocale]}</h2>
                <p className="mt-4 text-sm leading-6 text-[#5f574c]">{item.body[safeLocale]}</p>
                <Link
                  href={localPath(safeLocale, item.href)}
                  className="mt-5 inline-flex text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0b6f8f] underline decoration-[#0b6f8f]/25 underline-offset-4 hover:text-[#173f36]"
                >
                  {item.label[safeLocale]}
                </Link>
              </Card>
            ))}
            <Card className="p-6">
              <p className="editorial-label">WhatsApp & email</p>
              <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36]">WhatsApp & email</h2>
              <p className="mt-4 text-sm leading-6 text-[#5f574c]">{copy.response[safeLocale]}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <TrackedLink
                  className="inline-flex min-h-11 items-center justify-center border border-[#173f36] bg-[#173f36] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#102f28]"
                  eventName={bookingFunnelEvents.emailClick}
                  href={`mailto:${siteConfig.email}`}
                  props={contactTrackingProps}
                >
                  {copy.email[safeLocale]}
                </TrackedLink>
                <TrackedLink
                  className="inline-flex min-h-11 items-center justify-center border border-[#c6a66a] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#173f36] transition hover:bg-[#f3ead7]"
                  eventName={bookingFunnelEvents.whatsappClick}
                  href={siteConfig.whatsappHref}
                  props={contactTrackingProps}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {copy.whatsapp[safeLocale]}
                </TrackedLink>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#dfd4c1] bg-[#f6efe3] py-12 sm:py-16">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="editorial-label">{copy.askEyebrow[safeLocale]}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.askTitle[safeLocale]}</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {commonQuestions.map((item) => (
              <Link key={item.href} href={localPath(safeLocale, item.href)} className="group block">
                <Card className="h-full p-5 transition group-hover:border-[#c6a66a]">
                  <h3 className="serif-heading text-2xl leading-tight text-[#173f36]">{item.title[safeLocale]}</h3>
                  <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0b6f8f]">{item.label[safeLocale]}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-6 border-t border-[#dfd4c1] pt-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="serif-heading text-4xl leading-tight text-[#173f36]">{copy.finalTitle[safeLocale]}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f574c]">{copy.finalText[safeLocale]}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability`}>{copy.checkAvailability[safeLocale]}</Button>
              <Button href={`/${safeLocale}/apartments`} variant="secondary">{copy.viewApartments[safeLocale]}</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
