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

export function ApartmentGallery({ apartment, locale }: ApartmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previewImages = useMemo(() => apartment.gallery.slice(0, 5), [apartment.gallery]);
  const activeImage = activeIndex === null ? null : apartment.gallery[activeIndex];
  const visibleIndex = activeIndex ?? 0;

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
    <section aria-labelledby="photo-gallery" className="mt-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 id="photo-gallery" className="text-2xl font-semibold text-[#17313a]">
            Photo gallery
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5c5044]">
            Photos are shown in the same order as the apartment story: main view, living space,
            practical amenities, then location details.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openGallery(0)}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#d9cdbd] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#17313a] transition hover:border-[#0b6f8f] hover:text-[#0b6f8f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f]"
        >
          View all photos
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4 md:grid-rows-2">
        {previewImages.map((image, index) => (
          <figure
            key={image.src}
            className={
              index === 0
                ? "overflow-hidden rounded-lg border border-[#e4d8c7] bg-white md:col-span-2 md:row-span-2"
                : "overflow-hidden rounded-lg border border-[#e4d8c7] bg-white"
            }
          >
            <button
              type="button"
              onClick={() => openGallery(index)}
              className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f]"
              aria-label={`Open photo ${index + 1} of ${apartment.gallery.length}: ${image.caption[locale]}`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt[locale]}
                  width={1200}
                  height={850}
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                  }
                  className={`w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
                    index === 0 ? "aspect-[4/3]" : "aspect-[4/3] md:aspect-[4/3]"
                  } ${imageObjectPosition(apartment, image)}`}
                />
              </div>
              <figcaption className="px-4 py-3 text-sm leading-6 text-[#5c5044]">
                {image.caption[locale]}
              </figcaption>
            </button>
          </figure>
        ))}
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
                Photo {visibleIndex + 1} of {apartment.gallery.length}
              </p>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#17313a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Close photo gallery"
                autoFocus
              >
                Close
              </button>
            </div>

            <div className="grid flex-1 items-center gap-4 py-4 md:grid-cols-[auto_1fr_auto]">
              <button
                type="button"
                onClick={showPrevious}
                className="min-h-11 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Show previous photo"
              >
                Previous
              </button>
              <figure className="min-w-0 overflow-hidden rounded-lg bg-black/20">
                <div className="relative mx-auto max-h-[72vh]">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt[locale]}
                    width={1600}
                    height={1100}
                    sizes="100vw"
                    className={`mx-auto max-h-[72vh] w-auto max-w-full object-contain ${imageObjectPosition(
                      apartment,
                      activeImage,
                    )}`}
                    priority={activeImage.priority}
                  />
                </div>
                <figcaption className="bg-black/25 px-4 py-3 text-sm leading-6 text-white/85">
                  {activeImage.caption[locale]}
                </figcaption>
              </figure>
              <button
                type="button"
                onClick={showNext}
                className="min-h-11 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Show next photo"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
