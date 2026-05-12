import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/locales";
import { getMentonWeather, weatherIcon, weatherLabel } from "@/lib/weather";

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

export async function WeatherWidget({ locale }: { locale: Locale }) {
  const weather = await getMentonWeather();
  const labels = copy[locale];
  const condition = weather ? weatherLabel(weather.weatherCode) : "Changing";

  return (
    <section className="border-y border-[#dfd4c1] bg-[#f6efe3]" aria-labelledby="weather-title">
      <div className="grid gap-8 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="editorial-label">{labels.title}</p>
          {weather ? (
            <>
              <div className="mt-4 flex items-end gap-4">
                <span className="text-6xl leading-none text-[#173f36]" aria-hidden="true">
                  {weatherIcon(weather.weatherCode)}
                </span>
                <div>
                  <p className="font-serif-display text-6xl font-semibold leading-none text-[#173f36]">
                    {weather.temperature}°C
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#695f51]">
                    {conditionLabels[locale][condition] ?? condition}
                  </p>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#4d554f]">
                <div className="border-l border-[#c6a66a] pl-4">
                  <dt className="editorial-label">{labels.wind}</dt>
                  <dd className="mt-1 font-semibold">{weather.windSpeed} km/h</dd>
                </div>
                <div className="border-l border-[#c6a66a] pl-4">
                  <dt className="editorial-label">{labels.rain}</dt>
                  <dd className="mt-1 font-semibold">
                    {typeof weather.rainChance === "number" ? `${weather.rainChance}%` : "—"}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="mt-4 max-w-md text-sm leading-7 text-[#695f51]">{labels.fallback}</p>
          )}
        </div>

        <div>
          {weather ? (
            <>
              <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#dfd4c1] bg-[#dfd4c1] sm:grid-cols-5">
                {weather.forecast.map((day) => (
                  <div key={day.date} className="bg-[#fbf7ef] p-4 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#695f51]">
                      {formatDate(locale, day.date)}
                    </p>
                    <p className="mt-3 text-3xl text-[#173f36]" aria-hidden="true">
                      {weatherIcon(day.weatherCode)}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[#1b2c2d]">
                      {day.high}° / {day.low}°
                    </p>
                    {typeof day.rainChance === "number" ? (
                      <p className="mt-1 text-xs text-[#695f51]">{day.rainChance}%</p>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-[#695f51]">
                {labels.updated}: {formatTime(locale, weather.updatedAt)} · {labels.provider}:{" "}
                {weather.provider}
              </p>
            </>
          ) : null}
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <p className="font-serif-display text-2xl font-semibold text-[#173f36]">{labels.planning}</p>
            <Button href={`/${locale}/check-availability`}>{labels.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
