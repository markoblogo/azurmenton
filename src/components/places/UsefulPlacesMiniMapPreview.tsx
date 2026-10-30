"use client";

import Link from "next/link";
import type { Route } from "next";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { miniMapCategories } from "@/content/planning/map-taxonomy";
import type { ApartmentMarker, MapPlace } from "@/components/places/LeafletPlacesMap";

const copy = {
  en: { all: "All", detail: "Explore the map", open: "Open in Google Maps", guide: "Related guide", apartment: "Apartment" },
  fr: { all: "Tout", detail: "Explorer la carte", open: "Ouvrir dans Google Maps", guide: "Guide lie", apartment: "Appartement" },
  it: { all: "Tutto", detail: "Esplora la mappa", open: "Apri in Google Maps", guide: "Guida correlata", apartment: "Appartamento" },
  uk: { all: "Усі", detail: "Переглянути карту", open: "Відкрити в Google Maps", guide: "Пов'язаний гід", apartment: "Апартаменти" },
} satisfies Record<Locale, Record<string, string>>;

const categories = miniMapCategories;

const LeafletMiniMap = dynamic(() => import("./LeafletPlacesMap").then((module) => module.LeafletPlacesMap), {
  ssr: false,
  loading: () => <div className="grid h-[17rem] place-items-center bg-[#efe6d5] text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#173f36]">Loading map</div>,
});

export function UsefulPlacesMiniMapPreview({ locale, places, apartmentMarkers }: { locale: Locale; places: MapPlace[]; apartmentMarkers: ApartmentMarker[] }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = mapContainer.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setMapVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMapVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const labels = copy[locale];
  const filtered = useMemo(() => {
    const category = categories.find((item) => item.id === activeCategory);
    return category ? places.filter((place) => category.placeTypes.includes(place.type)) : places;
  }, [activeCategory, places]);
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
      <div ref={mapContainer} className="overflow-hidden">
        {mapVisible ? (
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
        ) : <div className="h-[17rem] bg-[#efe6d5]" />}
      </div>
    </div>
  );
}

function filterClass(active: boolean) {
  return `inline-flex min-h-7 items-center border px-2.5 text-[0.54rem] font-bold uppercase tracking-[0.12em] ${active ? "border-[#173f36] bg-[#173f36] text-white" : "border-[#dfd2b8] bg-[#fffaf0] text-[#173f36] hover:bg-[#f3ead7]"}`;
}
