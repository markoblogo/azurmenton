"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { bookingFunnelEvents, trackBookingFunnelEvent } from "@/lib/analytics";
import { FAVOURITES_CHANGED, FAVOURITES_KEY, readFavourites, setFavourite, type Favourite } from "@/lib/favourites";

const labels = {
  en: { add: "Save to favourites", remove: "Remove from favourites", error: "Could not save on this device" },
  fr: { add: "Ajouter aux favoris", remove: "Retirer des favoris", error: "Impossible d'enregistrer sur cet appareil" },
  it: { add: "Aggiungi ai preferiti", remove: "Rimuovi dai preferiti", error: "Impossibile salvare su questo dispositivo" },
  uk: { add: "Додати до обраного", remove: "Видалити з обраного", error: "Не вдалося зберегти на цьому пристрої" },
} satisfies Record<Locale, { add: string; remove: string; error: string }>;

export function FavouriteButton({ item, locale }: { item: Favourite; locale: Locale }) {
  const [selected, setSelected] = useState(false);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const refresh = () => {
      try { setSelected(readFavourites(window.localStorage).some(entry => entry.type === item.type && entry.id === item.id)); }
      catch { setSelected(false); }
      setReady(true);
    };
    const onStorage = (event: StorageEvent) => { if (event.key === FAVOURITES_KEY || event.key === null) refresh(); };
    refresh();
    window.addEventListener(FAVOURITES_CHANGED, refresh);
    window.addEventListener("storage", onStorage);
    return () => { window.removeEventListener(FAVOURITES_CHANGED, refresh); window.removeEventListener("storage", onStorage); };
  }, [item.type, item.id]);

  function toggle() {
    const next = !selected;
    try {
      if (!setFavourite(window.localStorage, item, next)) { setError(true); return; }
    } catch { setError(true); return; }
    setSelected(next);
    setError(false);
    window.dispatchEvent(new Event(FAVOURITES_CHANGED));
    trackBookingFunnelEvent(next ? bookingFunnelEvents.favouriteAdded : bookingFunnelEvents.favouriteRemoved, { locale, contentType: item.type, contentId: item.id });
  }

  const label = selected ? labels[locale].remove : labels[locale].add;
  return <span className="inline-flex flex-col items-end gap-1"><button type="button" disabled={!ready} onClick={toggle} aria-label={label} aria-pressed={selected} title={label} data-content-type={item.type} data-content-id={item.id} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fffdf8]/95 text-[#173f36] shadow-sm ring-1 ring-[#173f36]/10 hover:bg-[#e7f1ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"><Heart aria-hidden size={20} strokeWidth={1.7} fill={selected ? "currentColor" : "none"} /></button>{error ? <span role="status" className="max-w-44 text-xs text-red-800">{labels[locale].error}</span> : null}</span>;
}
