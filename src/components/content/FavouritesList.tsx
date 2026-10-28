"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { FAVOURITES_CHANGED, parseFavourites, readFavourites, type Favourite } from "@/lib/favourites";
import { FavouriteButton } from "./FavouriteButton";
import { ShareActions } from "./ShareActions";

export type SavedContent = Favourite & { title: string; href: string };
const copy = {
  en: { title: "Favourites", empty: "No saved items yet.", shared: "Shared collection", share: "Share collection", error: "This collection is too large to share in one link." },
  fr: { title: "Favoris", empty: "Aucun élément enregistré.", shared: "Sélection partagée", share: "Partager la sélection", error: "Cette sélection est trop grande pour un seul lien." },
  it: { title: "Preferiti", empty: "Nessun elemento salvato.", shared: "Raccolta condivisa", share: "Condividi la raccolta", error: "Questa raccolta è troppo grande per un solo link." },
  uk: { title: "Обране", empty: "Збережених матеріалів поки немає.", shared: "Спільна добірка", share: "Поділитися добіркою", error: "Ця добірка завелика для одного посилання." },
};

export function FavouritesList({ locale, catalog }: { locale: Locale; catalog: SavedContent[] }) {
  const [items, setItems] = useState<Favourite[]>([]);
  const [shared, setShared] = useState(false);
  const [ready, setReady] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const refresh = () => {
      const snapshot = new URLSearchParams(window.location.hash.slice(1)).get("collection");
      if (snapshot !== null) { setItems(parseFavourites(snapshot)); setShared(true); }
      else { setShared(false); try { setItems(readFavourites(window.localStorage)); } catch { setItems([]); } }
      setReady(true);
    };
    refresh();
    window.addEventListener(FAVOURITES_CHANGED, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("hashchange", refresh);
    return () => { window.removeEventListener(FAVOURITES_CHANGED, refresh); window.removeEventListener("storage", refresh); window.removeEventListener("hashchange", refresh); };
  }, []);
  const visible = items.flatMap(item => {
    const entry = catalog.find(candidate => candidate.type === item.type && candidate.id === item.id);
    return entry ? [entry] : [];
  });
  function share() {
    const fragment = new URLSearchParams({ collection: JSON.stringify({ version: 1, items: visible.map(({ type, id }) => ({ type, id })) }) });
    setUrl(`${window.location.origin}/${locale}/favourites#${fragment}`);
  }
  return <div className="mx-auto max-w-4xl px-5 py-12"><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="serif-heading text-4xl text-[#173f36]">{shared ? copy[locale].shared : copy[locale].title}</h1><a href={`/${locale}/my-trip`} className="underline underline-offset-4">{{ en: "My trip", fr: "Mon séjour", it: "Il mio viaggio", uk: "Моя поїздка" }[locale]}</a></div>
    {ready && !visible.length ? <p className="mt-6">{copy[locale].empty}</p> : null}
    <ul className="mt-8 divide-y divide-[#dfd4c1]">{visible.map(item => <li key={`${item.type}:${item.id}`} className="flex items-center justify-between gap-4 py-4"><a href={item.href} className="text-lg text-[#173f36] underline underline-offset-4">{item.title}</a><FavouriteButton locale={locale} item={item} /></li>)}</ul>
    {visible.length ? <button type="button" onClick={share} className="mt-6 border border-[#173f36] px-4 py-3">{copy[locale].share}</button> : null}
    {url && url.length <= 8000 ? <ShareActions locale={locale} title={copy[locale].shared} url={url} /> : url ? <p role="status">{copy[locale].error}</p> : null}
  </div>;
}
