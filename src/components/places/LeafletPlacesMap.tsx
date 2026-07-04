"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Locale } from "@/i18n/locales";
import type { UsefulPlaceWithMapPoint } from "@/components/places/UsefulPlacesMap";

const markerIcon = L.divIcon({
  className: "azur-place-marker",
  html: "<span></span>",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

export function LeafletPlacesMap({
  center,
  places,
  locale,
  openLabel,
  guideLabel,
  onSelectPlace,
}: {
  center: [number, number];
  places: UsefulPlaceWithMapPoint[];
  locale: Locale;
  openLabel: string;
  guideLabel: string;
  onSelectPlace: (placeId: string) => void;
}) {
  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={false} className="h-[34rem] w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapFocus center={center} />
      {places.map((place) => {
        const mapsHref = place.googleMapsSearchUrl ?? place.googleMapsUrl;
        const relatedHref = place.relatedArticleIds[0] ? (`/${locale}/guide/${place.relatedArticleIds[0]}` as Route) : undefined;

        return (
          <Marker
            key={place.id}
            position={[place.mapPoint.lat, place.mapPoint.lng]}
            icon={markerIcon}
            eventHandlers={{ click: () => onSelectPlace(place.id) }}
          >
            <Popup>
              <div className="max-w-52">
                <p className="font-semibold text-[#173f36]">{place.name}</p>
                <p className="mt-1 text-xs leading-5 text-[#5c5044]">{place.shortNote[locale]}</p>
                <div className="mt-2 flex flex-col gap-1">
                  {mapsHref ? <a href={mapsHref} target="_blank" rel="noopener noreferrer">{openLabel}</a> : null}
                  {relatedHref ? <Link href={relatedHref}>{guideLabel}</Link> : null}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

function MapFocus({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}
