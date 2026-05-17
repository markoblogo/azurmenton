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
    "01-balcony-breakfast-sea-view.png",
    "02-living-room-balcony-view.png",
    "03-open-plan-studio-layout.png",
    "04-bedroom-balcony-view.png",
    "11-balcony-sea-view.png",
  ],
  "beachside-family-apartment": [
    "01-private-terrace-breakfast.png",
    "02-living-room-terrace-access.png",
    "03-comfortable-bedroom.png",
    "04-dining-area-equipped-kitchen.png",
    "05-living-room-sofa-bed.png",
  ],
  "panoramic-sea-view-studio": [
    "01-balcony-breakfast-sea-view.png",
    "02-wide-sea-view-from-balcony.png",
    "03-bright-studio-double-bed.png",
    "04-equipped-kitchenette.png",
    "05-private-bathroom-sink.png",
  ],
};

export function ApartmentGallery({ apartment, locale }: ApartmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = galleryCopy[locale];
  const previewImages = useMemo(() => {
    const preferred = previewOrder[apartment.slug];

    if (!preferred) {
      return apartment.gallery.slice(0, 5);
    }

    const images = preferred
      .map((fileName) => apartment.gallery.find((image) => image.src.endsWith(fileName)))
      .filter((image): image is Apartment["gallery"][number] => Boolean(image));

    return images.length > 0 ? images : apartment.gallery.slice(0, 5);
  }, [apartment.gallery, apartment.slug]);
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
    <section aria-labelledby="photo-gallery" className="mt-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 id="photo-gallery" className="serif-heading text-4xl text-[#173f36]">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c5044]">
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

      <div className="mt-7 grid gap-4 md:grid-cols-4 md:grid-rows-2">
        {previewImages.map((image, index) => {
          const galleryIndex = apartment.gallery.findIndex((galleryImage) => galleryImage.src === image.src);
          const safeGalleryIndex = galleryIndex >= 0 ? galleryIndex : index;
          const remainingPhotos = apartment.gallery.length - previewImages.length;
          const showMoreOverlay = index === previewImages.length - 1 && remainingPhotos > 0;

          return (
          <figure
            key={image.src}
            className={
              index === 0
                ? "overflow-hidden border border-[#dfd4c1] bg-white md:col-span-2 md:row-span-2"
                : "overflow-hidden border border-[#dfd4c1] bg-white"
            }
          >
            <button
              type="button"
              onClick={() => openGallery(showMoreOverlay ? previewImages.length : safeGalleryIndex)}
              className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f]"
              aria-label={`${showMoreOverlay ? copy.openMore : copy.viewAll}: ${captionFor(image, safeGalleryIndex)}`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt[locale]}
                  width={1200}
                  height={850}
                  quality={90}
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 520px, 100vw"
                      : "(min-width: 1024px) 260px, (min-width: 768px) 33vw, 100vw"
                  }
                  className={`w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
                    index === 0 ? "aspect-[4/3]" : "aspect-[4/3]"
                  } ${imageObjectPosition(apartment, image)}`}
                />
                {showMoreOverlay ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#10262d]/62 text-center text-white">
                    <span className="font-serif-display text-4xl font-semibold">
                      +{remainingPhotos}
                    </span>
                    <span className="sr-only">{copy.morePhotos}</span>
                  </div>
                ) : null}
              </div>
              <figcaption className="px-4 py-3 text-sm leading-6 text-[#5c5044]">
                {showMoreOverlay ? `${copy.openMore} · +${remainingPhotos} ${copy.morePhotos}` : captionFor(image, safeGalleryIndex)}
              </figcaption>
            </button>
          </figure>
          );
        })}
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
