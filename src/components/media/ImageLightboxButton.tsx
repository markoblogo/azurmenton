"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/i18n/locales";

type ImageLightboxButtonProps = {
  src: string;
  alt: string;
  locale?: Locale;
};

const copy: Record<Locale, { open: string; close: string }> = {
  en: { open: "View image", close: "Close" },
  fr: { open: "Voir l'image", close: "Fermer" },
  it: { open: "Vedi immagine", close: "Chiudi" },
  uk: { open: "Переглянути зображення", close: "Закрити" },
};

export function ImageLightboxButton({ src, alt, locale = "en" }: ImageLightboxButtonProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const label = copy[locale].open;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center border border-white/70 bg-[#173f36]/82 text-white opacity-100 shadow-[0_8px_22px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-[#173f36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="5.5" />
          <path d="m15 15 5 5M10.5 8v5M8 10.5h5" />
        </svg>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#071714]/94 p-4 text-white"
          onClick={() => setOpen(false)}
        >
          <div className="relative grid max-h-full w-full max-w-6xl gap-3" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4">
              <p id={titleId} className="text-sm font-semibold leading-6 text-white/82">{alt}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-10 items-center border border-white/35 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f8f3ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {copy[locale].close}
              </button>
            </div>
            <div className="relative h-[82vh] w-full max-w-full shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
              <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
