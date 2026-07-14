export type PlaceMapExclusionReason = "coordinate_unverified" | "not_a_fixed_venue" | "outside_map_scope";

export type PlaceMapExclusion = {
  placeId: string;
  reason: PlaceMapExclusionReason;
  checkedOn: string;
  sourceUrl: string;
};

// Explicitly record places that need a later coordinate check instead of placing
// a marker from an approximate address or a generic city result.
export const placeMapExclusions: PlaceMapExclusion[] = [
  { placeId: "atelier-boulanger-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Atelier%20Boulanger%2049%20Rue%20d%27Adh%C3%A9mar%20de%20Lantagnac%2C%20Menton" },
  { placeId: "boulangerie-la-madone-des-jardins", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Boulangerie%20La%20Madone%20des%20Jardins%2025%20Avenue%20de%20Verdun%2C%20Menton" },
  { placeId: "le-galion-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Le%20Galion%20Nouveau%20Port%20de%20Garavan%20Menton" },
  { placeId: "le-cosy-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Le%20Cosy%205%20Rue%20%C3%89douard%20Sicardi%20Menton" },
  { placeId: "la-pescaria-de-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=La%20Pescaria%20de%20Menton%20March%C3%A9%20des%20Halles%20Menton" },
  { placeId: "bouddha-beach-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Bouddha%20Beach%201502%20Promenade%20du%20Soleil%20Menton" },
  { placeId: "le-vip-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Le%20VIP%201563%20Promenade%20du%20Soleil%20Menton" },
  { placeId: "cercle-des-marins-disparus", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Le%20Cercle%20des%20Marins%20Disparus%20Port%20de%20Garavan%20Menton" },
  { placeId: "menton-petanque", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Menton%20Petanque%202%20Avenue%20de%20Florette%20Menton" },
  { placeId: "club-bouliste-de-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Club%20Bouliste%20de%20Menton%2041%20Avenue%20Porte%20de%20France%20Menton" },
  { placeId: "boulodrome-borashi-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Boulodrome%20Borashi%20119%20Avenue%20de%20Sospel%20Menton" },
  { placeId: "tennis-club-de-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Tennis%20Club%20de%20Menton%2016%20rue%20Albert%201er%2006500%20Menton" },
  { placeId: "tennis-municipal-la-madone", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Tennis%20Municipal%20de%20la%20Madone%20Menton" },
  { placeId: "sport-2000-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Sport%202000%20Menton%2019%20Rue%20Partouneaux%20Menton" },
  { placeId: "la-salle-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=LA%20Salle%20Menton%203613%20Route%20du%20Mont%20Gros%20Menton" },
  { placeId: "menton-crossfit", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Menton%20CrossFit%203513%20Route%20du%20Mont%20Gros%20Menton" },
  { placeId: "sport-plaisir-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Sport%20Plaisir%2060%20bis%20Promenade%20Val%20du%20Carei%20Menton" },
  { placeId: "centre-yoga-precision-menton", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Centre%20Yoga%20Precision%20Menton%205%20Rue%20Victor%20Hugo%20Menton" },
];
