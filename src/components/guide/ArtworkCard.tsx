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
  medium?: string;
  artistNote?: string;
  presentation?: "folio" | "pair";
  rightsNote: string;
  locationNote: string;
};

export function ArtworkCard({ artwork, sourceLabel, locale }: { artwork: GuideArtworkCardViewModel; sourceLabel: string; locale: Locale }) {
  const alt = artwork.imageAlt ?? artwork.workTitle;
  const preservesOriginalSheet = Boolean(artwork.presentation);
  const cardLayout = artwork.presentation === "folio" ? "md:col-span-2 md:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]" : "md:grid-cols-[0.42fr_1fr]";

  return (
    <div className={`overflow-hidden border border-[#dfd2b8] bg-[#f8f3ea] md:grid ${cardLayout}`}>
      {artwork.image ? (
        <div className={`relative aspect-[4/3] bg-[#173f36]/10 ${artwork.presentation === "folio" ? "md:aspect-[4/3]" : "md:aspect-auto"}`}>
          <Image src={artwork.image} alt={alt} fill sizes={artwork.presentation === "folio" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 320px, 100vw"} className={preservesOriginalSheet ? "object-contain" : "object-cover"} />
          <ImageLightboxButton src={artwork.image} alt={alt} locale={locale} />
        </div>
      ) : null}
      <div className="p-4">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">
          {artwork.artist} · {artwork.year}
        </p>
        <h3 className="mt-2 serif-heading text-2xl leading-tight text-[#173f36]">{artwork.workTitle}</h3>
        {artwork.medium ? <p className="mt-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#71665b]">{artwork.medium}</p> : null}
        <p className="mt-3 text-sm leading-6 text-[#5c5044]">{artwork.locationNote}</p>
        {artwork.artistNote ? <p className="mt-3 text-sm leading-6 text-[#5c5044]">{artwork.artistNote}</p> : null}
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
