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
  { placeId: "genoa-cristoforo-colombo-airport", reason: "outside_map_scope", checkedOn: "2026-07-15", sourceUrl: "https://www.airport.genova.it/en/to-fly-2-2/" },
  { placeId: "cuneo-levaldigi-airport", reason: "outside_map_scope", checkedOn: "2026-07-15", sourceUrl: "https://www.aeroporto.cuneo.it/en/" },
  { placeId: "torino-airport", reason: "outside_map_scope", checkedOn: "2026-07-15", sourceUrl: "https://www.aeroportoditorino.it/en/tofly/flights/departs-arrivals" },
  { placeId: "marseille-provence-airport", reason: "outside_map_scope", checkedOn: "2026-07-15", sourceUrl: "https://www.marseille-airport.com/flights-and-destinations/flights/todays-arrivals" },
  { placeId: "maison-de-la-presse-menton", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Maison%20de%20la%20Presse%2035%20Avenue%20de%20Verdun%20Menton" },
  { placeId: "boite-a-livres-trois-jarres", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.menton.fr/Boite-a-livres.html" },
  { placeId: "boite-a-livres-elisee-reclus", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.menton.fr/Boite-a-livres.html" },
  { placeId: "boite-a-livres-cernuschi", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Boite%20a%20Livres%20Cernuschi%2036%20Avenue%20Cernuschi%20Menton" },
  { placeId: "le-new-pub-menton", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.menton-riviera-merveilles.fr/offres/le-new-pub-menton-fr-3791266/" },
  { placeId: "pasticceria-cova-monaco", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Pasticceria%20Cova%20Monaco" },
  { placeId: "rainier-iii-zoological-garden-monaco", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Rainier%20III%20Zoological%20Garden%20Monaco" },
  { placeId: "pelagos-sanctuary", reason: "not_a_fixed_venue", checkedOn: "2026-07-14", sourceUrl: "https://www.sanctuaire-pelagos.org/" },
  { placeId: "monaco-ville-souvenir-shops", reason: "not_a_fixed_venue", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Monaco-Ville%20souvenir%20shops" },
  { placeId: "twiga-monte-carlo", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Twiga%20Monte%20Carlo" },
  { placeId: "espace-leo-ferre-monaco", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Espace%20Leo%20Ferre%20Monaco" },
  { placeId: "bar-americain-monaco", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Bar%20Americain%20Hotel%20de%20Paris%20Monaco" },
  { placeId: "marche-u-monaco", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Marche%20U%209%20Boulevard%20d%27Italie%20Monaco" },
  { placeId: "jcc-monaco", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=JCC%20Monaco%203%20Avenue%20du%20Berceau" },
  { placeId: "monte-carlo-country-club", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Monte-Carlo%20Country%20Club" },
  { placeId: "monaco-skatepark", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Monaco%20Skatepark" },
  { placeId: "chichkhan-lounge-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=CHICHKHAN%20Lounge%2041%20Rue%20Chateauneuf%20Nice" },
  { placeId: "le-ryad-zaman-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Le%20Ryad%20Zaman%20Nice" },
  { placeId: "shapko-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Shapko%20Nice" },
  { placeId: "cave-romagnan-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=La%20Cave%20Romagnan%2022%20Rue%20d%27Angleterre%20Nice" },
  { placeId: "b-spot-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=B%20Spot%20Nice" },
  { placeId: "falafel-sahara-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Falafel%20Sahara%20Nice" },
  { placeId: "chabad-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Chabad%20Nice" },
  { placeId: "skate-park-comte-de-falicon-nice", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Skate%20Park%20Comte%20de%20Falicon%20Nice" },
  { placeId: "casa-buono-ventimiglia", reason: "coordinate_unverified", checkedOn: "2026-07-14", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Casa%20Buono%20Ventimiglia" },
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
  { placeId: "hotel-riva-art-spa", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Hotel%20Riva%20Art%20%26%20Spa%20600%20Promenade%20du%20Soleil%20Menton" },
  { placeId: "centre-bien-etre-calysta", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Centre%20de%20Bien-etre%20Calysta%206%20Rue%20Magenta%20Menton" },
  { placeId: "spa-menton-rue-partouneaux", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Spa%20Menton%20Rue%20Partouneaux%20Menton" },
  { placeId: "sauna-nordique-tende", reason: "coordinate_unverified", checkedOn: "2026-07-15", sourceUrl: "https://www.menton-riviera-merveilles.fr/offres/sauna-nordique-tende-fr-6230550/" },
];
