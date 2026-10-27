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
    "Contact Azur Menton about a local place, an editorial correction or a possible partnership.",
    "Contactez Azur Menton au sujet d'un lieu, d'une correction ou d'un partenariat éventuel.",
    "Contatta Azur Menton per un luogo, una correzione o una possibile collaborazione.",
    "Зв'яжіться з Azur Menton щодо закладу, виправлення інформації або можливої співпраці.",
  ),
  intro: t(
    "Azur Menton combines local guides with family-run holiday apartments. If you represent a local business, venue or event, you can contact us to correct information or discuss an idea.",
    "Azur Menton associe des guides locaux à des appartements familiaux. Vous représentez un commerce, un lieu ou un événement ? Contactez-nous pour corriger une information ou proposer une idée.",
    "Azur Menton unisce guide locali e appartamenti a gestione familiare. Rappresenti un'attività, un luogo o un evento? Contattaci per correggere informazioni o proporre un'idea.",
    "Azur Menton поєднує місцеві гіди й сімейні апартаменти. Представляєте бізнес, заклад або подію? Напишіть нам, щоб виправити інформацію чи обговорити ідею.",
  ),
  samplingTitle: t("What free sampling means", "Ce que signifie l'echantillonnage gratuit", "Cosa significa campionatura gratuita", "Що означає безкоштовне семплування"),
  fitTitle: t("What usually fits best", "Ce qui convient le mieux", "Cosa funziona meglio", "Що зазвичай підходить найкраще"),
  careTitle: t("Practical limits", "Limites pratiques", "Limiti pratici", "Практичні обмеження"),
  sponsoredTitle: t("Sponsored visibility", "Visibilite sponsorisee", "Visibilita sponsorizzata", "Спонсорована видимість"),
  ctaTitle: t("Contact the team", "Contacter l'équipe", "Contatta il team", "Зв'яжіться з командою"),
  ctaText: t(
    "Tell us the name of your place, its website or guide link, and what you would like to correct or discuss.",
    "Indiquez le nom de votre lieu, son site ou le lien du guide, et votre correction ou proposition.",
    "Indica il nome del luogo, il sito o il link alla guida e la correzione o proposta.",
    "Вкажіть назву закладу, його сайт або посилання на гід і що ви хочете виправити чи обговорити.",
  ),
  email: t("Email Azur Menton", "Envoyer un email", "Scrivi ad Azur Menton", "Написати Azur Menton"),
};

const sections = [
  {
    title: t("Places and editorial corrections", "Lieux et corrections éditoriales", "Luoghi e correzioni editoriali", "Заклади та виправлення"),
    items: [
      t("Send updated hours, a changed website or a closure for an existing listing.", "Signalez des horaires, un site modifié ou une fermeture.", "Segnala nuovi orari, un sito modificato o una chiusura.", "Повідомте про нові години, зміну сайту або закриття."),
      t("You can suggest a place for editorial review; inclusion and recommendations are independent and not guaranteed.", "Proposez un lieu à la rédaction ; l'inclusion et les recommandations restent indépendantes et ne sont pas garanties.", "Proponi un luogo alla redazione; inclusione e raccomandazioni sono indipendenti e non garantite.", "Запропонуйте заклад редакції; включення та рекомендації незалежні й не гарантовані."),
      t("Corrections to factual information are free. Any paid visibility is separate and clearly disclosed.", "Les corrections factuelles sont gratuites. Toute visibilité payante est distincte et clairement signalée.", "Le correzioni fattuali sono gratuite. La visibilità a pagamento è separata e chiaramente segnalata.", "Виправлення фактів безкоштовні. Платна видимість є окремою та чітко позначається."),
    ],
  },
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
                eventName={bookingFunnelEvents.partnerContactClick}
                href={`mailto:${siteConfig.email}?subject=Azur%20Menton%20%E2%80%94%20local%20place%20or%20partnership`}
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
