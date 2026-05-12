import type { Apartment, ApartmentImage } from "@/content/apartments";

export function getHeroImage(apartment: Apartment): ApartmentImage {
  return (
    apartment.gallery.find((image) => image.src === apartment.heroImage) ?? apartment.gallery[0]
  );
}

export function getCardImage(apartment: Apartment): ApartmentImage {
  return (
    apartment.gallery.find((image) => image.src === apartment.cardImage) ??
    apartment.gallery.find((image) => image.src === apartment.heroImage) ??
    apartment.gallery[0]
  );
}

export function imageObjectPosition(apartment: Apartment, image: ApartmentImage) {
  if (image.category === "bathroom" || image.category === "kitchen") {
    return "object-center";
  }

  if (apartment.slug === "sea-view-balcony-studio") {
    return image.category === "balcony" || image.category === "view"
      ? "object-[50%_42%]"
      : "object-center";
  }

  if (apartment.slug === "beachside-family-apartment") {
    return image.category === "terrace" ? "object-[50%_48%]" : "object-center";
  }

  if (apartment.slug === "panoramic-sea-view-studio") {
    return image.category === "balcony" || image.category === "view"
      ? "object-[50%_42%]"
      : "object-center";
  }

  return "object-center";
}
