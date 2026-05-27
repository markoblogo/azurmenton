"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Apartment } from "@/content/apartments";
import type { Locale } from "@/i18n/locales";
import { imageObjectPosition } from "@/lib/apartment-images";

type ApartmentGalleryProps = {
  apartment: Apartment;
  locale: Locale;
};

const galleryCopy: Record<
  Locale,
  {
    title: string;
    intro: string;
    viewAll: string;
    morePhotos: string;
    openMore: string;
    close: string;
    previous: string;
    next: string;
    photo: string;
    of: string;
    categoryLabels: Record<Apartment["gallery"][number]["category"], string>;
  }
> = {
  en: {
    title: "Photo gallery",
    intro: "The first photos show the main reason to choose this apartment, followed by living space, practical amenities and location details.",
    viewAll: "View all photos",
    morePhotos: "more photos",
    openMore: "Open full gallery",
    close: "Close",
    previous: "Previous",
    next: "Next",
    photo: "Photo",
    of: "of",
    categoryLabels: {
      balcony: "Balcony",
      terrace: "Terrace",
      view: "View",
      living: "Living space",
      bedroom: "Sleeping area",
      kitchen: "Kitchen",
      bathroom: "Bathroom",
      parking: "Parking",
      location: "Location",
      exterior: "Building",
      detail: "Detail",
    },
  },
  fr: {
    title: "Galerie photos",
    intro: "Les premieres photos montrent le principal atout de l'appartement, puis l'espace de vie, les equipements pratiques et l'environnement.",
    viewAll: "Voir toutes les photos",
    morePhotos: "photos en plus",
    openMore: "Ouvrir la galerie complete",
    close: "Fermer",
    previous: "Precedente",
    next: "Suivante",
    photo: "Photo",
    of: "sur",
    categoryLabels: {
      balcony: "Balcon",
      terrace: "Terrasse",
      view: "Vue",
      living: "Espace de vie",
      bedroom: "Coin nuit",
      kitchen: "Cuisine",
      bathroom: "Salle de bain",
      parking: "Parking",
      location: "Emplacement",
      exterior: "Immeuble",
      detail: "Detail",
    },
  },
  it: {
    title: "Galleria fotografica",
    intro: "Le prime foto mostrano il motivo principale per scegliere l'appartamento, poi gli spazi interni, i servizi pratici e la posizione.",
    viewAll: "Vedi tutte le foto",
    morePhotos: "foto in piu",
    openMore: "Apri la galleria completa",
    close: "Chiudi",
    previous: "Precedente",
    next: "Successiva",
    photo: "Foto",
    of: "di",
    categoryLabels: {
      balcony: "Balcone",
      terrace: "Terrazza",
      view: "Vista",
      living: "Zona giorno",
      bedroom: "Zona notte",
      kitchen: "Cucina",
      bathroom: "Bagno",
      parking: "Parcheggio",
      location: "Posizione",
      exterior: "Edificio",
      detail: "Dettaglio",
    },
  },
  uk: {
    title: "Фотогалерея",
    intro: "Перші фото показують головну перевагу апартаментів, далі - житловий простір, практичні зручності та локацію.",
    viewAll: "Переглянути всі фото",
    morePhotos: "ще фото",
    openMore: "Відкрити повну галерею",
    close: "Закрити",
    previous: "Попереднє",
    next: "Наступне",
    photo: "Фото",
    of: "з",
    categoryLabels: {
      balcony: "Балкон",
      terrace: "Тераса",
      view: "Вид",
      living: "Житлова зона",
      bedroom: "Спальна зона",
      kitchen: "Кухня",
      bathroom: "Ванна кімната",
      parking: "Паркування",
      location: "Локація",
      exterior: "Будівля",
      detail: "Деталь",
    },
  },
};

const previewOrder: Record<string, string[]> = {
  "sea-view-balcony-studio": [
    "01-balcony-breakfast-sea-view.jpg",
    "02-living-room-balcony-view.jpg",
    "03-open-plan-studio-layout.png",
    "04-bedroom-balcony-view.png",
    "11-balcony-sea-view.jpg",
  ],
  "beachside-family-apartment": [
    "01-private-terrace-breakfast.jpg",
    "02-living-room-terrace-access.jpg",
    "03-comfortable-bedroom.png",
    "04-dining-area-equipped-kitchen.jpg",
    "05-living-room-sofa-bed.jpg",
  ],
  "panoramic-sea-view-studio": [
    "01-balcony-breakfast-sea-view.jpg",
    "02-balcony-harbour-view.jpg",
    "03-balcony-seafront-view.jpg",
    "06-bright-studio-double-bed.png",
    "16-living-room-sea-view.jpg",
  ],
};

function imageStem(fileName: string) {
  return fileName.replace(/\.(png|jpe?g|webp)$/i, "");
}

function findImageByFile(apartment: Apartment, fileName: string, selected = new Set<string>()) {
  const stem = imageStem(fileName);

  return apartment.gallery.find((image) => imageStem(image.src).endsWith(stem) && !selected.has(image.src));
}

export function ApartmentGallery({ apartment, locale }: ApartmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = galleryCopy[locale];
  const previewImages = useMemo(() => {
    const preferred = previewOrder[apartment.slug];

    if (!preferred) {
      return apartment.gallery.slice(0, 5);
    }

    const selected = new Set<string>();
    const images = preferred.flatMap((fileName) => {
      const image = findImageByFile(apartment, fileName, selected);
      if (!image) return [];
      selected.add(image.src);
      return [image];
    });

    return images.length >= 4 ? images : apartment.gallery.slice(0, 5);
  }, [apartment]);
  const composedPreviewImages = previewImages.slice(0, 4);
  const moreImage = previewImages[4] ?? apartment.gallery.find((image) => !composedPreviewImages.some((preview) => preview.src === image.src)) ?? composedPreviewImages[0];
  const moreStartIndex = moreImage ? apartment.gallery.findIndex((image) => image.src === moreImage.src) : 0;
  const moreCount = Math.max(apartment.gallery.length - composedPreviewImages.length, 0);
  const activeImage = activeIndex === null ? null : apartment.gallery[activeIndex];
  const visibleIndex = activeIndex ?? 0;

  function captionFor(image: Apartment["gallery"][number], index?: number) {
    const localized = image.caption[locale];

    if (locale === "en" || localized !== image.caption.en) {
      return localized;
    }

    return `${copy.categoryLabels[image.category]}${index === undefined ? "" : ` ${index + 1}`}`;
  }

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % apartment.gallery.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + apartment.gallery.length) % apartment.gallery.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, apartment.gallery.length]);

  function openGallery(index: number) {
    setActiveIndex(index);
  }

  function showPrevious() {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + apartment.gallery.length) % apartment.gallery.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % apartment.gallery.length,
    );
  }

  return (
    <section aria-labelledby="photo-gallery">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 id="photo-gallery" className="serif-heading text-4xl text-[#173f36] sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#5c5044]">
            {copy.intro}
          </p>
        </div>
        <button
          type="button"
          onClick={() => openGallery(0)}
          className="inline-flex min-h-11 items-center justify-center border border-[#c6a66a] bg-transparent px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#173f36] transition hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a66a]"
        >
          {copy.viewAll}
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-[1.25fr_0.72fr_0.72fr] lg:grid-rows-2">
        {composedPreviewImages.map((image, index) => {
          const galleryIndex = apartment.gallery.findIndex((galleryImage) => galleryImage.src === image.src);
          const safeGalleryIndex = galleryIndex >= 0 ? galleryIndex : index;

          return (
            <figure
              key={image.src}
              className={
                index === 0
                  ? "overflow-hidden border border-[#dfd4c1] bg-white md:col-span-2 lg:col-span-1 lg:row-span-2"
                  : "overflow-hidden border border-[#dfd4c1] bg-white"
              }
            >
              <button
                type="button"
                onClick={() => openGallery(safeGalleryIndex)}
                className="group block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f]"
                aria-label={`${copy.viewAll}: ${captionFor(image, safeGalleryIndex)}`}
              >
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt[locale]}
                    width={1200}
                    height={850}
                    quality={90}
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 46vw, 100vw"
                        : "(min-width: 1024px) 22vw, (min-width: 768px) 50vw, 100vw"
                    }
                    className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.025] ${
                      index === 0 ? "aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"
                    } ${imageObjectPosition(apartment, image)}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10262d]/72 via-[#10262d]/28 to-transparent p-3 text-white">
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#f0d49c]">
                      {copy.categoryLabels[image.category]}
                    </p>
                    <figcaption className="mt-1 line-clamp-2 text-sm leading-5">
                      {captionFor(image, safeGalleryIndex)}
                    </figcaption>
                  </div>
                </div>
              </button>
            </figure>
          );
        })}
        {moreImage ? (
          <figure className="overflow-hidden border border-[#dfd4c1] bg-white">
            <button
              type="button"
              onClick={() => openGallery(moreStartIndex >= 0 ? moreStartIndex : 0)}
              className="group block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f]"
              aria-label={`${copy.openMore}: +${moreCount} ${copy.morePhotos}`}
            >
              <div className="relative h-full overflow-hidden">
                <Image
                  src={moreImage.src}
                  alt={moreImage.alt[locale]}
                  width={1000}
                  height={760}
                  quality={90}
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 50vw, 100vw"
                  className={`aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-[1.025] ${imageObjectPosition(apartment, moreImage)}`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#10262d]/64 px-4 text-center text-white transition group-hover:bg-[#10262d]/58">
                  <span className="font-serif-display text-5xl leading-none">+{moreCount}</span>
                  <span className="mt-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#f0d49c]">
                    {copy.morePhotos}
                  </span>
                </div>
              </div>
              <figcaption className="px-4 py-3 text-sm leading-6 text-[#5c5044]">
                {copy.openMore} · +{moreCount} {copy.morePhotos}
              </figcaption>
            </button>
          </figure>
        ) : null}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#10262d]/95 p-4 text-white sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${apartment.shortName[locale]} photo gallery`}
        >
          <div className="mx-auto flex min-h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-4 py-2">
              <p className="text-sm font-semibold text-white/80">
                {copy.photo} {visibleIndex + 1} {copy.of} {apartment.gallery.length}
              </p>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="inline-flex min-h-11 items-center justify-center bg-white px-4 py-2 text-sm font-semibold text-[#17313a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={copy.close}
                autoFocus
              >
                {copy.close}
              </button>
            </div>

            <div className="grid flex-1 items-center gap-4 py-4 md:grid-cols-[auto_1fr_auto]">
              <button
                type="button"
                onClick={showPrevious}
                className="min-h-11 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={copy.previous}
              >
                {copy.previous}
              </button>
              <figure className="min-w-0 overflow-hidden rounded-lg bg-black/20">
                <div className="relative mx-auto max-h-[72vh]">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt[locale]}
                    width={1600}
                    height={1100}
                    quality={90}
                    sizes="100vw"
                    className={`mx-auto max-h-[72vh] w-auto max-w-full object-contain ${imageObjectPosition(
                      apartment,
                      activeImage,
                    )}`}
                    priority={activeImage.priority}
                  />
                </div>
                <figcaption className="bg-black/25 px-4 py-3 text-sm leading-6 text-white/85">
                  {captionFor(activeImage, visibleIndex)}
                </figcaption>
              </figure>
              <button
                type="button"
                onClick={showNext}
                className="min-h-11 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={copy.next}
              >
                {copy.next}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
