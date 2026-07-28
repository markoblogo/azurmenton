import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { BookingFunnelViewTracker } from "@/components/analytics/BookingFunnelViewTracker";
import { AvailabilityOverviewSection } from "@/components/availability/AvailabilityPanels";
import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { AdvanceBookingNotice } from "@/components/content/AdvanceBookingNotice";
import { TurnstileWidget } from "@/components/booking/TurnstileWidget";
import { ArrivalParkingBlock } from "@/components/content/ArrivalParkingBlock";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { apartments } from "@/content/apartments";
import { t } from "@/content/translations";
import { isLocale, type Locale } from "@/i18n/locales";
import { buildFlexibleAvailabilityHref, getAvailabilityPrefillFromSearchParams } from "@/lib/availability/prefill";
import { getPublicAllApartmentAvailability } from "@/lib/availability/service";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { contactPageJsonLd } from "@/lib/structured-data";
import { JsonLdScript } from "@/components/seo/JsonLd";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type Localized = Record<Locale, string>;
const text = (en: string, fr: string, it: string, uk: string): Localized => ({ en, fr, it, uk });

const copy = {
  eyebrow: text("Direct booking", "Réservation directe", "Prenotazione diretta", "Пряме бронювання"),
  availabilityEyebrow: text("Current availability", "Disponibilités actuelles", "Disponibilità attuale", "Поточна доступність"),
  title: text(
    "Find a stay that fits your dates",
    "Trouvez un séjour qui correspond à vos dates",
    "Trova un soggiorno adatto alle tue date",
    "Знайдіть перебування, яке підходить під ваші дати",
  ),
  intro: text(
    "Our apartments are often reserved several months ahead. Start with the nearest available periods below, or send flexible dates and we will help you find the best match.",
    "Nos appartements sont souvent réservés plusieurs mois à l’avance. Commencez par les périodes disponibles ci-dessous ou envoyez des dates flexibles et nous vous aiderons à trouver la meilleure option.",
    "I nostri appartamenti vengono spesso prenotati con diversi mesi di anticipo. Inizia dai periodi disponibili qui sotto oppure inviaci date flessibili e ti aiuteremo a trovare la soluzione migliore.",
    "Наші апартаменти часто бронюють за кілька місяців наперед. Почніть із найближчих доступних періодів нижче або надішліть гнучкі дати, і ми допоможемо знайти найкращий варіант.",
  ),
  note: text(
    "Short-notice gaps occasionally appear, especially after cancellations, so it is always worth checking.",
    "De courts créneaux apparaissent parfois à la dernière minute, surtout après une annulation, donc cela vaut toujours la peine de vérifier.",
    "A volte compaiono brevi disponibilità anche sotto data, soprattutto dopo cancellazioni, quindi vale sempre la pena controllare.",
    "Короткі вільні проміжки іноді з’являються в останній момент, особливо після скасувань, тож перевірити завжди варто.",
  ),
  viewAvailability: text("View available stays", "Voir les séjours disponibles", "Vedi i soggiorni disponibili", "Переглянути доступні періоди"),
  sendFlexible: text("Send flexible dates", "Envoyer des dates flexibles", "Invia date flessibili", "Надіслати гнучкі дати"),
  formTitle: text("Send your stay request", "Envoyer votre demande de séjour", "Invia la tua richiesta di soggiorno", "Надіслати запит на перебування"),
  formTitleSelected: text("Request the selected stay", "Demander le séjour sélectionné", "Richiedi il soggiorno selezionato", "Надіслати запит на вибране перебування"),
  formIntro: text(
    "We will verify the latest availability personally before confirming your booking.",
    "Nous vérifierons personnellement les dernières disponibilités avant de confirmer votre séjour.",
    "Verificheremo personalmente la disponibilità più aggiornata prima di confermare il soggiorno.",
    "Ми особисто перевіримо актуальну доступність перед підтвердженням вашого бронювання.",
  ),
  stepsTitle: text("How direct booking works", "Comment fonctionne la demande directe", "Come funziona la richiesta diretta", "Як працює прямий запит"),
  fitTitle: text("Which apartment fits?", "Quel appartement vous correspond ?", "Quale appartamento fa per te?", "Які апартаменти підійдуть?"),
  reassuranceTitle: text("Why guests request directly", "Pourquoi demander en direct", "Perché richiedere direttamente", "Чому гості звертаються напряму"),
  afterTitle: text("Need help before requesting?", "Besoin d’aide avant d’envoyer la demande ?", "Hai bisogno di aiuto prima della richiesta?", "Потрібна допомога перед запитом?"),
  afterText: text(
    "Compare the apartments, browse practical Menton notes or contact us directly if you are still choosing.",
    "Comparez les appartements, consultez les notes pratiques sur Menton ou contactez-nous si vous hésitez encore.",
    "Confronta gli appartamenti, leggi le note pratiche su Mentone o contattaci direttamente se stai ancora scegliendo.",
    "Порівняйте апартаменти, перегляньте практичні нотатки про Ментон або напишіть нам напряму, якщо ще обираєте.",
  ),
  compare: text("Compare apartments", "Comparer les appartements", "Confronta appartamenti", "Порівняти апартаменти"),
  guide: text("Menton guide", "Guide de Menton", "Guida di Mentone", "Гід Ментона"),
  events: text("Riviera events", "Événements Riviera", "Eventi Riviera", "Події Рив’єри"),
  contact: text("Contact us directly", "Nous contacter", "Contattaci", "Написати напряму"),
  flexibleTitle: text("Can’t find the right dates?", "Vous ne trouvez pas les bonnes dates ?", "Non trovi le date giuste?", "Не знаходите потрібні дати?"),
  flexibleBody: text(
    "Send us your preferred period, alternative dates and trip length. We will check the calendars personally and suggest the closest available option.",
    "Envoyez votre période préférée, des dates alternatives et la durée du séjour. Nous vérifierons les calendriers personnellement et proposerons l’option la plus proche.",
    "Inviaci il periodo preferito, date alternative e durata del soggiorno. Controlleremo personalmente i calendari e suggeriremo l’opzione più vicina.",
    "Надішліть бажаний період, альтернативні дати та тривалість поїздки. Ми особисто перевіримо календарі й запропонуємо найближчий доступний варіант.",
  ),
  guests: text("guests", "voyageurs", "ospiti", "гостей"),
  seoTitle: text(
    "Check Availability | Direct Booking Request | Azur Menton",
    "Vérifier disponibilité | Demande directe | Azur Menton",
    "Controlla disponibilità | Richiesta diretta | Azur Menton",
    "Перевірити доступність | Прямий запит | Azur Menton",
  ),
  seoDescription: text(
    "Send a direct booking request for Azur Menton apartments. We will confirm availability and the best direct offer manually.",
    "Envoyez une demande directe pour les appartements Azur Menton. Nous confirmerons disponibilité et meilleure offre manuellement.",
    "Invia una richiesta diretta per gli appartamenti Azur Menton. Confermeremo manualmente disponibilità e migliore offerta.",
    "Надішліть прямий запит на апартаменти Azur Menton. Ми вручну підтвердимо доступність і найкращу пряму пропозицію.",
  ),
};

const steps = [
  {
    number: "01",
    title: text("Choose dates and apartment preferences", "Choisissez dates et préférences", "Scegli date e preferenze", "Оберіть дати й побажання"),
    body: text("Tell us your approximate stay plan, guests and parking needs.", "Indiquez vos dates, voyageurs et besoin de parking.", "Indicaci date, ospiti e necessità di parcheggio.", "Вкажіть приблизні дати, гостей і потребу в паркуванні."),
  },
  {
    number: "02",
    title: text("Azur Menton checks manually", "Azur Menton vérifie manuellement", "Azur Menton verifica manualmente", "Azur Menton перевіряє вручну"),
    body: text("We check real availability and which apartment best matches your stay.", "Nous vérifions la disponibilité réelle et le meilleur choix d’appartement.", "Verifichiamo disponibilità reale e appartamento più adatto.", "Ми перевіряємо реальну доступність і відповідний варіант."),
  },
  {
    number: "03",
    title: text("You receive a direct response", "Vous recevez une réponse directe", "Ricevi una risposta diretta", "Ви отримуєте пряму відповідь"),
    body: text("We reply with the best available option and next steps.", "Nous répondons avec la meilleure option disponible et les étapes suivantes.", "Rispondiamo con l’opzione disponibile e i prossimi passi.", "Ми відповідаємо з найкращим доступним варіантом і наступними кроками."),
  },
];

const apartmentPositioning: Record<string, Localized> = {
  "sea-view-balcony-studio": text("Couples & beachfront mornings", "Couples & matins face à la mer", "Coppie e mattine sul mare", "Пари та ранки біля моря"),
  "beachside-family-apartment": text("Families & longer stays", "Familles & longs séjours", "Famiglie e soggiorni più lunghi", "Сім’ї та довші перебування"),
  "panoramic-sea-view-studio": text("Riviera weekends & Mediterranean views", "Week-ends Riviera & vues mer", "Weekend in Riviera e vista Mediterraneo", "Вікенди на Рив’єрі та види на море"),
};

const reassurance = [
  text("Direct communication", "Communication directe", "Comunicazione diretta", "Пряме спілкування"),
  text("Apartment guidance", "Conseil appartement", "Consiglio sull’appartamento", "Допомога з вибором"),
  text("Air conditioning", "Climatisation", "Aria condizionata", "Кондиціонер"),
  text("Riviera event planning help", "Aide pour les événements Riviera", "Aiuto per eventi Riviera", "Поради щодо подій"),
  text("No fake instant availability", "Pas de fausse disponibilité instantanée", "Nessuna falsa disponibilità istantanea", "Без фейкової миттєвої доступності"),
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    path: "check-availability",
    title: copy.seoTitle[safeLocale],
    description: copy.seoDescription[safeLocale],
  });
}

function localPath(locale: Locale, href: string) {
  return `/${locale}${href}` as Route;
}

export default async function CheckAvailabilityPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = t[safeLocale];
  const pageUrl = absoluteUrl(localizedPath(safeLocale, "check-availability"));
  const availability = await getPublicAllApartmentAvailability();
  const query = await searchParams;
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string") queryParams.set(key, value);
  }
  const prefill = getAvailabilityPrefillFromSearchParams(queryParams);
  const formTitle = prefill?.hasSelection ? copy.formTitleSelected[safeLocale] : copy.formTitle[safeLocale];

  return (
    <>
      <BookingFunnelViewTracker locale={safeLocale} />
      <JsonLdScript
        data={contactPageJsonLd({
          name: copy.seoTitle[safeLocale],
          description: copy.seoDescription[safeLocale],
          url: pageUrl,
          locale: safeLocale,
        })}
      />
      <section className="border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="max-w-4xl py-12 lg:py-14">
            <p className="editorial-label">{copy.availabilityEyebrow[safeLocale]}</p>
            <h1 className="serif-heading mt-4 max-w-4xl text-5xl leading-[0.95] text-[#173f36] sm:text-6xl">
              {copy.title[safeLocale]}
            </h1>
            <p className="mt-6 max-w-3xl text-[1.1rem] leading-8 text-[#5f574c]">{copy.intro[safeLocale]}</p>
            <p className="mt-5 max-w-3xl border-l border-[#c6a66a] pl-4 text-[1rem] leading-7 text-[#6b5f50]">{copy.note[safeLocale]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability#availability-hub`} variant="secondary">{copy.viewAvailability[safeLocale]}</Button>
              <Button href={buildFlexibleAvailabilityHref(safeLocale)}>{copy.sendFlexible[safeLocale]}</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container>
          <AdvanceBookingNotice locale={safeLocale} variant="availability" />
        </Container>
      </section>

      <section className="pb-10 sm:pb-12">
        <Container>
          <AvailabilityOverviewSection locale={safeLocale} availability={availability} />
        </Container>
      </section>

      <section className="pb-10 sm:pb-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
            <aside className="grid gap-5 lg:sticky lg:top-28">
              <Card className="p-6 sm:p-7">
                <p className="editorial-label">{copy.stepsTitle[safeLocale]}</p>
                <div className="mt-5 grid gap-5">
                  {steps.map((step) => (
                    <div key={step.number} className="grid grid-cols-[3.2rem_1fr] gap-4 border-t border-[#eadfce] pt-5 first:border-t-0 first:pt-0">
                      <span className="font-serif-display text-[2.55rem] leading-none text-[#c6a66a]">{step.number}</span>
                      <div>
                        <h2 className="text-[1.22rem] font-semibold leading-[1.35] text-[#173f36] sm:text-[1.26rem]">{step.title[safeLocale]}</h2>
                        <p className="mt-1.5 text-[1.1rem] leading-8 text-[#5f574c] sm:text-[1.12rem]">{step.body[safeLocale]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="p-6 pb-4">
                  <p className="editorial-label">{copy.fitTitle[safeLocale]}</p>
                  <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36]">{copy.fitTitle[safeLocale]}</h2>
                </div>
                <div className="grid gap-0">
                  {apartments.map((apartment) => (
                    <Link
                      key={apartment.slug}
                      href={localPath(safeLocale, `/apartments/${apartment.slug}`)}
                      className="group grid grid-cols-[5.8rem_1fr] gap-4 border-t border-[#eadfce] p-4 transition hover:bg-[#fbf7ef]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#efe4d1]">
                        <Image
                          src={apartment.cardImage}
                          alt={apartment.shortName[safeLocale]}
                          fill
                          sizes="96px"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div>
                        <h3 className="text-[1.08rem] font-semibold leading-snug text-[#173f36]">{apartment.shortName[safeLocale]}</h3>
                        <p className="mt-1 text-[1rem] leading-7 text-[#5f574c]">{apartmentPositioning[apartment.slug][safeLocale]}</p>
                        <p className="mt-2 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[#0b6f8f]">
                          {labels.upTo} {apartment.maxGuests} {copy.guests[safeLocale]} · {apartment.sizeSqm} m²
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className="p-5 sm:p-6">
                <p className="editorial-label">{copy.reassuranceTitle[safeLocale]}</p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {reassurance.map((item) => (
                    <p key={item.en} className="border border-[#eadfce] bg-white/70 px-3.5 py-2.5 text-[1rem] font-semibold leading-7 text-[#5f574c]">
                      {item[safeLocale]}
                    </p>
                  ))}
                </div>
              </Card>
            </aside>

            <div>
              <Card className="p-5 sm:p-6">
                <p className="editorial-label">{copy.sendFlexible[safeLocale]}</p>
                <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36]">{copy.flexibleTitle[safeLocale]}</h2>
                <p className="mt-3 max-w-3xl text-[1.05rem] leading-8 text-[#5f574c]">{copy.flexibleBody[safeLocale]}</p>
                <div className="mt-5">
                  <Button href={buildFlexibleAvailabilityHref(safeLocale)}>{copy.sendFlexible[safeLocale]}</Button>
                </div>
              </Card>

              <Card className="mt-6 overflow-hidden bg-[#fffdf8]">
                <div id="direct-request-form" className="scroll-mt-28" />
                <div className="p-5 sm:p-7">
                  <div className="mb-6">
                    <p className="editorial-label">{copy.eyebrow[safeLocale]}</p>
                    <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{formTitle}</h2>
                    <p className="mt-3 max-w-2xl text-[1.04rem] leading-7 text-[#5f574c]">{copy.formIntro[safeLocale]}</p>
                  </div>
                  <BookingRequestForm apartments={apartments} locale={safeLocale}>
                    <TurnstileWidget />
                  </BookingRequestForm>
                </div>
              </Card>

              <ArrivalParkingBlock className="mt-6" locale={safeLocale} context="booking" />

              <div className="mt-6 border-t border-[#dfd4c1] pt-6">
                <h2 className="serif-heading text-3xl leading-tight text-[#173f36]">{copy.afterTitle[safeLocale]}</h2>
                <p className="mt-3 max-w-3xl text-[1.08rem] leading-8 text-[#5f574c]">{copy.afterText[safeLocale]}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button className="min-h-12 px-5 text-[0.76rem]" href={`/${safeLocale}/apartments`} variant="secondary">{copy.compare[safeLocale]}</Button>
                  <Button className="min-h-12 px-5 text-[0.76rem]" href={`/${safeLocale}/guide`} variant="secondary">{copy.guide[safeLocale]}</Button>
                  <Button className="min-h-12 px-5 text-[0.76rem]" href={`/${safeLocale}/events`} variant="secondary">{copy.events[safeLocale]}</Button>
                  <Button className="min-h-12 px-5 text-[0.76rem]" href={`/${safeLocale}/contact`} variant="secondary">{copy.contact[safeLocale]}</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
