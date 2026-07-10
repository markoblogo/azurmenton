export type ApartmentMapPoint = {
  apartmentSlug: string;
  lat: number;
  lng: number;
  review: {
    source: "host_verified";
    precision: "building";
    checkedOn: string;
  };
};

export const apartmentMapPoints: ApartmentMapPoint[] = [
  { apartmentSlug: "sea-view-balcony-studio", lat: 43.7775, lng: 7.4934, review: { source: "host_verified", precision: "building", checkedOn: "2026-07-10" } },
  { apartmentSlug: "beachside-family-apartment", lat: 43.7774, lng: 7.4928, review: { source: "host_verified", precision: "building", checkedOn: "2026-07-10" } },
  { apartmentSlug: "panoramic-sea-view-studio", lat: 43.7854, lng: 7.5089, review: { source: "host_verified", precision: "building", checkedOn: "2026-07-10" } },
];
