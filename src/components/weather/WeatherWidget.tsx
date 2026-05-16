import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/locales";
import { getMentonWeather, weatherLabel } from "@/lib/weather";

const copy = {
  en: {
    title: "Today in Menton",
    planning: "Planning a seaside stay?",
    cta: "Check availability",
    wind: "Wind",
    rain: "Chance of rain",
    updated: "Last updated",
    provider: "Weather data provider",
    fallback: "Weather data is temporarily unavailable. Menton is waiting by the sea.",
  },
  fr: {
    title: "Aujourd'hui a Menton",
    planning: "Vous prevoyez un sejour au bord de la mer ?",
    cta: "Verifier disponibilite",
    wind: "Vent",
    rain: "Risque de pluie",
    updated: "Mis a jour",
    provider: "Source meteo",
    fallback: "La meteo est temporairement indisponible. Menton vous attend au bord de la mer.",
  },
  it: {
    title: "Oggi a Mentone",
    planning: "Stai pianificando un soggiorno sul mare?",
    cta: "Controlla disponibilita",
    wind: "Vento",
    rain: "Probabilita di pioggia",
    updated: "Aggiornato",
    provider: "Fonte meteo",
    fallback: "I dati meteo non sono temporaneamente disponibili. Mentone ti aspetta sul mare.",
  },
  uk: {
    title: "Сьогодні в Ментоні",
    planning: "Плануєте відпочинок біля моря?",
    cta: "Перевірити доступність",
    wind: "Вітер",
    rain: "Ймовірність дощу",
    updated: "Оновлено",
    provider: "Джерело погоди",
    fallback: "Дані про погоду тимчасово недоступні. Ментон чекає біля моря.",
  },
} satisfies Record<Locale, Record<string, string>>;

const conditionLabels = {
  en: {
    Clear: "Clear",
    "Mostly clear": "Mostly clear",
    Cloudy: "Cloudy",
    Mist: "Mist",
    Drizzle: "Drizzle",
    Rain: "Rain",
    Snow: "Snow",
    Storm: "Storm",
    Changing: "Changing",
  },
  fr: {
    Clear: "Degage",
    "Mostly clear": "Plutot degage",
    Cloudy: "Nuageux",
    Mist: "Brume",
    Drizzle: "Bruine",
    Rain: "Pluie",
    Snow: "Neige",
    Storm: "Orage",
    Changing: "Variable",
  },
  it: {
    Clear: "Sereno",
    "Mostly clear": "Prevalentemente sereno",
    Cloudy: "Nuvoloso",
    Mist: "Foschia",
    Drizzle: "Pioviggine",
    Rain: "Pioggia",
    Snow: "Neve",
    Storm: "Temporale",
    Changing: "Variabile",
  },
  uk: {
    Clear: "Ясно",
    "Mostly clear": "Переважно ясно",
    Cloudy: "Хмарно",
    Mist: "Туман",
    Drizzle: "Мряка",
    Rain: "Дощ",
    Snow: "Сніг",
    Storm: "Гроза",
    Changing: "Мінливо",
  },
} satisfies Record<Locale, Record<string, string>>;

function formatDate(locale: Locale, date: string, weekday: "short" | "long" = "short") {
  return new Intl.DateTimeFormat(locale, {
    weekday,
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

function formatTime(locale: Locale, date: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function weatherTone(code: number) {
  if (code === 0) return "sun";
  if ([1, 2].includes(code)) return "partly";
  if (code === 3) return "cloud";
  if ([45, 48].includes(code)) return "mist";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "rain";
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "partly";
}

function WeatherGlyph({ code, compact = false }: { code: number; compact?: boolean }) {
  const tone = weatherTone(code);
  const sizeClass = compact ? "h-12 w-12" : "h-24 w-24";

  if (tone === "sun") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
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
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="38" cy="36" r="20" fill="#f7bd3c" />
        <path
          d="M32 65h42c8 0 14-5 14-13 0-7-5-12-12-13-3-10-12-17-23-17-12 0-22 8-24 20-7 1-13 6-13 12 0 7 6 11 16 11Z"
          fill="#f8fbff"
          stroke="#d5e2e8"
          strokeWidth="3"
        />
        <path d="M22 74h55" stroke="#6fc2d4" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  if (tone === "rain" || tone === "storm") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <path
          d="M24 56h44c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C6 32 0 38 0 46c0 7 7 10 24 10Z"
          fill="#ecf5f8"
          stroke="#b9d5dd"
          strokeWidth="3"
          transform="translate(6 8)"
        />
        {tone === "storm" ? (
          <path d="M50 56 38 78h13l-5 16 18-25H51l7-13Z" fill="#f7bd3c" />
        ) : (
          <g stroke="#1f9bb8" strokeLinecap="round" strokeWidth="4">
            <path d="M31 68 25 82" />
            <path d="M49 68 43 82" />
            <path d="M67 68 61 82" />
          </g>
        )}
      </svg>
    );
  }

  if (tone === "mist") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="32" cy="28" r="14" fill="#f7bd3c" opacity="0.85" />
        <g stroke="#9cc8d3" strokeLinecap="round" strokeWidth="5">
          <path d="M18 46h56" />
          <path d="M10 60h72" />
          <path d="M23 74h50" />
        </g>
      </svg>
    );
  }

  if (tone === "snow") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <path
          d="M24 57h44c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C6 33 0 39 0 47c0 7 7 10 24 10Z"
          fill="#f8fbff"
          stroke="#c8dce3"
          strokeWidth="3"
          transform="translate(6 8)"
        />
        <g fill="#80cde0">
          <circle cx="34" cy="75" r="3" />
          <circle cx="50" cy="83" r="3" />
          <circle cx="66" cy="75" r="3" />
        </g>
      </svg>
    );
  }

  return (
    <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
      <path
        d="M22 64h48c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C8 40 2 46 2 54c0 7 7 10 20 10Z"
        fill="#eef6f5"
        stroke="#bdd6d0"
        strokeWidth="3"
      />
    </svg>
  );
}

export async function WeatherWidget({ locale }: { locale: Locale }) {
  const weather = await getMentonWeather();
  const labels = copy[locale];
  const condition = weather ? weatherLabel(weather.weatherCode) : "Changing";

  return (
    <section className="relative overflow-hidden border-y border-[#dfd4c1] bg-[#f7efe0]" aria-labelledby="weather-title">
      <div
        className="absolute inset-0 opacity-90"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,244,205,0.96) 0%, rgba(209,235,239,0.82) 42%, rgba(251,247,239,0.86) 70%), radial-gradient(circle at 18% 18%, rgba(247,189,60,0.46), transparent 26%), linear-gradient(180deg, transparent 68%, rgba(61,156,180,0.18) 69%, rgba(61,156,180,0.08) 80%, transparent 81%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:px-8">
        <div className="relative overflow-hidden border border-white/70 bg-white/58 p-6 shadow-[0_18px_50px_rgba(31,105,126,0.12)] backdrop-blur-sm sm:p-8">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f7bd3c]/28 blur-2xl" aria-hidden="true" />
          <p id="weather-title" className="editorial-label text-[#b07820]">{labels.title}</p>
          {weather ? (
            <>
              <div className="mt-5 flex items-center gap-5">
                <WeatherGlyph code={weather.weatherCode} />
                <div>
                  <p className="font-serif-display text-7xl font-semibold leading-none text-[#173f36]">
                    {weather.temperature}°C
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#4f615c]">
                    {conditionLabels[locale][condition] ?? condition}
                  </p>
                </div>
              </div>
              <dl className="mt-7 grid grid-cols-2 gap-3 text-sm text-[#40514d]">
                <div className="border border-white/70 bg-[#fff9ed]/76 px-4 py-3">
                  <dt className="editorial-label text-[#b07820]">{labels.wind}</dt>
                  <dd className="mt-1 text-lg font-semibold">{weather.windSpeed} km/h</dd>
                </div>
                <div className="border border-white/70 bg-[#fff9ed]/76 px-4 py-3">
                  <dt className="editorial-label text-[#b07820]">{labels.rain}</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {typeof weather.rainChance === "number" ? `${weather.rainChance}%` : "—"}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="mt-4 max-w-md text-sm leading-7 text-[#695f51]">{labels.fallback}</p>
          )}
        </div>

        <div className="flex flex-col justify-between border border-white/60 bg-[#fbf7ef]/72 p-4 shadow-[0_18px_50px_rgba(31,105,126,0.10)] backdrop-blur-sm sm:p-5">
          {weather ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {weather.forecast.map((day) => (
                  <div
                    key={day.date}
                    className="min-h-40 border border-white/80 bg-white/70 p-4 text-center shadow-[0_10px_24px_rgba(31,105,126,0.08)]"
                  >
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#6c7169]">
                      {formatDate(locale, day.date)}
                    </p>
                    <div className="mt-3 flex justify-center">
                      <WeatherGlyph code={day.weatherCode} compact />
                    </div>
                    <p className="mt-3 text-base font-semibold text-[#1b2c2d]">
                      {day.high}° / {day.low}°
                    </p>
                    {typeof day.rainChance === "number" ? (
                      <p className="mt-1 text-xs font-medium text-[#58706d]">{day.rainChance}%</p>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-[#695f51]">
                {labels.updated}: {formatTime(locale, weather.updatedAt)} · {labels.provider}:{" "}
                {weather.provider}
              </p>
            </>
          ) : null}
          <div className="mt-6 flex flex-col items-start gap-3 border-t border-white/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif-display text-2xl font-semibold text-[#173f36]">{labels.planning}</p>
            <Button href={`/${locale}/check-availability`}>{labels.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
