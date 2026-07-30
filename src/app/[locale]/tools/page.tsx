import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { TravelToolPage } from "@/components/tools/TravelToolPage";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { localizeText, travelTools, travelToolSectionCopy } from "@/content/travel-tools";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const copy = travelToolSectionCopy[safeLocale];

  return createMetadata({ locale: safeLocale, path: "tools", title: copy.seoTitle, description: copy.description });
}

export default async function TravelToolsIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = travelToolSectionCopy[locale];
  const pageUrl = absoluteUrl(localizedPath(locale, "tools"));
  const quickFacts = [
    {
      eyebrow: copy.categoryTitle,
      value: `${travelTools.length}`,
      label: locale === "uk" ? "інструментів" : locale === "fr" ? "outils" : locale === "it" ? "strumenti" : "tools",
    },
    {
      eyebrow: copy.source,
      value: "Live + official",
      label: locale === "uk" ? "без фейкових даних" : locale === "fr" ? "sans faux live" : locale === "it" ? "senza falsi live" : "no fake live layer",
    },
    {
      eyebrow: "Guides",
      value: "Compact",
      label: locale === "uk" ? "вбудування в гайди" : locale === "fr" ? "embeds guide" : locale === "it" ? "embed nelle guide" : "guide embeds",
    },
  ];

  return (
    <>
      <JsonLdScript data={collectionPageJsonLd({ name: copy.title, description: copy.description, url: pageUrl, locale })} />
      <JsonLdScript
        data={itemListJsonLd({
          name: copy.title,
          description: copy.description,
          url: pageUrl,
          items: travelTools.map((tool) => ({
            name: localizeText(tool.title, locale),
            description: localizeText(tool.excerpt, locale),
            url: absoluteUrl(localizedPath(locale, `tools/${tool.slug}`)),
            type: "WebPage",
          })),
        })}
      />

      <Section className="border-b border-[#dfd2b8] bg-[#f8f3ea] py-8 sm:py-10">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:items-start">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">Azur Menton</p>
              <h1 className="mt-4 max-w-4xl serif-heading text-5xl leading-[0.96] text-[#173f36] sm:text-6xl">{copy.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#5c5044]">{copy.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/${locale}/guide` as Route} className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#235246]">Menton guide</Link>
                <Link href={`/${locale}/map` as Route} className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]">Useful places map</Link>
              </div>
            </div>
            <aside className="border border-[#dfd2b8] bg-[#fffdf8] p-5 sm:p-6">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">
                {locale === "uk" ? "Що тут є" : locale === "fr" ? "Ce que vous trouvez ici" : locale === "it" ? "Cosa trovi qui" : "What you get here"}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {quickFacts.map((fact) => (
                  <div key={fact.eyebrow} className="border border-[#e6d9c6] bg-white/70 p-3">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{fact.eyebrow}</p>
                    <p className="mt-2 text-lg font-semibold text-[#173f36]">{fact.value}</p>
                    <p className="mt-1 text-xs leading-5 text-[#71665b]">{fact.label}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <TravelToolPage locale={locale} />
    </>
  );
}
