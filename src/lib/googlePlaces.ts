export type PlacePhotoCandidate = {
  photoReference: string;
  width?: number;
  height?: number;
  attributionHtml?: string[];
};

export type GooglePlaceMetadata = {
  placeId: string;
  displayName?: string;
  formattedAddress?: string;
  googleMapsUri?: string;
  photos?: PlacePhotoCandidate[];
};

export async function fetchPlaceDetails(): Promise<GooglePlaceMetadata> {
  throw new Error(
    "Google Places integration is not implemented. Use the official Google Maps Platform with billing, attribution, caching, privacy and EEA terms review before enabling.",
  );
}

export async function fetchPlacePhotos(): Promise<PlacePhotoCandidate[]> {
  throw new Error(
    "Google Place Photos integration is not implemented. Do not scrape or hotlink Google Maps photos.",
  );
}
