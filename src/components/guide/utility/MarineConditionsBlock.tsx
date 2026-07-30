import type { MarineConditionsUtilityBlock } from "@/content/guide";
import type { Locale } from "@/i18n/locales";
import { getMentonMarineConditions } from "@/lib/weather";

type FocusActivity = NonNullable<MarineConditionsUtilityBlock["focusActivities"]>[number];

const labels: Record<
  Locale,
  Record<
    | "title"
    | "description"
    | "current"
    | "outlook"
    | "forecast"
    | "updated"
    | "provider"
    | "sea"
    | "wind"
    | "rain"
    | "waves"
    | "swell"
    | "period"
    | "fallback"
    | "swimming"
    | "snorkelling"
    | "paddleboarding"
    | "kayaking"
    | "sailing"
    | "excellent"
    | "good"
    | "mixed"
    | "poor",
    string
  >
> = {
  en: {
    title: "Current sea conditions",
    description: "Useful sea and wind context for Menton beach plans, paddleboarding, kayaking and snorkelling.",
    current: "Current conditions",
    outlook: "Activity outlook",
    forecast: "Next days",
    updated: "Updated",
    provider: "Data",
    sea: "Sea",
    wind: "Wind",
    rain: "Rain",
    waves: "Waves",
    swell: "Swell",
    period: "Period",
    fallback: "Marine data is temporarily unavailable. Use this guide as editorial context and check the latest local forecast before going on the water.",
    swimming: "Swimming",
    snorkelling: "Snorkelling",
    paddleboarding: "Paddleboarding",
    kayaking: "Kayaking",
    sailing: "Sailing",
    excellent: "Excellent",
    good: "Good",
    mixed: "Mixed",
    poor: "Poor",
  },
  fr: {
    title: "Conditions de mer actuelles",
    description: "Contexte utile sur la mer et le vent pour plages, paddle, kayak et snorkelling a Menton.",
    current: "Conditions actuelles",
    outlook: "Lecture des activites",
    forecast: "Prochains jours",
    updated: "Mise a jour",
    provider: "Source",
    sea: "Mer",
    wind: "Vent",
    rain: "Pluie",
    waves: "Vagues",
    swell: "Houle",
    period: "Periode",
    fallback: "Les donnees marines sont temporairement indisponibles. Utilisez ce guide comme contexte editorial et verifiez la prevision locale avant d'aller sur l'eau.",
    swimming: "Baignade",
    snorkelling: "Snorkelling",
    paddleboarding: "Paddle",
    kayaking: "Kayak",
    sailing: "Voile",
    excellent: "Excellent",
    good: "Bon",
    mixed: "Mitige",
    poor: "Faible",
  },
  it: {
    title: "Condizioni del mare attuali",
    description: "Contesto utile su mare e vento per spiagge, paddle, kayak e snorkelling a Mentone.",
    current: "Condizioni attuali",
    outlook: "Lettura attivita",
    forecast: "Prossimi giorni",
    updated: "Aggiornato",
    provider: "Fonte",
    sea: "Mare",
    wind: "Vento",
    rain: "Pioggia",
    waves: "Onde",
    swell: "Mareggiata",
    period: "Periodo",
    fallback: "I dati marini sono temporaneamente non disponibili. Usa questa guida come contesto editoriale e controlla le previsioni locali prima di andare in acqua.",
    swimming: "Nuoto",
    snorkelling: "Snorkelling",
    paddleboarding: "Paddle",
    kayaking: "Kayak",
    sailing: "Vela",
    excellent: "Ottimo",
    good: "Buono",
    mixed: "Misto",
    poor: "Scarso",
  },
  uk: {
    title: "Поточні морські умови",
    description: "Корисний контекст щодо моря й вітру для пляжу, paddle, kayak і snorkelling у Ментоні.",
    current: "Поточні умови",
    outlook: "Оцінка активностей",
    forecast: "Найближчі дні",
    updated: "Оновлено",
    provider: "Джерело",
    sea: "Море",
    wind: "Вітер",
    rain: "Дощ",
    waves: "Хвилі",
    swell: "Свел",
    period: "Період",
    fallback: "Морські дані тимчасово недоступні. Використовуйте цей гід як editorial-context і перевіряйте локальний прогноз перед виходом на воду.",
    swimming: "Купання",
    snorkelling: "Snorkelling",
    paddleboarding: "Paddleboarding",
    kayaking: "Kayaking",
    sailing: "Вітрильний спорт",
    excellent: "Відмінно",
    good: "Добре",
    mixed: "Змішано",
    poor: "Слабко",
  },
};

const defaultActivities: FocusActivity[] = ["paddleboarding", "kayaking", "snorkelling", "sailing"];

function localizeBlockText(value: MarineConditionsUtilityBlock["title"], locale: Locale) {
  if (!value) return undefined;
  return typeof value === "string" ? value : value[locale] ?? value.en;
}

function formatUpdated(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formatDay(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(new Date(value));
}

function formatDirection(value?: number) {
  if (typeof value !== "number") return "—";
  return `${Math.round(value)}°`;
}

function bucketLabel(score: number, copy: (typeof labels)[Locale]) {
  if (score >= 3) return { label: copy.excellent, tone: "bg-[#173f36] text-white border-[#173f36]" };
  if (score >= 2) return { label: copy.good, tone: "bg-[#f3ead7] text-[#173f36] border-[#c6a66a]" };
  if (score >= 1) return { label: copy.mixed, tone: "bg-white text-[#8a6d39] border-[#d8c28e]" };
  return { label: copy.poor, tone: "bg-white text-[#8b5b4c] border-[#dfc4b6]" };
}

function rateActivity(activity: FocusActivity, waveHeight?: number, windSpeed?: number, seaTemperature?: number) {
  const wave = typeof waveHeight === "number" ? waveHeight : 0.8;
  const wind = typeof windSpeed === "number" ? windSpeed : 18;
  const sea = typeof seaTemperature === "number" ? seaTemperature : 21;

  switch (activity) {
    case "paddleboarding":
      if (wave <= 0.35 && wind <= 12) return 3;
      if (wave <= 0.6 && wind <= 18) return 2;
      if (wave <= 0.9 && wind <= 24) return 1;
      return 0;
    case "kayaking":
      if (wave <= 0.45 && wind <= 16) return 3;
      if (wave <= 0.8 && wind <= 22) return 2;
      if (wave <= 1.1 && wind <= 28) return 1;
      return 0;
    case "snorkelling":
      if (wave <= 0.35 && wind <= 12) return 3;
      if (wave <= 0.6 && wind <= 18) return 2;
      if (wave <= 0.9) return 1;
      return 0;
    case "swimming":
      if (sea >= 23 && wave <= 0.5) return 3;
      if (sea >= 20 && wave <= 0.8) return 2;
      if (sea >= 18 && wave <= 1.1) return 1;
      return 0;
    case "sailing":
      if (wind >= 12 && wind <= 24 && wave <= 1.2) return 3;
      if (wind >= 8 && wind <= 28 && wave <= 1.6) return 2;
      if (wind <= 32) return 1;
      return 0;
    default:
      return 1;
  }
}

function valueWithUnit(value: number | undefined, unit: string) {
  return typeof value === "number" ? `${value}${unit}` : "—";
}

export async function MarineConditionsBlock({ block, locale }: { block: MarineConditionsUtilityBlock; locale: Locale }) {
  const copy = labels[locale];
  const marine = await getMentonMarineConditions();
  const title = localizeBlockText(block.title, locale) ?? copy.title;
  const description = localizeBlockText(block.description, locale) ?? copy.description;
  const activities = block.focusActivities?.length ? block.focusActivities : defaultActivities;

  return (
    <article className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
      <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c5044]">{description}</p>

      {!marine ? (
        <p className="mt-4 text-sm leading-6 text-[#71665b]">{copy.fallback}</p>
      ) : (
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border border-[#e6d9c6] bg-white/65 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{copy.current}</p>
                <h3 className="mt-2 text-xl font-semibold text-[#173f36]">Menton coast</h3>
              </div>
              <p className="text-xs leading-5 text-[#71665b]">
                {copy.updated}: {formatUpdated(locale, marine.updatedAt)}
                <br />
                {copy.provider}: {marine.provider}
              </p>
            </div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.sea}</dt>
                <dd className="mt-2 text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.seaTemperature, "°C")}</dd>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.wind}</dt>
                <dd className="mt-2 text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.windSpeed, " km/h")}</dd>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.rain}</dt>
                <dd className="mt-2 text-2xl font-semibold text-[#173f36]">{typeof marine.rainChance === "number" ? `${marine.rainChance}%` : "—"}</dd>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.waves}</dt>
                <dd className="mt-2 text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.waveHeight, " m")}</dd>
                <p className="mt-1 text-xs text-[#71665b]">{formatDirection(marine.waveDirection)}</p>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.swell}</dt>
                <dd className="mt-2 text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.swellWaveHeight, " m")}</dd>
                <p className="mt-1 text-xs text-[#71665b]">{formatDirection(marine.swellWaveDirection)}</p>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.period}</dt>
                <dd className="mt-2 text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.swellWavePeriod, " s")}</dd>
              </div>
            </dl>
          </section>

          <section className="border border-[#e6d9c6] bg-white/65 p-4 sm:p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{copy.outlook}</p>
            <div className="mt-4 grid gap-3">
              {activities.map((activity) => {
                const rated = bucketLabel(rateActivity(activity, marine.waveHeight, marine.windSpeed, marine.seaTemperature), copy);
                return (
                  <div key={activity} className="flex items-center justify-between gap-3 border border-[#ede1cf] bg-[#fffdf8] px-3 py-3">
                    <span className="text-sm font-semibold text-[#173f36]">{copy[activity]}</span>
                    <span className={`inline-flex min-h-8 items-center border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] ${rated.tone}`}>{rated.label}</span>
                  </div>
                );
              })}
            </div>

            {marine.forecast.length ? (
              <div className="mt-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{copy.forecast}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {marine.forecast.slice(0, 4).map((day) => (
                    <div key={day.date} className="border border-[#ede1cf] bg-[#fffdf8] px-3 py-3">
                      <p className="text-sm font-semibold text-[#173f36]">{formatDay(locale, day.date)}</p>
                      <p className="mt-1 text-sm text-[#5c5044]">{day.high}° / {day.low}°</p>
                      <p className="mt-1 text-xs text-[#71665b]">{typeof day.rainChance === "number" ? `${copy.rain}: ${day.rainChance}%` : "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      )}
    </article>
  );
}
