import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/locales";
import { bookingFunnelEvents } from "@/lib/analytics";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Localized = Record<Locale, string>;
const t = (en: string, fr: string, it: string, uk: string): Localized => ({ en, fr, it, uk });

const copy = {
  eyebrow: t("Azur Menton", "Azur Menton", "Azur Menton", "Azur Menton"),
  title: t("For local partners", "Partenaires locaux", "Per partner locali", "Для локальних партнерів"),
  seoTitle: t("For local partners", "Partenaires locaux", "Per partner locali", "Для локальних партнерів"),
  description: t(
    "Information for local Menton businesses interested in discreet guest samples, vouchers or small welcome perks with Azur Menton.",
    "Informations pour les entreprises locales de Menton interessees par des echantillons, bons ou petites attentions pour les voyageurs Azur Menton.",
    "Informazioni per attivita locali di Mentone interessate a campioni, voucher o piccoli omaggi per gli ospiti Azur Menton.",
    "Інформація для локальних бізнесів Ментона щодо невеликих зразків, ваучерів або подарунків для гостей Azur Menton.",
  ),
  intro: t(
    "Azur Menton hosts short-stay guests in central Menton. From time to time, we may include selected local samples, vouchers or small guest gifts in a welcome setting.",
    "Azur Menton accueille des voyageurs de court sejour dans le centre de Menton. De temps en temps, nous pouvons inclure des echantillons locaux, bons ou petites attentions selectionnes dans l'accueil des voyageurs.",
    "Azur Menton ospita soggiorni brevi nel centro di Mentone. Di tanto in tanto possiamo includere campioni locali selezionati, voucher o piccoli omaggi di benvenuto.",
    "Azur Menton приймає гостей на короткі перебування в центрі Ментона. Час від часу ми можемо додавати вибрані локальні зразки, ваучери або невеликі подарунки до welcome-набору.",
  ),
  samplingTitle: t("What free sampling means", "Ce que signifie l'echantillonnage gratuit", "Cosa significa campionatura gratuita", "Що означає безкоштовне семплування"),
  fitTitle: t("What usually fits best", "Ce qui convient le mieux", "Cosa funziona meglio", "Що зазвичай підходить найкраще"),
  careTitle: t("Practical limits", "Limites pratiques", "Limiti pratici", "Практичні обмеження"),
  sponsoredTitle: t("Sponsored visibility", "Visibilite sponsorisee", "Visibilita sponsorizzata", "Спонсорована видимість"),
  ctaTitle: t("Interested in a small guest sample?", "Vous souhaitez proposer un echantillon ?", "Vuoi proporre un piccolo omaggio?", "Хочете запропонувати невеликий зразок?"),
  ctaText: t(
    "Send a short note with the item, storage needs, suggested guest use and monthly quantity available.",
    "Envoyez une courte note avec l'article, les besoins de stockage, l'usage propose pour les voyageurs et la quantite mensuelle disponible.",
    "Invia una breve nota con il prodotto, le esigenze di conservazione, l'uso previsto per gli ospiti e la quantita mensile disponibile.",
    "Надішліть короткий опис товару, умови зберігання, користь для гостей і доступну місячну кількість.",
  ),
  email: t("Email Azur Menton", "Envoyer un email", "Scrivi ad Azur Menton", "Написати Azur Menton"),
};

const sections = [
  {
    title: copy.samplingTitle,
    items: [
      t("The partner provides samples or vouchers at no cost.", "Le partenaire fournit les echantillons ou bons gratuitement.", "Il partner fornisce campioni o voucher senza costi.", "Партнер надає зразки або ваучери безкоштовно."),
      t("Azur Menton does not pay for them.", "Azur Menton ne les paie pas.", "Azur Menton non li paga.", "Azur Menton за них не платить."),
      t("The partner does not pay Azur Menton.", "Le partenaire ne paie pas Azur Menton.", "Il partner non paga Azur Menton.", "Партнер не платить Azur Menton."),
      t("Free sampling does not guarantee public website placement.", "L'echantillonnage gratuit ne garantit pas une presence publique sur le site.", "La campionatura gratuita non garantisce visibilita pubblica sul sito.", "Безкоштовне семплування не гарантує публічне розміщення на сайті."),
    ],
  },
  {
    title: copy.fitTitle,
    items: [
      t("Sealed, clean and clearly labelled items.", "Articles scelles, propres et clairement etiquetes.", "Articoli sigillati, puliti e chiaramente etichettati.", "Запаковані, чисті й чітко марковані речі."),
      t("Easy to store and suitable for short-stay guests.", "Faciles a stocker et adaptes aux courts sejours.", "Facili da conservare e adatti a soggiorni brevi.", "Легкі для зберігання й доречні для коротких перебувань."),
      t("Small monthly volume to start: about 10-15 units.", "Volume mensuel modeste pour commencer : environ 10 a 15 unites.", "Volume mensile iniziale contenuto: circa 10-15 unita.", "Невеликий стартовий обсяг: приблизно 10-15 одиниць на місяць."),
      t("Useful local vouchers can work better than physical products for some services.", "Des bons locaux utiles peuvent mieux fonctionner que des produits physiques pour certains services.", "Voucher locali utili possono funzionare meglio dei prodotti fisici per alcuni servizi.", "Для деяких сервісів корисні локальні ваучери можуть бути кращими за фізичні товари."),
    ],
  },
  {
    title: copy.careTitle,
    items: [
      t("Alcohol or age-restricted products require extra care and may be better handled as vouchers.", "L'alcool ou les produits limites par age demandent une attention particuliere et conviennent souvent mieux sous forme de bons.", "Alcol o prodotti con limiti di eta richiedono maggiore attenzione e spesso sono meglio gestiti come voucher.", "Алкоголь або товари з віковими обмеженнями потребують додаткової обережності й часто краще працюють як ваучери."),
      t("Azur Menton can refuse impractical, unsafe, unlabelled, expired, messy, bulky or unsuitable items.", "Azur Menton peut refuser les articles peu pratiques, dangereux, non etiquetes, expires, salissants, trop volumineux ou inadaptes.", "Azur Menton puo rifiutare articoli poco pratici, non sicuri, senza etichetta, scaduti, sporchevoli, ingombranti o inadatti.", "Azur Menton може відмовити речам, які непрактичні, небезпечні, без маркування, прострочені, брудні, надто великі або недоречні для гостей."),
    ],
  },
  {
    title: copy.sponsoredTitle,
    items: [
      t("Paid or sponsored website visibility is separate from free guest sampling.", "La visibilite payante ou sponsorisee sur le site est separee de l'echantillonnage gratuit.", "La visibilita a pagamento o sponsorizzata sul sito e separata dalla campionatura gratuita.", "Платна або спонсорована видимість на сайті є окремою від безкоштовного семплування."),
      t("Any paid visibility must be clearly disclosed and agreed separately.", "Toute visibilite payante doit etre clairement signalee et convenue separement.", "Qualsiasi visibilita a pagamento deve essere chiaramente dichiarata e concordata separatamente.", "Будь-яка платна видимість має бути чітко позначена й погоджена окремо."),
      t("Azur Menton does not turn guest welcome samples into undisclosed advertising.", "Azur Menton ne transforme pas les echantillons d'accueil en publicite non declaree.", "Azur Menton non trasforma gli omaggi di benvenuto in pubblicita non dichiarata.", "Azur Menton не перетворює welcome-зразки на непозначену рекламу."),
    ],
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    locale: safeLocale,
    path: "partners",
    title: copy.seoTitle[safeLocale],
    description: copy.description[safeLocale],
  });
}

export default async function PartnersPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const pageUrl = absoluteUrl(localizedPath(safeLocale, "partners"));

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Azur Menton", url: absoluteUrl(localizedPath(safeLocale)) },
          { name: copy.title[safeLocale], url: pageUrl },
        ])}
      />

      <section className="border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="max-w-3xl py-12 sm:py-16">
            <p className="editorial-label">{copy.eyebrow[safeLocale]}</p>
            <h1 className="serif-heading mt-4 text-5xl leading-[0.95] text-[#173f36] sm:text-6xl">{copy.title[safeLocale]}</h1>
            <p className="mt-6 text-lg leading-8 text-[#5f574c]">{copy.intro[safeLocale]}</p>
          </div>
        </Container>
      </section>

      <Section className="bg-[#fffaf0] py-10 sm:py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <Card key={section.title.en} className="p-5 sm:p-6">
                <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{section.title[safeLocale]}</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5c5044]">
                  {section.items.map((item) => (
                    <li key={item.en} className="border-l-2 border-[#c6a66a] pl-3">{item[safeLocale]}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-10 sm:py-14">
        <Container>
          <Card className="bg-[#17313a] p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{copy.ctaTitle[safeLocale]}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{copy.ctaText[safeLocale]}</p>
              </div>
              <TrackedLink
                className="inline-flex min-h-11 items-center justify-center border border-[#c6a66a] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
                eventName={bookingFunnelEvents.emailClick}
                href={`mailto:${siteConfig.email}?subject=Local%20partner%20sample%20for%20Azur%20Menton`}
                props={{ locale: safeLocale, sourcePageType: "other", sourceSlug: "partners" }}
              >
                {copy.email[safeLocale]}
              </TrackedLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
