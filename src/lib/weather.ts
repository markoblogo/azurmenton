import { unstable_cache } from "next/cache";

export type WeatherDay = {
  date: string;
  high: number;
  low: number;
  weatherCode: number;
  rainChance?: number;
  uvIndexMax?: number;
  windSpeedMax?: number;
  seaTemperature?: number;
  waveHeight?: number;
  waveDirection?: number;
  swellWaveHeight?: number;
  swellWavePeriod?: number;
};

export type MentonWeather = {
  provider: string;
  updatedAt: string;
  temperature: number;
  feelsLike?: number;
  seaTemperature?: number;
  windSpeed: number;
  windGusts?: number;
  humidity?: number;
  weatherCode: number;
  uvIndex?: number;
  uvIndexMax?: number;
  rainChance?: number;
  forecast: WeatherDay[];
};

export type MentonMarineConditions = {
  provider: string;
  updatedAt: string;
  seaTemperature?: number;
  windSpeed?: number;
  weatherCode?: number;
  rainChance?: number;
  waveHeight?: number;
  waveDirection?: number;
  swellWaveHeight?: number;
  swellWaveDirection?: number;
  swellWavePeriod?: number;
  forecast: WeatherDay[];
};

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    wind_speed_10m?: number;
    wind_gusts_10m?: number;
    relative_humidity_2m?: number;
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
    uv_index_max?: number[];
    wind_speed_10m_max?: number[];
  };
};

type OpenMeteoAirQualityResponse = {
  current?: {
    time?: string;
    european_aqi?: number;
    pm2_5?: number;
    pm10?: number;
    nitrogen_dioxide?: number;
    ozone?: number;
    uv_index?: number;
  };
  daily?: {
    uv_index_max?: number[];
  };
};

export type MentonAirQuality = {
  provider: string;
  updatedAt: string;
  europeanAqi?: number;
  pm2_5?: number;
  pm10?: number;
  no2?: number;
  ozone?: number;
  uvIndex?: number;
  uvIndexMax?: number;
};

export type MentonRightNow = {
  weather: MentonWeather | null;
  marine: MentonMarineConditions | null;
  airQuality: MentonAirQuality | null;
};

type OpenMeteoMarineResponse = {
  current?: {
    time?: string;
    sea_surface_temperature?: number;
    wave_height?: number;
    wave_direction?: number;
    swell_wave_height?: number;
    swell_wave_direction?: number;
    swell_wave_period?: number;
  };
  hourly?: {
    time?: string[];
    sea_surface_temperature?: number[];
    wave_height?: number[];
  };
  daily?: {
    time?: string[];
    wave_height_max?: number[];
    wave_direction_dominant?: number[];
    swell_wave_height_max?: number[];
    swell_wave_period_max?: number[];
  };
};

type OpenMeteoMarineSnapshot = {
  updatedAt: string;
  seaTemperature?: number;
  waveHeight?: number;
  waveDirection?: number;
  swellWaveHeight?: number;
  swellWaveDirection?: number;
  swellWavePeriod?: number;
  forecast: Array<{
    date: string;
    seaTemperature?: number;
    waveHeight?: number;
    waveDirection?: number;
    swellWaveHeight?: number;
    swellWavePeriod?: number;
  }>;
};

const defaultLatitude = "43.7745";
const defaultLongitude = "7.4975";
export const weatherRevalidateSeconds = 7200;
export type WeatherForecastDays = 5 | 16;

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

async function fetchOpenMeteoWeather(forecastDays: WeatherForecastDays = 5): Promise<MentonWeather | null> {
  const latitude = process.env.WEATHER_LATITUDE || defaultLatitude;
  const longitude = process.env.WEATHER_LONGITUDE || defaultLongitude;
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("timezone", "Europe/Paris");
  url.searchParams.set("forecast_days", String(forecastDays));
  url.searchParams.set("current", "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,relative_humidity_2m");
  url.searchParams.set("hourly", "precipitation_probability");
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max",
  );

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
    uvIndexMax:
      typeof data.daily?.uv_index_max?.[index] === "number"
        ? Number(data.daily.uv_index_max[index].toFixed(1))
        : undefined,
    windSpeedMax:
      typeof data.daily?.wind_speed_10m_max?.[index] === "number"
        ? Math.round(data.daily.wind_speed_10m_max[index])
        : undefined,
  }));

  return {
    provider: "Open-Meteo",
    updatedAt: data.current.time ?? new Date().toISOString(),
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: typeof data.current.apparent_temperature === "number" ? Math.round(data.current.apparent_temperature) : undefined,
    seaTemperature: (await fetchOpenMeteoMarineSnapshot(latitude, longitude, forecastDays))?.seaTemperature,
    windSpeed: Math.round(data.current.wind_speed_10m),
    windGusts: typeof data.current.wind_gusts_10m === "number" ? Math.round(data.current.wind_gusts_10m) : undefined,
    humidity: typeof data.current.relative_humidity_2m === "number" ? Math.round(data.current.relative_humidity_2m) : undefined,
    weatherCode: data.current.weather_code,
    uvIndexMax: typeof data.daily?.uv_index_max?.[0] === "number" ? Number(data.daily.uv_index_max[0].toFixed(1)) : undefined,
    rainChance: closestRainChance(data),
    forecast,
  };
}

async function fetchOpenMeteoAirQuality(): Promise<MentonAirQuality | null> {
  const latitude = process.env.WEATHER_LATITUDE || defaultLatitude;
  const longitude = process.env.WEATHER_LONGITUDE || defaultLongitude;
  const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("timezone", "Europe/Paris");
  url.searchParams.set("current", "european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,uv_index");
  url.searchParams.set("daily", "uv_index_max");

  try {
    const response = await fetch(url, {
      next: { revalidate: weatherRevalidateSeconds },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as OpenMeteoAirQualityResponse;
    return {
      provider: "Open-Meteo Air Quality",
      updatedAt: data.current?.time ?? new Date().toISOString(),
      europeanAqi: typeof data.current?.european_aqi === "number" ? Math.round(data.current.european_aqi) : undefined,
      pm2_5: typeof data.current?.pm2_5 === "number" ? Number(data.current.pm2_5.toFixed(1)) : undefined,
      pm10: typeof data.current?.pm10 === "number" ? Number(data.current.pm10.toFixed(1)) : undefined,
      no2: typeof data.current?.nitrogen_dioxide === "number" ? Number(data.current.nitrogen_dioxide.toFixed(1)) : undefined,
      ozone: typeof data.current?.ozone === "number" ? Number(data.current.ozone.toFixed(1)) : undefined,
      uvIndex: typeof data.current?.uv_index === "number" ? Number(data.current.uv_index.toFixed(1)) : undefined,
      uvIndexMax: typeof data.daily?.uv_index_max?.[0] === "number" ? Number(data.daily.uv_index_max[0].toFixed(1)) : undefined,
    };
  } catch {
    return null;
  }
}

async function fetchOpenMeteoMarineSnapshot(latitude: string, longitude: string, forecastDays: WeatherForecastDays = 5): Promise<OpenMeteoMarineSnapshot | null> {
  const url = new URL("https://marine-api.open-meteo.com/v1/marine");

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("timezone", "Europe/Paris");
  url.searchParams.set("forecast_days", String(forecastDays));
  url.searchParams.set(
    "current",
    "sea_surface_temperature,wave_height,wave_direction,swell_wave_height,swell_wave_direction,swell_wave_period",
  );
  url.searchParams.set("hourly", "sea_surface_temperature,wave_height");
  url.searchParams.set("daily", "wave_height_max,wave_direction_dominant,swell_wave_height_max,swell_wave_period_max");

  try {
    const response = await fetch(url, {
      next: { revalidate: weatherRevalidateSeconds },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as OpenMeteoMarineResponse;
    const hourlyTimes = data.hourly?.time ?? [];
    const hourlySea = data.hourly?.sea_surface_temperature ?? [];
    const hourlyWave = data.hourly?.wave_height ?? [];
    const marineByDate = new Map<
      string,
      { seaSum: number; seaCount: number; maxWave?: number }
    >();

    hourlyTimes.forEach((time, index) => {
      const dateKey = time.slice(0, 10);
      const currentEntry = marineByDate.get(dateKey) ?? { seaSum: 0, seaCount: 0, maxWave: undefined };
      const seaValue = hourlySea[index];
      const waveValue = hourlyWave[index];

      if (typeof seaValue === "number") {
        currentEntry.seaSum += seaValue;
        currentEntry.seaCount += 1;
      }

      if (typeof waveValue === "number") {
        currentEntry.maxWave =
          typeof currentEntry.maxWave === "number" ? Math.max(currentEntry.maxWave, waveValue) : waveValue;
      }

      marineByDate.set(dateKey, currentEntry);
    });

    const forecast = (data.daily?.time ?? []).slice(0, 5).map((date, index) => {
      const dailyEntry = marineByDate.get(date);
      const averagedSea =
        dailyEntry && dailyEntry.seaCount > 0 ? Number((dailyEntry.seaSum / dailyEntry.seaCount).toFixed(1)) : undefined;
      return {
        date,
        seaTemperature: averagedSea,
        waveHeight:
          typeof data.daily?.wave_height_max?.[index] === "number"
            ? Number(data.daily.wave_height_max[index].toFixed(1))
            : dailyEntry?.maxWave
              ? Number(dailyEntry.maxWave.toFixed(1))
              : undefined,
        waveDirection:
          typeof data.daily?.wave_direction_dominant?.[index] === "number"
            ? Math.round(data.daily.wave_direction_dominant[index])
            : undefined,
        swellWaveHeight:
          typeof data.daily?.swell_wave_height_max?.[index] === "number"
            ? Number(data.daily.swell_wave_height_max[index].toFixed(1))
            : undefined,
        swellWavePeriod:
          typeof data.daily?.swell_wave_period_max?.[index] === "number"
            ? Number(data.daily.swell_wave_period_max[index].toFixed(1))
            : undefined,
      };
    });

    return {
      updatedAt: data.current?.time ?? new Date().toISOString(),
      seaTemperature:
        typeof data.current?.sea_surface_temperature === "number" ? Math.round(data.current.sea_surface_temperature) : undefined,
      waveHeight: typeof data.current?.wave_height === "number" ? Number(data.current.wave_height.toFixed(1)) : undefined,
      waveDirection: typeof data.current?.wave_direction === "number" ? Math.round(data.current.wave_direction) : undefined,
      swellWaveHeight:
        typeof data.current?.swell_wave_height === "number" ? Number(data.current.swell_wave_height.toFixed(1)) : undefined,
      swellWaveDirection:
        typeof data.current?.swell_wave_direction === "number" ? Math.round(data.current.swell_wave_direction) : undefined,
      swellWavePeriod:
        typeof data.current?.swell_wave_period === "number" ? Number(data.current.swell_wave_period.toFixed(1)) : undefined,
      forecast,
    };
  } catch {
    return null;
  }
}

const getCachedOpenMeteoWeather = unstable_cache(
  async (forecastDays: WeatherForecastDays) => {
    const weather = await fetchOpenMeteoWeather(forecastDays);
    if (!weather) {
      throw new Error("Open-Meteo weather unavailable");
    }
    return weather;
  },
  ["menton-weather-v2"],
  { revalidate: weatherRevalidateSeconds },
);

const getCachedOpenMeteoMarineSnapshot = unstable_cache(
  async (forecastDays: WeatherForecastDays) => {
    const latitude = process.env.WEATHER_LATITUDE || defaultLatitude;
    const longitude = process.env.WEATHER_LONGITUDE || defaultLongitude;
    const marine = await fetchOpenMeteoMarineSnapshot(latitude, longitude, forecastDays);
    if (!marine) {
      throw new Error("Open-Meteo marine snapshot unavailable");
    }
    return marine;
  },
  ["menton-marine-v1"],
  { revalidate: weatherRevalidateSeconds },
);

const getCachedOpenMeteoAirQuality = unstable_cache(
  async () => {
    const airQuality = await fetchOpenMeteoAirQuality();
    if (!airQuality) {
      throw new Error("Open-Meteo air quality unavailable");
    }
    return airQuality;
  },
  ["menton-air-quality-v1"],
  { revalidate: weatherRevalidateSeconds },
);

export async function getMentonWeather(forecastDays: WeatherForecastDays = 5) {
  const provider = process.env.WEATHER_PROVIDER || "open-meteo";

  if (provider !== "open-meteo") {
    return null;
  }

  try {
    return await getCachedOpenMeteoWeather(forecastDays);
  } catch {
    return null;
  }
}

export async function getMentonMarineConditions(forecastDays: WeatherForecastDays = 5): Promise<MentonMarineConditions | null> {
  const provider = process.env.WEATHER_PROVIDER || "open-meteo";

  if (provider !== "open-meteo") {
    return null;
  }

  const [weather, marine] = await Promise.all([
    getMentonWeather(forecastDays),
    getCachedOpenMeteoMarineSnapshot(forecastDays).catch(() => null),
  ]);

  if (!weather && !marine) {
    return null;
  }

  return {
    provider: "Open-Meteo marine + weather",
    updatedAt: marine?.updatedAt ?? weather?.updatedAt ?? new Date().toISOString(),
    seaTemperature: marine?.seaTemperature ?? weather?.seaTemperature,
    windSpeed: weather?.windSpeed,
    weatherCode: weather?.weatherCode,
    rainChance: weather?.rainChance,
    waveHeight: marine?.waveHeight,
    waveDirection: marine?.waveDirection,
    swellWaveHeight: marine?.swellWaveHeight,
    swellWaveDirection: marine?.swellWaveDirection,
    swellWavePeriod: marine?.swellWavePeriod,
    forecast: (weather?.forecast ?? []).map((day, index) => ({
      ...day,
      seaTemperature: marine?.forecast[index]?.seaTemperature,
      waveHeight: marine?.forecast[index]?.waveHeight,
      waveDirection: marine?.forecast[index]?.waveDirection,
      swellWaveHeight: marine?.forecast[index]?.swellWaveHeight,
      swellWavePeriod: marine?.forecast[index]?.swellWavePeriod,
    })),
  };
}

export async function getMentonAirQuality(): Promise<MentonAirQuality | null> {
  const provider = process.env.WEATHER_PROVIDER || "open-meteo";
  if (provider !== "open-meteo") {
    return null;
  }

  try {
    return await getCachedOpenMeteoAirQuality();
  } catch {
    return null;
  }
}

export async function getMentonRightNow(forecastDays: WeatherForecastDays = 5): Promise<MentonRightNow> {
  const [weather, marine, airQuality] = await Promise.all([
    getMentonWeather(forecastDays),
    getMentonMarineConditions(forecastDays),
    getMentonAirQuality(),
  ]);

  return { weather, marine, airQuality };
}
