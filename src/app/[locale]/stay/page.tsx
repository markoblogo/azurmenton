import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments } from "@/content/apartments";
import { getGuideArticle } from "@/content/guide";
import { stayPlans } from "@/content/planning/stay-plans";
import { getPlaces } from "@/content/places";
import { localizeStayPage, stayPages } from "@/content/stay-pages";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Where to stay in Menton",
    seoTitle: "Where to Stay in Menton | Azur Menton",
    description: "Structured stay guides for high-intent trips to Menton, Monaco events, Fête du Citron, car-free stays and sea-view apartments.",
    intro: "Commercial stay guides for guests choosing the right Azur Menton apartment for a specific trip.",
    plansTitle: "Ready-made stay plans",
    plansIntro: "Small planning routes that connect guides, places, transport notes and the most relevant apartments.",
    places: "Useful places",
    guides: "Guides",
    apartments: "Apartments",
    transport: "Transport note",
    openPlan: "Open stay plan",
    read: "Read stay guide",
  },
  fr: {
    title: "Ou sejourner a Menton",
    seoTitle: "Ou sejourner a Menton | Azur Menton",
    description: "Guides de sejour pour Menton, les evenements de Monaco, la Fete du Citron, les sejours sans voiture et les appartements vue mer.",
    intro: "Guides pratiques pour choisir l'appartement Azur Menton adapte a un voyage precis.",
    plansTitle: "Plans de sejour prets a l'emploi",
    plansIntro: "Petits parcours qui relient guides, lieux, notes transport et appartements pertinents.",
    places: "Lieux utiles",
    guides: "Guides",
    apartments: "Appartements",
    transport: "Note transport",
    openPlan: "Ouvrir le plan",
    read: "Lire le guide",
  },
  it: {
    title: "Dove soggiornare a Mentone",
    seoTitle: "Dove soggiornare a Mentone | Azur Menton",
    description: "Guide di soggiorno per Mentone, eventi a Monaco, Fete du Citron, viaggi senza auto e appartamenti vista mare.",
    intro: "Guide pratiche per scegliere l'appartamento Azur Menton adatto a un viaggio specifico.",
    plansTitle: "Piani di soggiorno pronti",
    plansIntro: "Percorsi compatti che collegano guide, luoghi, note trasporto e appartamenti piu pertinenti.",
    places: "Luoghi utili",
    guides: "Guide",
    apartments: "Appartamenti",
    transport: "Nota trasporti",
    openPlan: "Apri piano",
    read: "Leggi guida",
  },
  uk: {
    title: "Де зупинитися в Ментоні",
    seoTitle: "Де зупинитися в Ментоні | Azur Menton",
    description: "Сценарії проживання для Ментона, подій Монако, Fête du Citron, поїздок без авто та апартаментів з видом на море.",
    intro: "Практичні сторінки, які допомагають обрати апартаменти Azur Menton під конкретну поїздку.",
    plansTitle: "Готові сценарії поїздки",
    plansIntro: "Компактні маршрути, що з'єднують гіди, місця, транспортні нотатки й релевантні апартаменти.",
    places: "Корисні місця",
    guides: "Гіди",
    apartments: "Апартаменти",
    transport: "Нотатка про транспорт",
    openPlan: "Відкрити сценарій",
    read: "Читати сторінку",
  },
} satisfies Record<Locale, Record<string, string>>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const labels = copy[safeLocale];

  return createMetadata({
    locale: safeLocale,
    path: "stay",
    title: labels.seoTitle,
    description: labels.description,
  });
}

export default async function StayIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = copy[locale];
  const pageUrl = absoluteUrl(localizedPath(locale, "stay"));
  const pages = stayPages.map((page) => localizeStayPage(page, locale));

  return (
    <>
      <JsonLdScript data={collectionPageJsonLd({ name: labels.title, description: labels.description, url: pageUrl, locale })} />
      <JsonLdScript
        data={itemListJsonLd({
          name: labels.title,
          description: labels.description,
          url: pageUrl,
          items: pages.map((page) => ({
            name: page.title,
            description: page.excerpt,
            url: absoluteUrl(localizedPath(locale, `stay/${page.slug}`)),
            image: page.heroImage ? absoluteUrl(page.heroImage) : undefined,
            type: "WebPage",
          })),
        })}
      />

      <Section className="border-b border-[#dfd2b8] bg-[#f8f3ea] py-12 sm:py-16">
        <Container>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">Azur Menton</p>
          <h1 className="mt-4 max-w-4xl serif-heading text-5xl leading-[0.96] text-[#173f36] sm:text-6xl">{labels.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#5c5044]">{labels.intro}</p>
        </Container>
      </Section>

      <Section className="bg-[#fffaf0] py-10 sm:py-14">
        <Container>
          <div className="mb-6 max-w-3xl">
            <h2 className="serif-heading text-4xl leading-none text-[#173f36]">{labels.plansTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c5044]">{labels.plansIntro}</p>
          </div>
          <div className="mb-10 grid gap-4 lg:grid-cols-3">
            {stayPlans.map((plan) => {
              const planPlaces = getPlaces(plan.relatedPlaceIds).slice(0, 3);
              const planApartments = apartments.filter((apartment) => plan.relatedApartmentSlugs.includes(apartment.slug)).slice(0, 2);
              const planGuides = plan.relatedGuideSlugs.map((slug) => getGuideArticle(slug)).filter((article): article is NonNullable<typeof article> => Boolean(article)).slice(0, 2);
              const href = plan.relatedStaySlug ? `/${locale}/stay/${plan.relatedStaySlug}` : `/${locale}/guide/${plan.primaryGuideSlug}`;

              return (
                <Card key={plan.id} className="h-full p-5">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{plan.duration[locale]} · {plan.bestFor[locale]}</p>
                  <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{plan.title[locale]}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#5c5044]">{plan.excerpt[locale]}</p>
                  <div className="mt-5 grid gap-4 text-sm leading-6">
                    {planPlaces.length ? <MiniList label={labels.places} items={planPlaces.map((place) => place.name)} /> : null}
                    {planGuides.length ? <MiniList label={labels.guides} items={planGuides.map((guide) => guide.title[locale])} /> : null}
                    {planApartments.length ? <MiniList label={labels.apartments} items={planApartments.map((apartment) => apartment.shortName[locale])} /> : null}
                    <MiniList label={labels.transport} items={[plan.transportNote[locale]]} />
                  </div>
                  <Link className="mt-5 inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={href as Route}>{labels.openPlan}</Link>
                </Card>
              );
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pages.map((page) => (
              <Link key={page.slug} href={`/${locale}/stay/${page.slug}` as Route} className="group block h-full">
                <Card className="h-full p-5 transition group-hover:border-[#c6a66a]">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{page.primaryTripIntent}</p>
                  <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{page.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#5c5044]">{page.excerpt}</p>
                  <span className="mt-5 inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] group-hover:bg-[#f3ead7]">
                    {labels.read}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function MiniList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{label}</p>
      <ul className="mt-1 space-y-1 text-[#5c5044]">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
