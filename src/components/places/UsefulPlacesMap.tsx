"use client";

import Link from "next/link";
import type { Route } from "next";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { apartments } from "@/content/apartments";
import { apartmentMapPoints } from "@/content/planning/apartment-map-points";
import type { Place, PlaceType } from "@/content/places";
import { GuideVisual } from "@/components/guide/GuideVisual";

export type UsefulPlaceMapCategory = {
  id: string;
  label: Record<Locale, string>;
  placeTypes: PlaceType[];
};

export type UsefulPlaceWithMapPoint = Place & {
  mapPoint: {
    lat: number;
    lng: number;
  };
};

const copy = {
  en: { all: "All", map: "Show on map", open: "Open in Google Maps", guide: "Related guide", showing: "Showing", places: "mapped places", note: "Check current hours and routes before relying on a visit.", apartment: "Apartment" },
  fr: { all: "Tout", map: "Voir sur la carte", open: "Ouvrir dans Google Maps", guide: "Guide lie", showing: "Affiche", places: "lieux cartographies", note: "Verifiez horaires et trajets actuels avant de vous deplacer.", apartment: "Appartement" },
  it: { all: "Tutto", map: "Mostra sulla mappa", open: "Apri in Google Maps", guide: "Guida correlata", showing: "Mostra", places: "luoghi in mappa", note: "Controlla orari e percorsi aggiornati prima della visita.", apartment: "Appartamento" },
  uk: { all: "Усі", map: "Показати на карті", open: "Відкрити в Google Maps", guide: "Пов'язаний гід", showing: "Показано", places: "місць на карті", note: "Перед візитом перевіряйте актуальні години й маршрути.", apartment: "Апартаменти" },
} satisfies Record<Locale, Record<string, string>>;

const LeafletPlacesMap = dynamic(() => import("./LeafletPlacesMap").then((module) => module.LeafletPlacesMap), {
  ssr: false,
  loading: () => <div className="grid h-[34rem] place-items-center bg-[#f8f3ea] text-sm font-semibold uppercase tracking-[0.14em] text-[#173f36]">Loading map</div>,
});

export function UsefulPlacesMap({ locale, places, categories }: { locale: Locale; places: UsefulPlaceWithMapPoint[]; categories: UsefulPlaceMapCategory[] }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState(places[0]?.id ?? "");
  const labels = copy[locale];
  const filtered = useMemo(() => {
    const category = categories.find((item) => item.id === activeCategory);
    if (!category) return places;
    return places.filter((place) => category.placeTypes.includes(place.type));
  }, [activeCategory, categories, places]);

  const selected = filtered.find((place) => place.id === selectedPlaceId) ?? filtered[0];
  const center: [number, number] = selected ? [selected.mapPoint.lat, selected.mapPoint.lng] : [43.775, 7.5];
  const apartmentMarkers = apartmentMapPoints
    .map((point) => {
      const apartment = apartments.find((item) => item.slug === point.apartmentSlug);
      return apartment ? { ...point, apartment } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="grid gap-6">
      <section className="border border-[#dfd2b8] bg-[#fffaf0]" aria-label={labels.map}>
        <div className="bg-[#173f36] p-4 text-white">
          <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("")}
            className={`border px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] ${activeCategory === "" ? "border-[#c6a66a] bg-[#c6a66a] text-[#173f36]" : "border-[#c6a66a]/70 text-white hover:bg-white/10"}`}
          >
            {labels.all}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`border px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] ${activeCategory === category.id ? "border-[#c6a66a] bg-[#c6a66a] text-[#173f36]" : "border-[#c6a66a]/70 text-white hover:bg-white/10"}`}
            >
              {category.label[locale]}
            </button>
          ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-[#e8dcc9]">
            {labels.showing} <span className="font-semibold text-white">{filtered.length}</span> {labels.places}. {labels.note}
          </p>
        </div>
        <div className="overflow-hidden bg-[#f8f3ea]">
          <LeafletPlacesMap center={center} places={filtered} apartments={apartmentMarkers} locale={locale} openLabel={labels.open} guideLabel={labels.guide} apartmentLabel={labels.apartment} onSelectPlace={setSelectedPlaceId} />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((place) => {
          const mapsHref = place.googleMapsSearchUrl ?? place.googleMapsUrl;
          const relatedHref = place.relatedArticleIds[0] ? (`/${locale}/guide/${place.relatedArticleIds[0]}` as Route) : undefined;
          const visualLabel = place.type.replaceAll("-", " ");

          return (
            <article key={place.id} className={`overflow-hidden border bg-[#fffaf0] ${place.id === selected?.id ? "border-[#173f36]" : "border-[#dfd2b8]"}`}>
              <GuideVisual image={place.image} imageAlt={place.imageAlt?.[locale]} locale={locale} theme={place.visualTheme ?? "walk"} label={visualLabel} className="aspect-[4/1.85]" expandable />
              <div className="p-5">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{visualLabel}</p>
                <h3 className="mt-2 serif-heading text-2xl leading-tight text-[#173f36]">{place.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5c5044]">{place.shortNote[locale]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSelectedPlaceId(place.id)} className="inline-flex border border-[#173f36] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#173f36] hover:text-white">
                    {labels.map}
                  </button>
                  {mapsHref ? (
                    <Link className="inline-flex border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={mapsHref as Route} target="_blank" rel="noopener noreferrer">
                      {labels.open}
                    </Link>
                  ) : null}
                  {relatedHref ? (
                    <Link className="inline-flex border border-[#dfd2b8] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={relatedHref}>
                      {labels.guide}
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
