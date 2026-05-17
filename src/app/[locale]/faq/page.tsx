import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { apartments } from "@/content/apartments";
import { isLocale, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Localized = Record<Locale, string>;
type FaqQuestion = { question: Localized; answer: Localized; links?: Array<{ label: Localized; href: string }> };
type FaqSection = { title: Localized; intro: Localized; questions: FaqQuestion[] };

const text = (en: string, fr: string, it: string, uk: string): Localized => ({ en, fr, it, uk });

const copy = {
  eyebrow: text("Azur Menton FAQ", "FAQ Azur Menton", "FAQ Azur Menton", "FAQ Azur Menton"),
  title: text(
    "Planning your stay with Azur Menton",
    "Préparer votre séjour avec Azur Menton",
    "Organizzare il soggiorno con Azur Menton",
    "Планування перебування з Azur Menton",
  ),
  intro: text(
    "Practical answers about direct booking requests, apartment differences, beaches, Riviera events, parking and staying in Menton without a car.",
    "Réponses pratiques sur les demandes directes, les différences entre appartements, les plages, les événements, le parking et un séjour sans voiture à Menton.",
    "Risposte pratiche su richieste dirette, differenze tra appartamenti, spiagge, eventi, parcheggio e soggiorni a Mentone senza auto.",
    "Практичні відповіді про прямі запити, відмінності між апартаментами, пляжі, події Рив’єри, паркування та перебування в Ментоні без авто.",
  ),
  checkAvailability: text("Check availability", "Vérifier disponibilité", "Controlla disponibilità", "Перевірити доступність"),
  exploreApartments: text("Explore apartments", "Explorer les appartements", "Esplora gli appartamenti", "Переглянути апартаменти"),
  viewApartment: text("View apartment", "Voir l’appartement", "Vedi appartamento", "Переглянути апартаменти"),
  viewEvents: text("View Riviera events", "Voir les événements Riviera", "Vedi eventi Riviera", "Переглянути події Рив’єри"),
  compareTitle: text("Choosing the right apartment", "Choisir le bon appartement", "Scegliere l’appartamento giusto", "Як обрати апартаменти"),
  compareIntro: text(
    "The apartments are close to the sea, but they suit different styles of stay.",
    "Les appartements sont proches de la mer, mais chacun correspond à un style de séjour différent.",
    "Gli appartamenti sono vicini al mare, ma rispondono a stili di soggiorno diversi.",
    "Апартаменти розташовані близько до моря, але підходять для різних форматів подорожі.",
  ),
  eventsTitle: text("Riviera events and seasonality", "Événements Riviera et saisons", "Eventi Riviera e stagionalità", "Події Рив’єри та сезонність"),
  eventsIntro: text(
    "Menton’s Lemon Festival, Monaco weekends and summer music dates can make early requests useful.",
    "La Fête du Citron, les week-ends à Monaco et les soirées d’été rendent les demandes anticipées utiles.",
    "La Festa dei Limoni, i weekend a Monaco e le serate estive rendono utile richiedere in anticipo.",
    "Фестиваль лимонів, вікенди в Монако та літні події роблять ранній запит особливо корисним.",
  ),
  finalTitle: text(
    "Still deciding where to stay in Menton?",
    "Vous hésitez encore où séjourner à Menton ?",
    "Stai ancora scegliendo dove soggiornare a Mentone?",
    "Ще обираєте, де зупинитися в Ментоні?",
  ),
  finalText: text(
    "Tell us your travel dates and we’ll help you choose the apartment that best fits your stay.",
    "Envoyez vos dates et nous vous aiderons à choisir l’appartement le plus adapté.",
    "Inviaci le date e ti aiuteremo a scegliere l’appartamento più adatto.",
    "Надішліть дати подорожі, і ми допоможемо обрати апартаменти, які найкраще підходять.",
  ),
};

const faqSections: FaqSection[] = [
  {
    title: text("Booking & availability", "Réservation & disponibilité", "Prenotazione e disponibilità", "Бронювання та доступність"),
    intro: text(
      "Direct requests are confirmed personally, so guests receive a real answer instead of a fake instant calendar.",
      "Les demandes directes sont confirmées personnellement : vous recevez une vraie réponse, pas un faux calendrier instantané.",
      "Le richieste dirette sono confermate personalmente: ricevi una risposta reale, non un calendario automatico fittizio.",
      "Прямі запити підтверджуються особисто, тож гості отримують реальну відповідь, а не умовний миттєвий календар.",
    ),
    questions: [
      {
        question: text("Is this instant booking?", "Est-ce une réservation instantanée ?", "È una prenotazione istantanea?", "Це миттєве бронювання?"),
        answer: text(
          "No. The website sends a direct booking request. We check availability manually and reply with the best direct offer.",
          "Non. Le site envoie une demande directe. Nous vérifions la disponibilité manuellement et répondons avec la meilleure offre directe.",
          "No. Il sito invia una richiesta diretta. Verifichiamo manualmente la disponibilità e rispondiamo con la migliore offerta diretta.",
          "Ні. Сайт надсилає прямий запит. Ми вручну перевіряємо доступність і відповідаємо з найкращою прямою пропозицією.",
        ),
      },
      {
        question: text("Why are prices not shown directly?", "Pourquoi les prix ne sont-ils pas affichés ?", "Perché i prezzi non sono mostrati direttamente?", "Чому ціни не показані одразу?"),
        answer: text(
          "Direct pricing depends on dates, apartment, length of stay and confirmed conditions. We prefer to send a clear offer rather than publish unconfirmed prices.",
          "Le prix direct dépend des dates, de l’appartement, de la durée et des conditions confirmées. Nous préférons envoyer une offre claire plutôt que publier des prix non confirmés.",
          "Il prezzo diretto dipende da date, appartamento, durata e condizioni confermate. Preferiamo inviare un’offerta chiara invece di pubblicare prezzi non confermati.",
          "Пряма ціна залежить від дат, апартаментів, тривалості перебування та підтверджених умов. Краще надіслати чітку пропозицію, ніж показувати непідтверджені ціни.",
        ),
      },
      {
        question: text("How quickly do you reply?", "Sous quel délai répondez-vous ?", "Quanto velocemente rispondete?", "Як швидко ви відповідаєте?"),
        answer: text(
          "Requests are handled personally. We usually reply within a reasonable time during the day, depending on the information needed.",
          "Les demandes sont traitées personnellement. Nous répondons généralement dans un délai raisonnable pendant la journée, selon les informations nécessaires.",
          "Le richieste sono gestite personalmente. Di solito rispondiamo in tempi ragionevoli durante il giorno, secondo le informazioni necessarie.",
          "Запити обробляються особисто. Зазвичай ми відповідаємо протягом розумного часу вдень, залежно від потрібної інформації.",
        ),
      },
    ],
  },
  {
    title: text("Staying in Menton", "Séjourner à Menton", "Soggiornare a Mentone", "Перебування в Ментоні"),
    intro: text(
      "For many guests, the easiest plan is beach, old town, market and train days without relying on a car.",
      "Pour beaucoup de voyageurs, le plus simple est de profiter des plages, de la vieille ville, du marché et du train sans voiture.",
      "Per molti ospiti il piano più semplice è mare, centro storico, mercato e treno senza dipendere dall’auto.",
      "Для багатьох гостей найзручніше — пляж, старе місто, ринок і поїздки потягом без залежності від авто.",
    ),
    questions: [
      {
        question: text("Is Menton walkable?", "Menton se visite-t-elle à pied ?", "Mentone è comoda a piedi?", "Чи зручно ходити Ментоном пішки?"),
        answer: text(
          "Yes. Central Menton is very walkable along the seafront, with beaches, cafés, the old town and the market close together.",
          "Oui. Le centre de Menton se parcourt très bien à pied le long du front de mer, avec plages, cafés, vieille ville et marché proches.",
          "Sì. Il centro di Mentone è molto comodo a piedi lungo il lungomare, con spiagge, caffè, centro storico e mercato vicini.",
          "Так. Центральним Ментоном зручно гуляти вздовж набережної: пляжі, кав’ярні, старе місто й ринок поруч.",
        ),
        links: [
          { label: text("Menton without a car", "Menton sans voiture", "Mentone senza auto", "Ментон без авто"), href: "/guide/menton-without-a-car" },
        ],
      },
      {
        question: text("Do I need a car?", "Ai-je besoin d’une voiture ?", "Serve un’auto?", "Чи потрібна машина?"),
        answer: text(
          "Not for a beach-focused central stay. A car can help for hill villages, luggage-heavy arrivals or remote gardens, but trains and walking cover many plans.",
          "Pas pour un séjour central axé sur la plage. Une voiture peut aider pour les villages perchés, les bagages ou certains jardins, mais marche et train suffisent souvent.",
          "Non per un soggiorno centrale orientato al mare. L’auto può aiutare per borghi collinari, bagagli o giardini più lontani, ma treno e cammino bastano spesso.",
          "Для відпочинку в центрі біля моря — не обов’язково. Авто зручне для гірських сіл, багажу чи віддалених садів, але багато планів покривають пішки й потягом.",
        ),
        links: [
          { label: text("Public transport in Menton", "Transports publics à Menton", "Trasporti pubblici a Mentone", "Громадський транспорт у Ментоні"), href: "/guide/public-transport-in-menton" },
        ],
      },
      {
        question: text("Which beaches are closest?", "Quelles plages sont les plus proches ?", "Quali spiagge sono più vicine?", "Які пляжі найближчі?"),
        answer: text(
          "It depends on the apartment, but the central seafront and Sablettes/Garavan side are easy to understand on foot.",
          "Cela dépend de l’appartement, mais le front de mer central et le secteur Sablettes/Garavan sont faciles à comprendre à pied.",
          "Dipende dall’appartamento, ma il lungomare centrale e la zona Sablettes/Garavan sono facili da orientare a piedi.",
          "Це залежить від апартаментів, але центральна набережна та зона Sablettes/Garavan зрозумілі й зручні пішки.",
        ),
        links: [
          { label: text("Best beaches in Menton", "Meilleures plages de Menton", "Migliori spiagge di Mentone", "Найкращі пляжі Ментона"), href: "/guide/best-beaches-in-menton" },
        ],
      },
    ],
  },
  {
    title: text("Arrival & practical details", "Arrivée & détails pratiques", "Arrivo e dettagli pratici", "Прибуття та практичні деталі"),
    intro: text(
      "A few practical points make the stay smoother, especially during events or if you arrive by car.",
      "Quelques points pratiques rendent le séjour plus simple, surtout pendant les événements ou si vous arrivez en voiture.",
      "Alcuni dettagli pratici rendono il soggiorno più semplice, soprattutto durante eventi o se arrivi in auto.",
      "Кілька практичних деталей роблять перебування простішим, особливо під час подій або при прибутті на авто.",
    ),
    questions: [
      {
        question: text("Is parking useful in Menton?", "Le parking est-il utile à Menton ?", "Il parcheggio è utile a Mentone?", "Чи корисне паркування в Ментоні?"),
        answer: text(
          "Yes, parking can be valuable in central Menton. It should always be requested in advance and depends on the apartment and confirmed conditions.",
          "Oui, le parking peut être précieux dans le centre de Menton. Il doit toujours être demandé à l’avance et dépend de l’appartement et des conditions confirmées.",
          "Sì, il parcheggio può essere prezioso nel centro di Mentone. Va sempre richiesto in anticipo e dipende dall’appartamento e dalle condizioni confermate.",
          "Так, паркування в центрі Ментона може бути дуже корисним. Його слід запитувати заздалегідь; умови залежать від апартаментів і підтвердження.",
        ),
      },
      {
        question: text("Can children stay?", "Les enfants peuvent-ils séjourner ?", "I bambini possono soggiornare?", "Чи можна з дітьми?"),
        answer: text(
          "Yes. The terrace apartment is usually the most practical choice for families; the studios are better for couples or smaller groups.",
          "Oui. L’appartement avec terrasse est généralement le plus pratique pour les familles ; les studios conviennent mieux aux couples ou petits groupes.",
          "Sì. L’appartamento con terrazza è di solito più pratico per famiglie; i monolocali sono più adatti a coppie o piccoli gruppi.",
          "Так. Апартаменти з терасою зазвичай найпрактичніші для сімей; студії краще підходять парам або невеликим групам.",
        ),
      },
    ],
  },
];

const seo = {
  title: text(
    "Planning your stay with Azur Menton | FAQ",
    "Préparer votre séjour avec Azur Menton | FAQ",
    "Organizzare il soggiorno con Azur Menton | FAQ",
    "Планування перебування з Azur Menton | FAQ",
  ),
  description: text(
    "Practical FAQ for Azur Menton guests: direct booking requests, apartment choice, beaches, parking, Riviera events and staying in Menton without a car.",
    "FAQ pratique pour les voyageurs Azur Menton : demandes directes, choix d’appartement, plages, parking, événements Riviera et séjour sans voiture.",
    "FAQ pratica per gli ospiti Azur Menton: richieste dirette, scelta dell’appartamento, spiagge, parcheggio, eventi Riviera e soggiorno senza auto.",
    "Практичний FAQ для гостей Azur Menton: прямі запити, вибір апартаментів, пляжі, паркування, події Рив’єри та перебування без авто.",
  ),
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    path: "faq",
    title: seo.title[safeLocale],
    description: seo.description[safeLocale],
  });
}

function localPath(locale: Locale, href: string) {
  return `/${locale}${href}` as Route;
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const visibleFaqs = faqSections.flatMap((section) =>
    section.questions.map((item) => ({ question: item.question[safeLocale], answer: item.answer[safeLocale] })),
  );

  return (
    <>
      <JsonLdScript data={faqPageJsonLd(visibleFaqs)} />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Azur Menton", url: `https://azurmenton.com/${safeLocale}` },
          { name: "FAQ", url: `https://azurmenton.com/${safeLocale}/faq` },
        ])}
      />

      <section className="border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
            <div>
              <p className="editorial-label">{copy.eyebrow[safeLocale]}</p>
              <h1 className="serif-heading mt-4 max-w-3xl text-5xl leading-[0.95] text-[#173f36] sm:text-6xl">
                {copy.title[safeLocale]}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f574c]">{copy.intro[safeLocale]}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{copy.checkAvailability[safeLocale]}</Button>
                <Button href={`/${safeLocale}/apartments`} variant="secondary">{copy.exploreApartments[safeLocale]}</Button>
              </div>
            </div>
            <div className="relative overflow-hidden border border-[#dfd4c1] bg-white p-3">
              <Image
                src="/images/home/faq-hero.png"
                alt="Riviera planning scene for Azur Menton guest questions"
                width={1602}
                height={981}
                priority
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
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="editorial-label">{faqSections[0].title[safeLocale]}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.title[safeLocale]}</h2>
            </div>
            <div className="grid gap-6">
              {faqSections.map((section) => (
                <section key={section.title.en} className="border-t border-[#dfd4c1] pt-6">
                  <div className="grid gap-5 md:grid-cols-[0.38fr_0.62fr]">
                    <div>
                      <h3 className="serif-heading text-3xl leading-tight text-[#173f36]">{section.title[safeLocale]}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#6b5f50]">{section.intro[safeLocale]}</p>
                    </div>
                    <div className="grid gap-3">
                      {section.questions.map((item) => (
                        <Card key={item.question.en} className="p-5">
                          <h4 className="text-base font-semibold text-[#173f36]">{item.question[safeLocale]}</h4>
                          <p className="mt-2 text-sm leading-6 text-[#5f574c]">{item.answer[safeLocale]}</p>
                          {item.links ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={localPath(safeLocale, link.href)}
                                  className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0b6f8f] underline decoration-[#0b6f8f]/25 underline-offset-4 hover:text-[#173f36]"
                                >
                                  {link.label[safeLocale]}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#dfd4c1] bg-[#f6efe3] py-12 sm:py-16">
        <Container>
          <div className="flex flex-col justify-between gap-5 border-b border-[#dfd4c1] pb-8 md:flex-row md:items-end">
            <div>
              <p className="editorial-label">{copy.compareTitle[safeLocale]}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.compareTitle[safeLocale]}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[#5f574c]">{copy.compareIntro[safeLocale]}</p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.slug} apartment={apartment} locale={safeLocale} compact />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="editorial-label">{copy.eventsTitle[safeLocale]}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36]">{copy.eventsTitle[safeLocale]}</h2>
              <p className="mt-4 text-base leading-7 text-[#5f574c]">{copy.eventsIntro[safeLocale]}</p>
              <div className="mt-6">
                <Button href={`/${safeLocale}/events`} variant="secondary">{copy.viewEvents[safeLocale]}</Button>
              </div>
            </div>
            <div className="relative overflow-hidden border border-[#dfd4c1] bg-white p-3">
              <Image
                src="/images/events/menton-lemon-festival.png"
                alt="Illustration of Menton Lemon Festival and Riviera events"
                width={1270}
                height={900}
                quality={90}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#111615] py-12 text-white sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="serif-heading text-4xl leading-tight sm:text-5xl">{copy.finalTitle[safeLocale]}</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">{copy.finalText[safeLocale]}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability`}>{copy.checkAvailability[safeLocale]}</Button>
              <Button href={`/${safeLocale}/apartments`} variant="secondary">{copy.exploreApartments[safeLocale]}</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
