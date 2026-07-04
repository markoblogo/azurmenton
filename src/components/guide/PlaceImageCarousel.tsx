"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageLightboxButton } from "@/components/media/ImageLightboxButton";
import type { Locale } from "@/i18n/locales";

function useRotatingIndex(length: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length < 2) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      setIndex((current) => (current + 1) % length);
      interval = window.setInterval(() => {
        setIndex((current) => (current + 1) % length);
      }, 4300);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [length]);

  return index;
}

export function PlaceImageCarousel({
  images,
  imageAlt,
  locale,
  label,
  className = "",
}: {
  images: string[];
  imageAlt: string;
  locale: Locale;
  label: string;
  className?: string;
}) {
  const activeIndex = useRotatingIndex(images.length);

  return (
    <div className={`relative overflow-hidden border-b border-[#dfd2b8] bg-[#f7efe1] ${className}`}>
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={index === activeIndex ? imageAlt : ""}
          aria-hidden={index === activeIndex ? undefined : true}
          fill
          loading="eager"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition duration-500 ease-out group-hover:scale-[1.035] ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          quality={90}
        />
      ))}
      <ImageLightboxButton src={images[activeIndex] ?? images[0]} alt={imageAlt} locale={locale} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#173f36]/45 via-transparent to-white/10" />
      <div className="relative flex h-full min-h-[9rem] flex-col justify-between p-4">
        <p className="w-fit bg-[#fffaf0]/90 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#173f36]">{label}</p>
        <div className="flex gap-1 self-end" aria-hidden="true">
          {images.map((src, index) => (
            <span key={src} className={`h-1.5 w-1.5 rounded-full bg-white transition-opacity ${index === activeIndex ? "opacity-95" : "opacity-45"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
