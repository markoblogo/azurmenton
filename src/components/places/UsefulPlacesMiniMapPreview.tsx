"use client";

import Link from "next/link";
import type { Route } from "next";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { apartments } from "@/content/apartments";
import { apartmentMapPoints } from "@/content/planning/apartment-map-points";
import type { PlaceType } from "@/content/places";
import type { UsefulPlaceWithMapPoint } from "@/components/places/UsefulPlacesMap";

type MiniMapPlace = UsefulPlaceWithMapPoint;

type MiniMapCategory = {
  id: string;
  placeTypes: PlaceType[];
  label: Record<Locale, string>;
};

const copy = {
  en: { all: "All", detail: "More", open: "Open in Google Maps", guide: "Related guide", apartment: "Apartment" },
  fr: { all: "Tout", detail: "Plus", open: "Ouvrir dans Google Maps", guide: "Guide lie", apartment: "Appartement" },
  it: { all: "Tutto", detail: "Altro", open: "Apri in Google Maps", guide: "Guida correlata", apartment: "Appartamento" },
  uk: { all: "Усі", detail: "Більше", open: "Відкрити в Google Maps", guide: "Пов'язаний гід", apartment: "Апартаменти" },
} satisfies Record<Locale, Record<string, string>>;

const categories: MiniMapCategory[] = [
  { id: "beaches", placeTypes: ["beach"], label: { en: "Beaches", fr: "Plages", it: "Spiagge", uk: "Пляжі" } },
  { id: "markets", placeTypes: ["market"], label: { en: "Markets", fr: "Marches", it: "Mercati", uk: "Ринки" } },
  { id: "food", placeTypes: ["restaurant", "bar", "wine-bar", "ice-cream"], label: { en: "Food", fr: "Food", it: "Food", uk: "Їжа" } },
];

const LeafletMiniMap = dynamic(() => import("./LeafletPlacesMap").then((module) => module.LeafletPlacesMap), {
  ssr: false,
  loading: () => <div className="grid h-[17rem] place-items-center bg-[#efe6d5] text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#173f36]">Loading map</div>,
});

export function UsefulPlacesMiniMapPreview({ locale, places }: { locale: Locale; places: MiniMapPlace[] }) {
  const [activeCategory, setActiveCategory] = useState("");
  const labels = copy[locale];
  const filtered = useMemo(() => {
    const category = categories.find((item) => item.id === activeCategory);
    return category ? places.filter((place) => category.placeTypes.includes(place.type)) : places;
  }, [activeCategory, places]);
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
        <Link href={`/${locale}/map` as Route} className="inline-flex min-h-7 items-center border border-[#173f36] bg-[#173f36] px-2.5 text-[0.54rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#102f28]">
          {labels.detail}
        </Link>
      </div>
      <div className="overflow-hidden">
        <LeafletMiniMap
          center={[43.776, 7.503]}
          places={filtered}
          apartments={apartmentMarkers}
          locale={locale}
          openLabel={labels.open}
          guideLabel={labels.guide}
          apartmentLabel={labels.apartment}
          onSelectPlace={() => undefined}
          className="h-[17rem] w-full"
          zoom={13}
        />
      </div>
    </div>
  );
}

function filterClass(active: boolean) {
  return `inline-flex min-h-7 items-center border px-2.5 text-[0.54rem] font-bold uppercase tracking-[0.12em] ${active ? "border-[#173f36] bg-[#173f36] text-white" : "border-[#dfd2b8] bg-[#fffaf0] text-[#173f36] hover:bg-[#f3ead7]"}`;
}
