import type { MarineConditionsUtilityBlock } from "@/content/guide";
import type { Locale } from "@/i18n/locales";
import { getMentonMarineConditions, type WeatherForecastDays } from "@/lib/weather";

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

type MetricLabelKey =
  | "unavailable"
  | "seaCold"
  | "seaCool"
  | "seaComfortable"
  | "seaWarm"
  | "seaVeryWarm"
  | "windCalm"
  | "windLight"
  | "windModerate"
  | "windStrong"
  | "windStorm"
  | "rainNone"
  | "rainLight"
  | "rainModerate"
  | "rainHeavy"
  | "waterCalm"
  | "waterSlight"
  | "waterModerate"
  | "waterRough"
  | "waterVeryRough"
  | "periodShort"
  | "periodMedium"
  | "periodLong";

const metricLabels: Record<Locale, Record<MetricLabelKey, string>> = {
  en: {
    unavailable: "Unavailable", seaCold: "Cold", seaCool: "Cool", seaComfortable: "Comfortable", seaWarm: "Warm", seaVeryWarm: "Very warm",
    windCalm: "Calm", windLight: "Light breeze", windModerate: "Moderate breeze", windStrong: "Strong wind", windStorm: "Storm force",
    rainNone: "No rain", rainLight: "Light rain", rainModerate: "Moderate rain", rainHeavy: "Heavy rain",
    waterCalm: "Calm water", waterSlight: "Slight chop", waterModerate: "Moderate waves", waterRough: "Rough water", waterVeryRough: "Very rough",
    periodShort: "Short period", periodMedium: "Medium period", periodLong: "Long period",
  },
  fr: {
    unavailable: "Indisponible", seaCold: "Froide", seaCool: "Fraiche", seaComfortable: "Agreable", seaWarm: "Chaude", seaVeryWarm: "Tres chaude",
    windCalm: "Calme", windLight: "Brise legere", windModerate: "Brise moderee", windStrong: "Vent fort", windStorm: "Force tempete",
    rainNone: "Pas de pluie", rainLight: "Pluie legere", rainModerate: "Pluie moderee", rainHeavy: "Forte pluie",
    waterCalm: "Mer calme", waterSlight: "Petite houle", waterModerate: "Vagues moderees", waterRough: "Mer agitee", waterVeryRough: "Tres agitee",
    periodShort: "Periode courte", periodMedium: "Periode moyenne", periodLong: "Periode longue",
  },
  it: {
    unavailable: "Non disponibile", seaCold: "Fredda", seaCool: "Fresca", seaComfortable: "Piacevole", seaWarm: "Calda", seaVeryWarm: "Molto calda",
    windCalm: "Calma", windLight: "Brezza leggera", windModerate: "Brezza moderata", windStrong: "Vento forte", windStorm: "Forza di tempesta",
    rainNone: "Niente pioggia", rainLight: "Pioggia leggera", rainModerate: "Pioggia moderata", rainHeavy: "Pioggia forte",
    waterCalm: "Mare calmo", waterSlight: "Piccolo moto ondoso", waterModerate: "Onde moderate", waterRough: "Mare mosso", waterVeryRough: "Molto mosso",
    periodShort: "Periodo breve", periodMedium: "Periodo medio", periodLong: "Periodo lungo",
  },
  uk: {
    unavailable: "Немає даних", seaCold: "Холодна", seaCool: "Прохолодна", seaComfortable: "Комфортна", seaWarm: "Тепла", seaVeryWarm: "Дуже тепла",
    windCalm: "Штиль", windLight: "Легкий бриз", windModerate: "Помірний вітер", windStrong: "Сильний вітер", windStorm: "Штормовий вітер",
    rainNone: "Без опадів", rainLight: "Невеликий дощ", rainModerate: "Помірний дощ", rainHeavy: "Сильний дощ",
    waterCalm: "Спокійне море", waterSlight: "Невелика хвиля", waterModerate: "Помірні хвилі", waterRough: "Бурхливе море", waterVeryRough: "Дуже бурхливе море",
    periodShort: "Короткий період", periodMedium: "Середній період", periodLong: "Довгий період",
  },
};

type MetricState = { label: string; color: string; level: number };

function metricState(kind: MarineMetricKind, value: number | undefined, locale: Locale): MetricState {
  const copy = metricLabels[locale];
  if (typeof value !== "number") return { label: copy.unavailable, color: "#b9b09e", level: 0 };
  if (kind === "sea") {
    if (value < 16) return { label: copy.seaCold, color: "#73b9c6", level: 0 };
    if (value < 19) return { label: copy.seaCool, color: "#4ea8c0", level: 1 };
    if (value < 24) return { label: copy.seaComfortable, color: "#5ea66b", level: 2 };
    if (value < 28) return { label: copy.seaWarm, color: "#e98524", level: 3 };
    return { label: copy.seaVeryWarm, color: "#d75d40", level: 4 };
  }
  if (kind === "wind") {
    if (value < 5) return { label: copy.windCalm, color: "#b9dfe6", level: 0 };
    if (value < 12) return { label: copy.windLight, color: "#73b9c6", level: 1 };
    if (value < 29) return { label: copy.windModerate, color: "#4ea8c0", level: 2 };
    if (value < 63) return { label: copy.windStrong, color: "#b49353", level: 3 };
    return { label: copy.windStorm, color: "#b36b5f", level: 4 };
  }
  if (kind === "rain") {
    if (value <= 0) return { label: copy.rainNone, color: "#5ea66b", level: 0 };
    if (value <= 30) return { label: copy.rainLight, color: "#b49353", level: 1 };
    if (value <= 60) return { label: copy.rainModerate, color: "#4ea8c0", level: 2 };
    return { label: copy.rainHeavy, color: "#357f98", level: 3 };
  }
  if (kind === "period") {
    if (value < 5) return { label: copy.periodShort, color: "#5ea66b", level: 0 };
    if (value < 8) return { label: copy.periodMedium, color: "#4ea8c0", level: 1 };
    return { label: copy.periodLong, color: "#b49353", level: 2 };
  }
  if (value < 0.3) return { label: copy.waterCalm, color: "#5ea66b", level: 0 };
  if (value < 0.6) return { label: copy.waterSlight, color: "#4ea8c0", level: 1 };
  if (value < 1.25) return { label: copy.waterModerate, color: "#b49353", level: 2 };
  if (value < 2.5) return { label: copy.waterRough, color: "#b36b5f", level: 3 };
  return { label: copy.waterVeryRough, color: "#8b4d55", level: 4 };
}

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

type MarineMetricKind = "sea" | "wind" | "rain" | "waves" | "swell" | "period";

function MarineMetricGlyph({ kind, state }: { kind: MarineMetricKind; state: MetricState }) {
  const color = state.color;
  const waveLines = Math.max(1, Math.min(3, state.level + 1));
  return (
    <svg className="h-12 w-12 shrink-0" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {kind === "sea" ? <path d="M32 9c-7 11-16 20-16 31a16 16 0 0 0 32 0C48 29 39 20 32 9Z" stroke={color} strokeWidth="4" /> : null}
      {kind === "wind" ? (
        <g stroke={color} strokeLinecap="round" strokeWidth="4"><path d="M8 22h30c8 0 8-11 0-11-3 0-5 2-6 4" /><path d="M8 33h45" /><path d="M8 44h27c8 0 8 11 0 11-3 0-5-2-6-4" /></g>
      ) : null}
      {kind === "rain" ? (
        <g stroke={color} strokeLinecap="round" strokeWidth="4"><path d="M18 38h28a10 10 0 0 0-5-19 14 14 0 0 0-26 6 8 8 0 0 0 3 13Z" />{state.level === 0 ? <path d="M25 50h14" /> : state.level === 1 ? <path d="m30 47-3 7" /> : <path d="m24 47-3 7M35 47l-3 7M46 47l-3 7" />}</g>
      ) : null}
      {kind === "waves" || kind === "swell" ? (
        <g stroke={color} strokeLinecap="round" strokeWidth="4">{[23, 35, 47].slice(0, waveLines).map((y) => <path key={y} d={`M8 ${y}c8-7 16-7 24 0s16 7 24 0`} />)}</g>
      ) : null}
      {kind === "period" ? (
        <g stroke={color} strokeLinecap="round" strokeWidth="4"><circle cx="32" cy="32" r="21" /><path d={state.level === 0 ? "M32 22v10l6 4" : state.level === 1 ? "M32 18v14l9 6" : "M32 14v18l13 8"} /></g>
      ) : null}
    </svg>
  );
}

function ActivityGlyph({ activity }: { activity: FocusActivity }) {
  const paths = {
    swimming: "M8 42c8-7 16-7 24 0s16 7 24 0M17 25c5-7 12-8 18-3l6 5M35 18l6-6",
    snorkelling: "M10 39c8-7 16-7 24 0s16 7 24 0M22 25h18a7 7 0 0 0 0-14h-5M40 18l10 12",
    paddleboarding: "M8 47h48M28 47l7-30M35 17l8 8M22 29h17",
    kayaking: "M8 43c10-9 38-9 48 0M17 30l30 0M24 18l-8 25M40 18l8 25",
    sailing: "M32 10v36M32 13 52 35H32M32 46H14h36",
  } as const;
  return <svg className="h-10 w-10 shrink-0" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d={paths[activity]} stroke="#4ea8c0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></svg>;
}

function ActivityStatusGlyph({ score }: { score: number }) {
  const color = score >= 3 ? "#5ea66b" : score >= 2 ? "#4ea8c0" : score >= 1 ? "#b49353" : "#b36b5f";
  return (
    <svg className="h-8 w-8 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {score >= 3 ? <path d="m16 4 2.5 7.2L26 9l-4.8 6.2L28 19l-8 1.2L21 28l-5-5.2L11 28l1-7.8L4 19l6.8-3.8L6 9l7.5 2.2L16 4Z" fill={color} /> : null}
      {score === 2 ? <><circle cx="16" cy="16" r="11" stroke={color} strokeWidth="3" /><path d="m10 16 4 4 8-9" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></> : null}
      {score === 1 ? <><circle cx="16" cy="16" r="11" stroke={color} strokeWidth="3" /><path d="M16 5v22M16 16h11" stroke={color} strokeLinecap="round" strokeWidth="3" /></> : null}
      {score <= 0 ? <><path d="m16 4 12 23H4L16 4Z" stroke={color} strokeLinejoin="round" strokeWidth="3" /><path d="M16 11v8M16 23v1" stroke={color} strokeLinecap="round" strokeWidth="3" /></> : null}
    </svg>
  );
}

function ForecastWeatherGlyph({ code }: { code: number }) {
  const clear = code === 0;
  const partlyCloudy = [1, 2].includes(code);
  const rainy = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code);
  const storm = [95, 96, 99].includes(code);
  return (
    <svg className="h-9 w-9 shrink-0" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {clear || partlyCloudy ? <><circle cx="20" cy="19" r="8" fill="#f7bd3c" /><path d="M20 5v4M20 29v4M6 19h4M30 19h4M10 9l3 3M27 26l3 3M30 9l-3 3M13 26l-3 3" stroke="#e98524" strokeLinecap="round" strokeWidth="2" /></> : null}
      {!clear ? <path d="M13 34h22a8 8 0 0 0-3-15 11 11 0 0 0-20 5 6 6 0 0 0 1 10Z" fill="#edf6f7" stroke="#8fc6d1" strokeWidth="2" /> : <path d="M10 37h27" stroke="#4ea8c0" strokeLinecap="round" strokeWidth="2" />}
      {storm ? <path d="m25 36-4 7h5l-3 5" stroke="#e98524" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /> : rainy ? <path d="m19 38-2 4m9-4-2 4m9-4-2 4" stroke="#4ea8c0" strokeLinecap="round" strokeWidth="2" /> : !clear ? <path d="M17 38h17" stroke="#4ea8c0" strokeLinecap="round" strokeWidth="2" /> : null}
    </svg>
  );
}

export async function MarineConditionsBlock({ block, locale, forecastDays = 5 }: { block: MarineConditionsUtilityBlock; locale: Locale; forecastDays?: WeatherForecastDays }) {
  const copy = labels[locale];
  const marine = await getMentonMarineConditions(forecastDays);
  const title = localizeBlockText(block.title, locale) ?? copy.title;
  const description = localizeBlockText(block.description, locale) ?? copy.description;
  const activities = block.focusActivities?.length ? block.focusActivities : defaultActivities;
  const states = {
    sea: metricState("sea", marine?.seaTemperature, locale),
    wind: metricState("wind", marine?.windSpeed, locale),
    rain: metricState("rain", marine?.rainChance, locale),
    waves: metricState("waves", marine?.waveHeight, locale),
    swell: metricState("swell", marine?.swellWaveHeight, locale),
    period: metricState("period", marine?.swellWavePeriod, locale),
  };

  return (
    <article className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
      <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c5044]">{description}</p>

      {!marine ? (
        <p className="mt-4 text-sm leading-6 text-[#71665b]">{copy.fallback}</p>
      ) : (
        <>
        <div className="mt-5 grid items-start gap-4 lg:grid-cols-[1.1fr_0.9fr]">
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
                <div className="mt-2 flex items-center justify-between gap-3"><dd className="text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.seaTemperature, "°C")}</dd><MarineMetricGlyph kind="sea" state={states.sea} /></div>
                <p className="mt-1 text-xs font-semibold" style={{ color: states.sea.color }}>{states.sea.label}</p>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.wind}</dt>
                <div className="mt-2 flex items-center justify-between gap-3"><dd className="text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.windSpeed, " km/h")}</dd><MarineMetricGlyph kind="wind" state={states.wind} /></div>
                <p className="mt-1 text-xs font-semibold" style={{ color: states.wind.color }}>{states.wind.label}</p>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.rain}</dt>
                <div className="mt-2 flex items-center justify-between gap-3"><dd className="text-2xl font-semibold text-[#173f36]">{typeof marine.rainChance === "number" ? `${marine.rainChance}%` : "—"}</dd><MarineMetricGlyph kind="rain" state={states.rain} /></div>
                <p className="mt-1 text-xs font-semibold" style={{ color: states.rain.color }}>{states.rain.label}</p>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.waves}</dt>
                <div className="mt-2 flex items-center justify-between gap-3"><dd className="text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.waveHeight, " m")}</dd><MarineMetricGlyph kind="waves" state={states.waves} /></div>
                <p className="mt-1 text-xs font-semibold" style={{ color: states.waves.color }}>{states.waves.label}</p>
                <p className="mt-1 text-xs text-[#71665b]">{formatDirection(marine.waveDirection)}</p>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.swell}</dt>
                <div className="mt-2 flex items-center justify-between gap-3"><dd className="text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.swellWaveHeight, " m")}</dd><MarineMetricGlyph kind="swell" state={states.swell} /></div>
                <p className="mt-1 text-xs font-semibold" style={{ color: states.swell.color }}>{states.swell.label}</p>
                <p className="mt-1 text-xs text-[#71665b]">{formatDirection(marine.swellWaveDirection)}</p>
              </div>
              <div className="border border-[#ede1cf] bg-[#fffdf8] p-3">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.period}</dt>
                <div className="mt-2 flex items-center justify-between gap-3"><dd className="text-2xl font-semibold text-[#173f36]">{valueWithUnit(marine.swellWavePeriod, " s")}</dd><MarineMetricGlyph kind="period" state={states.period} /></div>
                <p className="mt-1 text-xs font-semibold" style={{ color: states.period.color }}>{states.period.label}</p>
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
                    <span className="flex items-center gap-3 text-sm font-semibold text-[#173f36]"><ActivityGlyph activity={activity} />{copy[activity]}</span>
                    <span className="flex items-center gap-2"><ActivityStatusGlyph score={rateActivity(activity, marine.waveHeight, marine.windSpeed, marine.seaTemperature)} /><span className={`inline-flex min-h-8 items-center border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] ${rated.tone}`}>{rated.label}</span></span>
                  </div>
                );
              })}
            </div>

          </section>
        </div>
        {marine.forecast.length ? (
          <section className="mt-4 border border-[#e6d9c6] bg-white/65 p-4 sm:p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{copy.forecast}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
              {marine.forecast.slice(0, 8).map((day) => (
                <div key={day.date} className="border border-[#ede1cf] bg-[#fffdf8] px-3 py-3">
                  <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold text-[#173f36]">{formatDay(locale, day.date)}</p><ForecastWeatherGlyph code={day.weatherCode} /></div>
                  <p className="mt-1 text-sm text-[#5c5044]">{day.high}° / {day.low}°</p>
                  <p className="mt-1 text-xs text-[#71665b]">{typeof day.rainChance === "number" ? `${copy.rain}: ${day.rainChance}%` : "—"}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
        </>
      )}
    </article>
  );
}
