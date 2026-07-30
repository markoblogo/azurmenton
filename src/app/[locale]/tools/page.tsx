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
import { getMentonRightNow, weatherLabel } from "@/lib/weather";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ locale: string }> };

const heroUi = {
  en: {
    statTools: "Travel tools",
    statSource: "Source-backed",
    statEmbeds: "Guide embeds",
    statSourceValue: "Live + official",
    statSourceLabel: "No fake live layer",
    statEmbedsValue: "Compact",
    statEmbedsLabel: "Useful guide embeds",
    planningTitle: "Practical layers for real Riviera days",
    planningText:
      "Open fast checks before the beach, before the train, before the airport run or before a longer Monaco / Nice / Italy day.",
    tempToday: "Today",
    seaTemp: "Sea",
    localDate: "Date",
    localTime: "Time",
    seaUnavailable: "Sea data soon",
  },
  fr: {
    statTools: "Outils voyage",
    statSource: "Base source",
    statEmbeds: "Embeds guides",
    statSourceValue: "Live + officiel",
    statSourceLabel: "Sans faux live",
    statEmbedsValue: "Compact",
    statEmbedsLabel: "Embeds utiles",
    planningTitle: "Des couches pratiques pour de vraies journees Riviera",
    planningText:
      "Ouvrez les verifications utiles avant la plage, avant le train, avant l'aeroport ou avant une journee plus longue a Monaco, Nice ou en Italie.",
    tempToday: "Aujourd'hui",
    seaTemp: "Mer",
    localDate: "Date",
    localTime: "Heure",
    seaUnavailable: "Mer bientot",
  },
  it: {
    statTools: "Strumenti",
    statSource: "Fonti",
    statEmbeds: "Embed guide",
    statSourceValue: "Live + ufficiale",
    statSourceLabel: "Niente finti live",
    statEmbedsValue: "Compatto",
    statEmbedsLabel: "Embed utili",
    planningTitle: "Strati pratici per vere giornate in Riviera",
    planningText:
      "Apri controlli rapidi prima della spiaggia, prima del treno, prima dell'aeroporto o prima di una giornata piu lunga tra Monaco, Nizza e Italia.",
    tempToday: "Oggi",
    seaTemp: "Mare",
    localDate: "Data",
    localTime: "Ora",
    seaUnavailable: "Mare presto",
  },
  uk: {
    statTools: "Інструменти",
    statSource: "Джерела",
    statEmbeds: "Вбудування",
    statSourceValue: "Live + офіційне",
    statSourceLabel: "Без фейкового live",
    statEmbedsValue: "Компактно",
    statEmbedsLabel: "Корисні вбудування",
    planningTitle: "Практичний шар для реальних днів на Рив'єрі",
    planningText:
      "Відкривайте швидкі перевірки перед пляжем, перед потягом, перед аеропортом або перед довшим днем у Монако, Ніцці чи Італії.",
    tempToday: "Сьогодні",
    seaTemp: "Море",
    localDate: "Дата",
    localTime: "Час",
    seaUnavailable: "Море скоро",
  },
} as const;

function formatHeroDate(locale: Locale, date: Date) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/Paris",
  }).format(date);
}

function formatHeroTime(locale: Locale, date: Date) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).format(date);
}

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
  const heroCopy = heroUi[locale];
  const pageUrl = absoluteUrl(localizedPath(locale, "tools"));
  const now = new Date();
  const rightNow = await getMentonRightNow();
  const weatherValue = rightNow.weather ? `${Math.round(rightNow.weather.temperature)}°C` : copy.unavailable;
  const seaValue =
    typeof rightNow.marine?.seaTemperature === "number" ? `${Math.round(rightNow.marine.seaTemperature)}°C` : heroCopy.seaUnavailable;
  const heroStats = [
    {
      value: `${travelTools.length}`,
      label: heroCopy.statTools,
    },
    {
      value: heroCopy.statSourceValue,
      label: heroCopy.statSourceLabel,
    },
    {
      value: heroCopy.statEmbedsValue,
      label: heroCopy.statEmbedsLabel,
    },
  ];
  const heroTiles = [
    {
      key: heroCopy.tempToday,
      label: heroCopy.tempToday,
      value: weatherValue,
      detail: rightNow.weather ? weatherLabel(rightNow.weather.weatherCode) : copy.unavailable,
      tone: "warm",
    },
    {
      key: heroCopy.seaTemp,
      label: heroCopy.seaTemp,
      value: seaValue,
      detail:
        typeof rightNow.marine?.waveHeight === "number"
          ? `${rightNow.marine.waveHeight.toFixed(1)} m`
          : locale === "uk"
            ? "узбережжя Ментона"
            : locale === "fr"
              ? "cote de Menton"
              : locale === "it"
                ? "costa di Mentone"
                : "Menton coast",
      tone: "sea",
    },
    {
      key: heroCopy.localDate,
      label: heroCopy.localDate,
      value: formatHeroDate(locale, now),
      detail: locale === "uk" ? "Europe/Paris" : "Europe/Paris",
      tone: "neutral",
    },
    {
      key: heroCopy.localTime,
      label: heroCopy.localTime,
      value: formatHeroTime(locale, now),
      detail: locale === "uk" ? "локальний час" : locale === "fr" ? "heure locale" : locale === "it" ? "ora locale" : "local time",
      tone: "deep",
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.78fr)] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">Azur Menton</p>
              <h1 className="mt-4 max-w-4xl serif-heading text-5xl leading-[0.96] text-[#173f36] sm:text-6xl">{copy.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#5c5044]">{copy.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/${locale}/guide` as Route} className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#235246]">Menton guide</Link>
                <Link href={`/${locale}/map` as Route} className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]">Useful places map</Link>
              </div>
              <aside className="mt-8 border-y border-[#dfd2b8] py-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="serif-heading text-3xl leading-none text-[#173f36]">{stat.value}</p>
                      <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#6f665a]">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <h2 className="mt-4 serif-heading text-2xl leading-tight text-[#173f36]">{heroCopy.planningTitle}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5c5044]">{heroCopy.planningText}</p>
              </aside>
            </div>
            <aside className="relative overflow-hidden border border-[#dfd2b8] bg-[radial-gradient(circle_at_top_left,_rgba(247,232,165,0.55),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(190,223,230,0.55),_transparent_44%),linear-gradient(180deg,#fffdf9_0%,#f8f5ee_100%)] p-5 shadow-[0_18px_50px_rgba(23,63,54,0.05)] sm:p-6">
              <div className="grid aspect-square gap-3 sm:max-w-[26rem] sm:grid-cols-2">
                {heroTiles.map((tile) => (
                  <div
                    key={tile.key}
                    className={[
                      "flex aspect-square flex-col justify-between border border-[#e2d6c1] p-4 sm:p-5",
                      tile.tone === "warm"
                        ? "bg-[linear-gradient(180deg,rgba(255,249,236,0.96),rgba(255,244,221,0.9))]"
                        : tile.tone === "sea"
                          ? "bg-[linear-gradient(180deg,rgba(241,249,252,0.96),rgba(225,241,246,0.92))]"
                          : tile.tone === "deep"
                            ? "bg-[linear-gradient(180deg,rgba(242,247,245,0.98),rgba(228,239,235,0.94))]"
                            : "bg-[rgba(255,255,255,0.88)]",
                    ].join(" ")}
                  >
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{tile.label}</p>
                    <div>
                      <p className="serif-heading text-3xl leading-[0.96] text-[#173f36] sm:text-[2.3rem]">{tile.value}</p>
                      <p className="mt-2 text-xs leading-5 text-[#6b6257]">{tile.detail}</p>
                    </div>
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
