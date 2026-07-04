import Image from "next/image";
import { ImageLightboxButton } from "@/components/media/ImageLightboxButton";
import type { Locale } from "@/i18n/locales";

export type GuideVisualTheme =
  | "sea"
  | "old-town"
  | "food"
  | "market"
  | "garden"
  | "nightlife"
  | "transport"
  | "family"
  | "itinerary"
  | "event"
  | "beach"
  | "bar"
  | "rooftop"
  | "viewpoint"
  | "port"
  | "walk"
  | "museum";

const themeLabels: Record<Locale, Record<GuideVisualTheme, string>> = {
  en: {
    sea: "Seafront", "old-town": "Old town", food: "Food", market: "Market", garden: "Garden", nightlife: "Evening", transport: "Transport", family: "Family", itinerary: "Itinerary", event: "Event", beach: "Beach", bar: "Bar", rooftop: "Rooftop", viewpoint: "Viewpoint", port: "Port", walk: "Walk", museum: "Museum",
  },
  fr: {
    sea: "Front de mer", "old-town": "Vieille ville", food: "Cuisine", market: "Marche", garden: "Jardin", nightlife: "Soiree", transport: "Transport", family: "Famille", itinerary: "Itineraire", event: "Evenement", beach: "Plage", bar: "Bar", rooftop: "Rooftop", viewpoint: "Point de vue", port: "Port", walk: "Balade", museum: "Musee",
  },
  it: {
    sea: "Lungomare", "old-town": "Centro storico", food: "Cibo", market: "Mercato", garden: "Giardino", nightlife: "Sera", transport: "Trasporti", family: "Famiglia", itinerary: "Itinerario", event: "Evento", beach: "Spiaggia", bar: "Bar", rooftop: "Rooftop", viewpoint: "Belvedere", port: "Porto", walk: "Passeggiata", museum: "Museo",
  },
  uk: {
    sea: "Набережна", "old-town": "Старе місто", food: "Їжа", market: "Ринок", garden: "Сад", nightlife: "Вечір", transport: "Транспорт", family: "Сім'я", itinerary: "Маршрут", event: "Подія", beach: "Пляж", bar: "Бар", rooftop: "Rooftop", viewpoint: "Краєвид", port: "Порт", walk: "Прогулянка", museum: "Музей",
  },
};

const iconPaths: Record<GuideVisualTheme, string> = {
  sea: "M8 30c7-7 15 7 24 0 7-5 14-4 20 1M8 42c7-7 15 7 24 0 7-5 14-4 20 1",
  beach: "M10 35c12-10 28-10 42 0M16 35l5 12M44 35l-5 12M30 12v18m-10-8h20",
  "old-town": "M14 48V22l12-8 12 8v26M22 48V34h8v14M38 48V28h10v20",
  walk: "M30 14a5 5 0 100-10 5 5 0 000 10zM25 20l10 4-5 12 10 13M28 36l-9 13",
  food: "M18 10v18m6-18v18m-9 0h12M38 10v40M38 30c8-2 11-10 5-18",
  market: "M12 24h40l-4-10H16l-4 10zm4 0v26h32V24M22 50V34h20v16",
  garden: "M30 50V28M30 28c-12 0-16-8-16-16 12 0 16 8 16 16zm0 0c12 0 16-8 16-16-12 0-16 8-16 16z",
  nightlife: "M38 8c-4 9-2 20 8 26-10 7-25 2-29-10C13 12 24 3 38 8zM44 42l4 8M40 50h16",
  transport: "M14 18h36v22H14zM20 40l-5 10M44 40l5 10M22 26h20M22 34h20",
  family: "M23 22a6 6 0 100-12 6 6 0 000 12zm18 0a6 6 0 100-12 6 6 0 000 12zM12 50c2-13 20-13 22 0M30 50c2-13 20-13 22 0",
  itinerary: "M14 16h14l6 8h16v28H14zM22 34h20M22 42h14",
  event: "M16 16h32v34H16zM22 10v12M42 10v12M16 26h32M24 36h4M36 36h4M24 44h4",
  bar: "M18 14h28l-6 18H24L18 14zm14 18v16M24 48h16",
  rooftop: "M12 42h40M16 42V26l14-10 14 10v16M24 42V30h12v12",
  viewpoint: "M10 34c12-14 28-14 44 0-16 14-32 14-44 0zm22 7a7 7 0 100-14 7 7 0 000 14z",
  port: "M32 8v42M20 20h24M16 50c5-6 11-6 16 0 5-6 11-6 16 0M32 8l9 10H32",
  museum: "M12 22h40L32 10 12 22zm4 4h32M18 26v20M28 26v20M38 26v20M48 26v20M14 50h36",
};

export function GuideVisual({
  image,
  imageAlt,
  locale,
  theme = "sea",
  label,
  priority = false,
  className = "",
  expandable = false,
  showLabel = true,
}: {
  image?: string;
  imageAlt?: string;
  locale: Locale;
  theme?: GuideVisualTheme;
  label?: string;
  priority?: boolean;
  className?: string;
  expandable?: boolean;
  showLabel?: boolean;
}) {
  const visualLabel = label ?? themeLabels[locale][theme];
  const alt = imageAlt ?? visualLabel;

  return (
    <div className={`relative overflow-hidden border-b border-[#dfd2b8] bg-[#f7efe1] ${className}`}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.035]"
          quality={90}
          preload={priority}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fff7d6_0,#f4dec0_26%,transparent_50%),linear-gradient(135deg,#f8f3ea,#dfeee9_58%,#f0d7a7)]" />
      )}
      {image && expandable ? <ImageLightboxButton src={image} alt={alt} locale={locale} /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-[#173f36]/45 via-transparent to-white/10" />
      <div className="relative flex h-full min-h-[9rem] flex-col justify-between p-3">
        {showLabel ? <p className="max-w-[86%] truncate bg-[#fffaf0]/90 px-2 py-1 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-[#173f36]">{visualLabel}</p> : <span aria-hidden="true" />}
        {!image ? (
          <svg aria-hidden="true" className="h-16 w-16 text-[#173f36]/80" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={iconPaths[theme]} />
          </svg>
        ) : null}
      </div>
    </div>
  );
}
