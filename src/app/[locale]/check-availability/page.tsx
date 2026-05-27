import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { apartments } from "@/content/apartments";
import { t } from "@/content/translations";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Localized = Record<Locale, string>;
const text = (en: string, fr: string, it: string, uk: string): Localized => ({ en, fr, it, uk });

const copy = {
  eyebrow: text("Direct booking", "Réservation directe", "Prenotazione diretta", "Пряме бронювання"),
  title: text(
    "Tell us your dates and we’ll confirm availability personally",
    "Envoyez vos dates, nous confirmerons la disponibilité personnellement",
    "Inviaci le date e confermeremo personalmente la disponibilità",
    "Надішліть дати, і ми особисто підтвердимо доступність",
  ),
  intro: text(
    "Azur Menton handles booking requests directly and replies manually with the best available apartment and stay option.",
    "Azur Menton traite les demandes en direct et répond manuellement avec le meilleur appartement disponible et l’option de séjour adaptée.",
    "Azur Menton gestisce le richieste direttamente e risponde manualmente con l’appartamento disponibile e l’opzione più adatta.",
    "Azur Menton обробляє запити напряму й вручну відповідає з найкращим доступним варіантом апартаментів і перебування.",
  ),
  note: text(
    "Ideal for Riviera weekends, Lemon Festival stays and guests comparing apartments before booking.",
    "Idéal pour les week-ends Riviera, la Fête du Citron et les voyageurs qui comparent les appartements avant de réserver.",
    "Ideale per weekend in Riviera, Festa dei Limoni e ospiti che confrontano gli appartamenti prima di prenotare.",
    "Зручно для вікендів на Рив’єрі, Фестивалю лимонів і гостей, які порівнюють апартаменти перед бронюванням.",
  ),
  apartments: text("Explore apartments", "Explorer les appartements", "Esplora gli appartamenti", "Переглянути апартаменти"),
  guide: text("Menton guide", "Guide de Menton", "Guida di Mentone", "Гід Ментона"),
  formTitle: text("Direct request details", "Détails de la demande directe", "Dettagli della richiesta diretta", "Деталі прямого запиту"),
  formIntro: text(
    "Share the essentials and any context that helps us match your stay accurately.",
    "Indiquez l’essentiel et tout contexte utile pour adapter précisément votre séjour.",
    "Condividi le informazioni essenziali e il contesto utile per proporre il soggiorno giusto.",
    "Додайте основні дані та будь-який контекст, який допоможе точно підібрати перебування.",
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
  events: text("Riviera events", "Événements Riviera", "Eventi Riviera", "Події Рив’єри"),
  contact: text("Contact us directly", "Nous contacter", "Contattaci", "Написати напряму"),
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

export default async function CheckAvailabilityPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = t[safeLocale];

  return (
    <>
      <section className="border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="grid gap-10 py-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:py-16">
            <div>
              <p className="editorial-label">{copy.eyebrow[safeLocale]}</p>
              <h1 className="serif-heading mt-4 max-w-3xl text-5xl leading-[0.95] text-[#173f36] sm:text-6xl">
                {copy.title[safeLocale]}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f574c]">{copy.intro[safeLocale]}</p>
              <p className="mt-5 max-w-xl border-l border-[#c6a66a] pl-4 text-base leading-7 text-[#6b5f50]">{copy.note[safeLocale]}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/apartments`} variant="secondary">{copy.apartments[safeLocale]}</Button>
                <Button href={`/${safeLocale}/guide`} variant="secondary">{copy.guide[safeLocale]}</Button>
              </div>
            </div>
            <div className="relative overflow-hidden border border-[#dfd4c1] bg-white p-3">
              <Image
                src="/images/home/BeachfrontStudio-portret.jpg"
                alt="Sea-view balcony breakfast at an Azur Menton apartment"
                width={864}
                height={1184}
                priority
                quality={90}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full object-cover object-[50%_38%]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <aside className="grid gap-5 lg:sticky lg:top-28">
              <Card className="p-6">
                <p className="editorial-label">{copy.stepsTitle[safeLocale]}</p>
                <div className="mt-5 grid gap-4">
                  {steps.map((step) => (
                    <div key={step.number} className="grid grid-cols-[2.8rem_1fr] gap-4 border-t border-[#eadfce] pt-4 first:border-t-0 first:pt-0">
                      <span className="font-serif-display text-3xl leading-none text-[#c6a66a]">{step.number}</span>
                      <div>
                        <h2 className="text-base font-semibold leading-snug text-[#173f36]">{step.title[safeLocale]}</h2>
                        <p className="mt-1 text-base leading-7 text-[#5f574c]">{step.body[safeLocale]}</p>
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
                          quality={90}
                          sizes="96px"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-snug text-[#173f36]">{apartment.shortName[safeLocale]}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#5f574c]">{apartmentPositioning[apartment.slug][safeLocale]}</p>
                        <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#0b6f8f]">
                          {labels.upTo} {apartment.maxGuests} {copy.guests[safeLocale]} · {apartment.sizeSqm} m²
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <p className="editorial-label">{copy.reassuranceTitle[safeLocale]}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {reassurance.map((item) => (
                    <p key={item.en} className="border border-[#eadfce] bg-white/70 px-3 py-2 text-sm font-semibold leading-6 text-[#5f574c]">
                      {item[safeLocale]}
                    </p>
                  ))}
                </div>
              </Card>
            </aside>

            <div>
              <Card className="overflow-hidden bg-[#fffdf8]">
                <div className="grid grid-cols-3 gap-0 border-b border-[#dfd4c1]">
                  {[
                    "/images/home/SeaViewBalconyStudio.jpg",
                    "/images/home/TerraceParkingApartment.jpg",
                    "/images/home/BeachfrontStudio-portret.jpg",
                  ].map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden bg-[#efe4d1]">
                      <Image
                        src={src}
                        alt=""
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 16vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="p-5 sm:p-7">
                  <div className="mb-6">
                    <p className="editorial-label">{copy.eyebrow[safeLocale]}</p>
                    <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.formTitle[safeLocale]}</h2>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f574c]">{copy.formIntro[safeLocale]}</p>
                  </div>
                  <BookingRequestForm apartments={apartments} locale={safeLocale} />
                </div>
              </Card>

              <div className="mt-6 border-t border-[#dfd4c1] pt-6">
                <h2 className="serif-heading text-3xl leading-tight text-[#173f36]">{copy.afterTitle[safeLocale]}</h2>
                <p className="mt-3 text-base leading-7 text-[#5f574c]">{copy.afterText[safeLocale]}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href={`/${safeLocale}/apartments`} variant="secondary">{copy.compare[safeLocale]}</Button>
                  <Button href={`/${safeLocale}/guide`} variant="secondary">{copy.guide[safeLocale]}</Button>
                  <Button href={`/${safeLocale}/events`} variant="secondary">{copy.events[safeLocale]}</Button>
                  <Button href={`/${safeLocale}/contact`} variant="secondary">{copy.contact[safeLocale]}</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
