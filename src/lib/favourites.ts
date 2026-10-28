export type FavouriteType = "guide" | "event" | "place";
export type Favourite = { type: FavouriteType; id: string };

export const FAVOURITES_KEY = "azurmenton.favourites.v1";
export const FAVOURITES_CHANGED = "azurmenton:favourites-changed";
const MAX_FAVOURITES = 200;
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isFavourite(value: unknown): value is Favourite {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (item.type === "guide" || item.type === "event" || item.type === "place") &&
    typeof item.id === "string" && item.id.length <= 160 && idPattern.test(item.id);
}

export function parseFavourites(raw: string | null): Favourite[] {
  if (!raw || raw.length > 50000) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || (data as { version?: unknown }).version !== 1 || !Array.isArray((data as { items?: unknown }).items)) return [];
    const items = (data as { items: unknown[] }).items;
    const seen = new Set<string>();
    return items.filter(isFavourite).filter(item => {
      const key = `${item.type}:${item.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, MAX_FAVOURITES).map(({ type, id }) => ({ type, id }));
  } catch {
    return [];
  }
}

export function readFavourites(storage: Pick<Storage, "getItem">): Favourite[] {
  try { return parseFavourites(storage.getItem(FAVOURITES_KEY)); } catch { return []; }
}

export function setFavourite(storage: Pick<Storage, "getItem" | "setItem">, item: Favourite, selected: boolean): boolean {
  if (!isFavourite(item)) return false;
  try {
    const items = parseFavourites(storage.getItem(FAVOURITES_KEY));
    const index = items.findIndex(existing => existing.type === item.type && existing.id === item.id);
    if (selected && index === -1) {
      if (items.length >= MAX_FAVOURITES) return false;
      items.push({ type: item.type, id: item.id });
    } else if (!selected && index !== -1) items.splice(index, 1);
    else return true;
    storage.setItem(FAVOURITES_KEY, JSON.stringify({ version: 1, items }));
    return true;
  } catch { return false; }
}
