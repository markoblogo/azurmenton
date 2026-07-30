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

function weatherTone(code?: number) {
  if (typeof code !== "number") return "partly";
  if (code === 0) return "sun";
  if ([1, 2].includes(code)) return "partly";
  if (code === 3) return "cloud";
  if ([45, 48].includes(code)) return "mist";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "partly";
}

function seaStateTone(waveHeight?: number) {
  if (typeof waveHeight !== "number") return "calm";
  if (waveHeight < 0.2) return "flat";
  if (waveHeight < 0.6) return "calm";
  if (waveHeight < 1.2) return "breezy";
  return "stormy";
}

function seasonForDate(date: Date) {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

function timeOfDayForDate(date: Date) {
  const hour = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  }).format(date);
  const parsedHour = Number.parseInt(hour, 10);
  if (parsedHour < 5) return "night";
  if (parsedHour < 8) return "early";
  if (parsedHour < 12) return "morning";
  if (parsedHour < 17) return "day";
  if (parsedHour < 20) return "sunset";
  return "evening";
}

function WeatherGlyphMini({ code }: { code?: number }) {
  const tone = weatherTone(code);

  if (tone === "sun") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <g stroke="#f3a42d" strokeLinecap="round" strokeWidth="5">
          <path d="M48 6v12" />
          <path d="M48 78v12" />
          <path d="M6 48h12" />
          <path d="M78 48h12" />
          <path d="m18 18 8.5 8.5" />
          <path d="m69.5 69.5 8.5 8.5" />
          <path d="m78 18-8.5 8.5" />
          <path d="m26.5 69.5-8.5 8.5" />
        </g>
        <circle cx="48" cy="48" r="23" fill="#e98524" />
        <circle cx="43" cy="42" r="17" fill="#f7bd3c" />
        <circle cx="38" cy="36" r="7" fill="#fff4a8" opacity="0.9" />
      </svg>
    );
  }

  if (tone === "partly") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="34" cy="34" r="16" fill="#f7bd3c" />
        <path
          d="M26 63h40c8 0 14-5 14-12 0-7-5-12-12-13-3-9-11-15-21-15-11 0-20 7-22 18-7 1-12 6-12 11 0 7 6 11 13 11Z"
          fill="#f8fbff"
          stroke="#d5e2e8"
          strokeWidth="3"
        />
        <path d="M22 72h48" stroke="#6fc2d4" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  if (tone === "rain" || tone === "storm") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <path
          d="M24 57h44c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C6 33 0 39 0 47c0 7 7 10 24 10Z"
          fill="#ecf5f8"
          stroke="#b9d5dd"
          strokeWidth="3"
          transform="translate(6 8)"
        />
        {tone === "storm" ? (
          <path d="M50 54 39 73h11l-4 15 17-22H52l6-12Z" fill="#f7bd3c" />
        ) : (
          <g stroke="#1f9bb8" strokeLinecap="round" strokeWidth="4">
            <path d="M30 67 25 80" />
            <path d="M48 67 43 80" />
            <path d="M66 67 61 80" />
          </g>
        )}
      </svg>
    );
  }

  if (tone === "mist") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="30" cy="26" r="13" fill="#f7bd3c" opacity="0.85" />
        <g stroke="#9cc8d3" strokeLinecap="round" strokeWidth="5">
          <path d="M18 44h56" />
          <path d="M12 58h68" />
          <path d="M24 72h44" />
        </g>
      </svg>
    );
  }

  if (tone === "snow") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <path
          d="M24 57h44c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C6 33 0 39 0 47c0 7 7 10 24 10Z"
          fill="#f8fbff"
          stroke="#c8dce3"
          strokeWidth="3"
          transform="translate(6 8)"
        />
        <g fill="#80cde0">
          <circle cx="34" cy="74" r="3" />
          <circle cx="50" cy="81" r="3" />
          <circle cx="66" cy="74" r="3" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
      <path
        d="M22 64h48c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C8 40 2 46 2 54c0 7 7 10 20 10Z"
        fill="#eef6f5"
        stroke="#bdd6d0"
        strokeWidth="3"
      />
    </svg>
  );
}

function SeaGlyphMini({ waveHeight }: { waveHeight?: number }) {
  const tone = seaStateTone(waveHeight);

  return (
    <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="24" r="10" fill="#8ed0de" opacity="0.35" />
      <g fill="none" strokeLinecap="round" strokeWidth="5">
        <path d="M12 48c8-7 16-7 24 0s16 7 24 0 16-7 24 0 16 7 24 0" stroke="#6bbcd0" />
        <path d="M12 60c8-7 16-7 24 0s16 7 24 0 16-7 24 0 16 7 24 0" stroke="#4ea8c0" />
        <path d="M12 72c8-7 16-7 24 0s16 7 24 0 16-7 24 0 16 7 24 0" stroke="#2c90ad" />
      </g>
      {tone === "flat" ? <path d="M20 58h56" stroke="#6bbcd0" strokeWidth="4" strokeLinecap="round" /> : null}
      {tone === "breezy" ? <path d="M56 36c6 0 8 4 8 8" stroke="#4ea8c0" strokeWidth="4" strokeLinecap="round" /> : null}
      {tone === "stormy" ? <path d="M52 28 44 44h8l-4 14 14-18h-8l5-12Z" fill="#f7bd3c" /> : null}
    </svg>
  );
}

function SeasonGlyphMini({ date }: { date: Date }) {
  const season = seasonForDate(date);

  if (season === "summer") {
    return <WeatherGlyphMini code={0} />;
  }

  if (season === "spring") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <path d="M48 72V30" stroke="#58a36d" strokeWidth="5" strokeLinecap="round" />
        <path d="M48 42c0-12 10-20 20-20 0 12-8 20-20 20Z" fill="#a8d99c" />
        <path d="M48 54c-12 0-20-8-20-20 12 0 20 8 20 20Z" fill="#8ecf87" />
        <circle cx="48" cy="24" r="8" fill="#f4c4d8" />
        <circle cx="39" cy="27" r="7" fill="#f7d8e6" />
        <circle cx="57" cy="27" r="7" fill="#f7d8e6" />
      </svg>
    );
  }

  if (season === "autumn") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <path d="M48 78V42" stroke="#8b5e34" strokeWidth="5" strokeLinecap="round" />
        <path d="M48 22c16 0 26 12 26 26-12 0-22-4-26-13-4 9-14 13-26 13 0-14 10-26 26-26Z" fill="#d88b3a" />
        <path d="M48 26c11 0 18 8 18 18-8 0-14-3-18-9-4 6-10 9-18 9 0-10 7-18 18-18Z" fill="#e7b14c" />
      </svg>
    );
  }

  return (
    <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="58" cy="28" r="16" fill="#d8e7f0" />
      <circle cx="64" cy="24" r="14" fill="#f8fbff" />
      <g stroke="#9dc4d3" strokeLinecap="round" strokeWidth="4">
        <path d="M26 52 38 64" />
        <path d="M38 52 26 64" />
        <path d="M32 46v24" />
        <path d="M18 58h28" />
      </g>
      <g stroke="#9dc4d3" strokeLinecap="round" strokeWidth="4">
        <path d="M54 54 66 66" />
        <path d="M66 54 54 66" />
        <path d="M60 48v24" />
        <path d="M46 60h28" />
      </g>
    </svg>
  );
}

function TimeGlyphMini({ date }: { date: Date }) {
  const tone = timeOfDayForDate(date);

  if (tone === "day") return <WeatherGlyphMini code={0} />;

  if (tone === "morning" || tone === "early") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <path d="M16 64h64" stroke="#8ec7d6" strokeWidth="5" strokeLinecap="round" />
        <path d="M28 64a20 20 0 1 1 40 0" fill="#f7bd3c" />
        <g stroke="#f3a42d" strokeLinecap="round" strokeWidth="4">
          <path d="M48 20v10" />
          <path d="M24 40h10" />
          <path d="M62 40h10" />
          <path d="m31 28 7 7" />
          <path d="m58 35 7-7" />
        </g>
      </svg>
    );
  }

  if (tone === "sunset" || tone === "evening") {
    return (
      <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
        <path d="M14 62h68" stroke="#7db8ca" strokeWidth="5" strokeLinecap="round" />
        <path d="M28 62a20 20 0 1 1 40 0" fill="#f4a35d" />
        <g stroke="#de7d2d" strokeLinecap="round" strokeWidth="4">
          <path d="M48 18v10" />
          <path d="M24 36h10" />
          <path d="M62 36h10" />
          <path d="m31 25 7 7" />
          <path d="m58 32 7-7" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="h-14 w-14" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="44" cy="38" r="18" fill="#d8e7f0" />
      <circle cx="52" cy="34" r="17" fill="#f8fbff" />
      <g fill="#dfeaf1">
        <circle cx="62" cy="20" r="2.5" />
        <circle cx="28" cy="24" r="2" />
        <circle cx="66" cy="48" r="2" />
      </g>
    </svg>
  );
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
      icon: <WeatherGlyphMini code={rightNow.weather?.weatherCode} />,
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
      icon: <SeaGlyphMini waveHeight={rightNow.marine?.waveHeight} />,
    },
    {
      key: heroCopy.localDate,
      label: heroCopy.localDate,
      value: formatHeroDate(locale, now),
      detail: locale === "uk" ? "Europe/Paris" : "Europe/Paris",
      tone: "neutral",
      icon: <SeasonGlyphMini date={now} />,
    },
    {
      key: heroCopy.localTime,
      label: heroCopy.localTime,
      value: formatHeroTime(locale, now),
      detail: locale === "uk" ? "локальний час" : locale === "fr" ? "heure locale" : locale === "it" ? "ora locale" : "local time",
      tone: "deep",
      icon: <TimeGlyphMini date={now} />,
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
                    <div className="space-y-3">
                      <div>{tile.icon}</div>
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
