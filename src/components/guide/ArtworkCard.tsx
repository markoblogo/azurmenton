"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ImageLightboxButton } from "@/components/media/ImageLightboxButton";
import type { Locale } from "@/i18n/locales";

export type GuideArtworkCardViewModel = {
  id: string;
  artist: string;
  workTitle: string;
  year: string;
  image?: string;
  imageAlt?: string;
  sourceUrl?: string;
  rightsNote: string;
  locationNote: string;
};

export function ArtworkCard({ artwork, sourceLabel, locale }: { artwork: GuideArtworkCardViewModel; sourceLabel: string; locale: Locale }) {
  const alt = artwork.imageAlt ?? artwork.workTitle;

  return (
    <div className="overflow-hidden border border-[#dfd2b8] bg-[#f8f3ea] md:grid md:grid-cols-[0.42fr_1fr]">
      {artwork.image ? (
        <div className="relative aspect-[4/3] bg-[#173f36]/10 md:aspect-auto">
          <Image src={artwork.image} alt={alt} fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" />
          <ImageLightboxButton src={artwork.image} alt={alt} locale={locale} />
        </div>
      ) : null}
      <div className="p-4">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">
          {artwork.artist} · {artwork.year}
        </p>
        <h3 className="mt-2 serif-heading text-2xl leading-tight text-[#173f36]">{artwork.workTitle}</h3>
        <p className="mt-3 text-sm leading-6 text-[#5c5044]">{artwork.locationNote}</p>
        <p className="mt-3 text-xs italic leading-5 text-[#71665b]">{artwork.rightsNote}</p>
        {artwork.sourceUrl ? (
          <Link className="mt-3 inline-flex text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] underline-offset-4 hover:underline" href={artwork.sourceUrl as Route} target="_blank" rel="noopener noreferrer">
            {sourceLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
