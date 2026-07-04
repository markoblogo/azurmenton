"use client";

import Link from "next/link";
import type { Route } from "next";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { apartments } from "@/content/apartments";
import { apartmentMapPoints } from "@/content/planning/apartment-map-points";
import type { Place, PlaceType } from "@/content/places";

type MiniMapPlace = Pick<Place, "id" | "name" | "type" | "shortNote" | "googleMapsUrl" | "googleMapsSearchUrl"> & {
  mapPoint: { lat: number; lng: number };
};

type MiniMapCategory = {
  id: string;
  placeTypes: PlaceType[];
  label: Record<Locale, string>;
};

const copy = {
  en: { all: "All", route: "Route", detail: "Full map", apartment: "Apartment" },
  fr: { all: "Tout", route: "Trajet", detail: "Carte complete", apartment: "Appartement" },
  it: { all: "Tutto", route: "Percorso", detail: "Mappa completa", apartment: "Appartamento" },
  uk: { all: "Усі", route: "Маршрут", detail: "Повна карта", apartment: "Апартаменти" },
} satisfies Record<Locale, Record<string, string>>;

const categories: MiniMapCategory[] = [
  { id: "beaches", placeTypes: ["beach"], label: { en: "Beaches", fr: "Plages", it: "Spiagge", uk: "Пляжі" } },
  { id: "markets", placeTypes: ["market", "supermarket"], label: { en: "Markets", fr: "Marches", it: "Mercati", uk: "Ринки" } },
  { id: "walks", placeTypes: ["walk", "viewpoint", "port"], label: { en: "Walks", fr: "Balades", it: "Passeggiate", uk: "Прогулянки" } },
];

export function UsefulPlacesMiniMapPreview({ locale, places }: { locale: Locale; places: MiniMapPlace[] }) {
  const [activeCategory, setActiveCategory] = useState("");
  const labels = copy[locale];
  const filtered = useMemo(() => {
    const category = categories.find((item) => item.id === activeCategory);
    return category ? places.filter((place) => category.placeTypes.includes(place.type)) : places;
  }, [activeCategory, places]);
  const visiblePlaces = filtered.slice(0, 5);
  const apartmentMarkers = apartmentMapPoints
    .map((point) => {
      const apartment = apartments.find((item) => item.slug === point.apartmentSlug);
      return apartment ? { ...point, apartment } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="border border-[#c6a66a] bg-[#f8f3ea] text-[#173f36]">
      <div className="flex flex-wrap gap-1.5 border-b border-[#c6a66a] p-2">
        <button type="button" onClick={() => setActiveCategory("")} className={filterClass(activeCategory === "")}>{labels.all}</button>
        {categories.map((category) => (
          <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} className={filterClass(activeCategory === category.id)}>
            {category.label[locale]}
          </button>
        ))}
        <Link href={`/${locale}/map` as Route} className="ml-auto inline-flex min-h-7 items-center border border-[#173f36] px-2.5 text-[0.54rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#173f36] hover:text-white">
          {labels.detail}
        </Link>
      </div>
      <div className="grid gap-0 md:grid-cols-[1.35fr_0.65fr]">
        <div className="relative h-44 overflow-hidden border-b border-[#c6a66a] bg-[#dfeee9] md:h-48 md:border-b-0 md:border-r">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#d9eee8_0_54%,#83bfd1_54%_57%,#4c9bb2_57%_100%)]" />
          <div className="absolute left-[8%] top-[18%] h-28 w-48 rotate-[-18deg] rounded-[50%] border border-[#173f36]/15 bg-[#fffaf0]/35" />
          <div className="absolute bottom-[14%] left-[18%] h-16 w-64 rotate-[8deg] rounded-[50%] border border-[#173f36]/10 bg-[#fffaf0]/30" />
          {apartmentMarkers.map((point) => (
            <Link
              key={point.apartmentSlug}
              href={`/${locale}/apartments/${point.apartmentSlug}` as Route}
              className={`absolute z-10 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-[#fffaf0] bg-[#c6a66a] text-[0.56rem] font-black uppercase tracking-[0.04em] text-[#173f36] shadow-sm ${apartmentMarkerClass(point.apartmentSlug)}`}
              title={`${labels.apartment}: ${point.apartment.shortName[locale]}`}
            >
              Stay
            </Link>
          ))}
          {visiblePlaces.map((place) => (
            <a
              key={place.id}
              href={place.googleMapsSearchUrl ?? place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#fffaf0] bg-[#173f36] text-[0.54rem] font-bold text-white shadow-sm ${placeMarkerClass(place.id)}`}
              title={place.name}
            >
              {place.name.slice(0, 1)}
            </a>
          ))}
        </div>
        <div className="grid content-start gap-1.5 p-2">
          {visiblePlaces.slice(0, 3).map((place) => (
            <a key={place.id} href={place.googleMapsSearchUrl ?? place.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block border border-[#dfd2b8] bg-[#fffaf0] p-2 hover:border-[#173f36]">
              <p className="serif-heading text-base leading-tight">{place.name}</p>
              <p className="mt-0.5 overflow-hidden text-[0.62rem] leading-3.5 text-[#5c5044] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{place.shortNote[locale]}</p>
              <span className="mt-1 inline-flex text-[0.5rem] font-bold uppercase tracking-[0.12em] text-[#173f36]">{labels.route}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function filterClass(active: boolean) {
  return `inline-flex min-h-7 items-center border px-2.5 text-[0.54rem] font-bold uppercase tracking-[0.12em] ${active ? "border-[#173f36] bg-[#173f36] text-white" : "border-[#dfd2b8] bg-[#fffaf0] text-[#173f36] hover:bg-[#f3ead7]"}`;
}

function apartmentMarkerClass(slug: string) {
  const classes: Record<string, string> = {
    "sea-view-balcony-studio": "left-[27%] top-[61%]",
    "beachside-family-apartment": "left-[23%] top-[63%]",
    "panoramic-sea-view-studio": "left-[76%] top-[40%]",
  };
  return classes[slug] ?? "left-1/2 top-1/2";
}

function placeMarkerClass(id: string) {
  const classes: Record<string, string> = {
    "promenade-du-soleil": "left-[18%] top-[62%]",
    "plage-sablettes": "left-[56%] top-[64%]",
    "halles-du-marche": "left-[54%] top-[51%]",
    "plage-casino": "left-[25%] top-[62%]",
    "jardins-bioves": "left-[32%] top-[44%]",
    "office-tourisme-menton-riviera-merveilles": "left-[31%] top-[53%]",
  };
  return classes[id] ?? "left-1/2 top-1/2";
}
