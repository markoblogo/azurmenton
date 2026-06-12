import { unstable_cache } from "next/cache";

export type WeatherDay = {
  date: string;
  high: number;
  low: number;
  weatherCode: number;
  rainChance?: number;
};

export type MentonWeather = {
  provider: string;
  updatedAt: string;
  temperature: number;
  seaTemperature?: number;
  windSpeed: number;
  weatherCode: number;
  rainChance?: number;
  forecast: WeatherDay[];
};

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    wind_speed_10m?: number;
    weather_code?: number;
  };
  hourly?: {
    time?: string[];
    precipitation_probability?: number[];
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    weather_code?: number[];
    precipitation_probability_max?: number[];
  };
};

type OpenMeteoMarineResponse = {
  current?: {
    time?: string;
    sea_surface_temperature?: number;
  };
};

const defaultLatitude = "43.7745";
const defaultLongitude = "7.4975";
export const weatherRevalidateSeconds = 7200;

export function weatherLabel(code: number) {
  if (code === 0) return "Clear";
  if ([1, 2].includes(code)) return "Mostly clear";
  if (code === 3) return "Cloudy";
  if ([45, 48].includes(code)) return "Mist";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Storm";
  return "Changing";
}

export function weatherIcon(code: number) {
  if (code === 0) return "☀";
  if ([1, 2].includes(code)) return "◐";
  if (code === 3) return "☁";
  if ([45, 48].includes(code)) return "≋";
  if ([51, 53, 55, 56, 57].includes(code)) return "☂";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "☔";
  if ([95, 96, 99].includes(code)) return "⚡";
  return "○";
}

function closestRainChance(data: OpenMeteoResponse) {
  const times = data.hourly?.time;
  const probabilities = data.hourly?.precipitation_probability;

  if (!times?.length || !probabilities?.length) {
    return undefined;
  }

  const currentTime = data.current?.time;
  const index = currentTime ? times.findIndex((time) => time >= currentTime) : 0;
  const safeIndex = index >= 0 ? index : 0;
  return probabilities[safeIndex];
}

async function fetchOpenMeteoWeather(): Promise<MentonWeather | null> {
  const latitude = process.env.WEATHER_LATITUDE || defaultLatitude;
  const longitude = process.env.WEATHER_LONGITUDE || defaultLongitude;
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("timezone", "Europe/Paris");
  url.searchParams.set("forecast_days", "5");
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("hourly", "precipitation_probability");
  url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max");

  const response = await fetch(url, {
    next: { revalidate: weatherRevalidateSeconds },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as OpenMeteoResponse;

  if (
    typeof data.current?.temperature_2m !== "number" ||
    typeof data.current.weather_code !== "number" ||
    typeof data.current.wind_speed_10m !== "number"
  ) {
    return null;
  }

  const forecast = (data.daily?.time ?? []).slice(0, 5).map((date, index) => ({
    date,
    high: Math.round(data.daily?.temperature_2m_max?.[index] ?? 0),
    low: Math.round(data.daily?.temperature_2m_min?.[index] ?? 0),
    weatherCode: data.daily?.weather_code?.[index] ?? 0,
    rainChance: data.daily?.precipitation_probability_max?.[index],
  }));

  return {
    provider: "Open-Meteo",
    updatedAt: data.current.time ?? new Date().toISOString(),
    temperature: Math.round(data.current.temperature_2m),
    seaTemperature: await fetchOpenMeteoSeaTemperature(latitude, longitude),
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
    rainChance: closestRainChance(data),
    forecast,
  };
}

async function fetchOpenMeteoSeaTemperature(latitude: string, longitude: string) {
  const url = new URL("https://marine-api.open-meteo.com/v1/marine");

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("timezone", "Europe/Paris");
  url.searchParams.set("current", "sea_surface_temperature");

  try {
    const response = await fetch(url, {
      next: { revalidate: weatherRevalidateSeconds },
    });

    if (!response.ok) return undefined;

    const data = (await response.json()) as OpenMeteoMarineResponse;
    const seaTemperature = data.current?.sea_surface_temperature;

    return typeof seaTemperature === "number" ? Math.round(seaTemperature) : undefined;
  } catch {
    return undefined;
  }
}

export const getMentonWeather = unstable_cache(
  async () => {
    const provider = process.env.WEATHER_PROVIDER || "open-meteo";

    if (provider !== "open-meteo") {
      return null;
    }

    try {
      return await fetchOpenMeteoWeather();
    } catch {
      return null;
    }
  },
  ["menton-weather"],
  { revalidate: weatherRevalidateSeconds },
);
