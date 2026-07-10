import type { Locale } from "@/i18n/locales";
import type { PlaceType } from "@/content/places";

export type MapCategoryId =
  | "beaches"
  | "markets"
  | "supermarkets"
  | "restaurants"
  | "bars"
  | "casinos"
  | "ice-cream"
  | "museums"
  | "cinemas"
  | "theatres"
  | "gardens"
  | "viewpoints"
  | "cycling"
  | "parking"
  | "ports"
  | "golf"
  | "ski"
  | "mountains"
  | "pools"
  | "theme-parks"
  | "playgrounds"
  | "activities"
  | "shopping"
  | "services";

export type MapCategory = {
  id: MapCategoryId;
  placeTypes: PlaceType[];
  label: Record<Locale, string>;
};

const label = (en: string, fr: string, it: string, uk: string) => ({ en, fr, it, uk });

export const mapCategories: MapCategory[] = [
  { id: "beaches", placeTypes: ["beach"], label: label("Beaches", "Plages", "Spiagge", "Пляжі") },
  { id: "markets", placeTypes: ["market"], label: label("Markets", "Marches", "Mercati", "Ринки") },
  { id: "supermarkets", placeTypes: ["supermarket"], label: label("Supermarkets", "Supermarches", "Supermercati", "Супермаркети") },
  { id: "restaurants", placeTypes: ["restaurant"], label: label("Restaurants", "Restaurants", "Ristoranti", "Ресторани") },
  { id: "bars", placeTypes: ["bar", "wine-bar", "winery", "rooftop"], label: label("Bars & wine", "Bars et vins", "Bar e vino", "Бари й вино") },
  { id: "casinos", placeTypes: ["casino"], label: label("Casinos", "Casinos", "Casino", "Казино") },
  { id: "ice-cream", placeTypes: ["ice-cream"], label: label("Ice cream", "Glaciers", "Gelaterie", "Морозиво") },
  { id: "museums", placeTypes: ["museum"], label: label("Museums", "Musees", "Musei", "Музеї") },
  { id: "cinemas", placeTypes: ["cinema"], label: label("Cinemas", "Cinemas", "Cinema", "Кінотеатри") },
  { id: "theatres", placeTypes: ["theatre"], label: label("Theatres", "Theatres", "Teatri", "Театри") },
  { id: "gardens", placeTypes: ["garden"], label: label("Gardens", "Jardins", "Giardini", "Сади") },
  { id: "viewpoints", placeTypes: ["viewpoint"], label: label("Viewpoints", "Points de vue", "Panorami", "Оглядові місця") },
  { id: "cycling", placeTypes: ["bike-shop", "cycle-route"], label: label("Cycling", "Velo", "Bici", "Велосипеди") },
  { id: "parking", placeTypes: ["parking"], label: label("Parking", "Parkings", "Parcheggi", "Паркінги") },
  { id: "ports", placeTypes: ["port"], label: label("Ports", "Ports", "Porti", "Порти") },
  { id: "golf", placeTypes: ["golf-course"], label: label("Golf", "Golf", "Golf", "Гольф") },
  { id: "ski", placeTypes: ["ski-resort"], label: label("Ski", "Ski", "Sci", "Лижі") },
  { id: "mountains", placeTypes: ["mountain"], label: label("Mountains", "Montagne", "Montagne", "Гори") },
  { id: "pools", placeTypes: ["pool"], label: label("Pools", "Piscines", "Piscine", "Басейни") },
  { id: "theme-parks", placeTypes: ["theme-park"], label: label("Theme parks", "Parcs de loisirs", "Parchi", "Парки") },
  { id: "playgrounds", placeTypes: ["playground"], label: label("Playgrounds", "Aires de jeux", "Parchi giochi", "Майданчики") },
  { id: "activities", placeTypes: ["family-activity", "skatepark"], label: label("Activities", "Activites", "Attivita", "Активності") },
  { id: "shopping", placeTypes: ["shopping-centre"], label: label("Shopping", "Shopping", "Shopping", "Шопінг") },
  { id: "services", placeTypes: ["tourist-office", "station", "car-rental", "healthcare", "hospital", "police", "civic"], label: label("Services", "Services", "Servizi", "Сервіси") },
];

export type MiniMapCategory = Pick<MapCategory, "label" | "placeTypes"> & { id: "beaches" | "markets" | "food" };

export const miniMapCategories: MiniMapCategory[] = [
  { id: "beaches", placeTypes: ["beach"], label: label("Beaches", "Plages", "Spiagge", "Пляжі") },
  { id: "markets", placeTypes: ["market", "supermarket"], label: label("Markets", "Marches", "Mercati", "Ринки") },
  { id: "food", placeTypes: ["restaurant", "bar", "wine-bar", "ice-cream"], label: label("Food", "Cuisine", "Cibo", "Їжа") },
];

export const mapPlaceTypes = new Set(mapCategories.flatMap((category) => category.placeTypes));
