import Image from "next/image";
import { getEventTitle, type RivieraEvent } from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";

type EventImageProps = {
  event: RivieraEvent;
  locale: Locale;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const projectIllustrationAlt: Record<Locale, (title: string) => string> = {
  en: (title) => `Project illustration for ${title}`,
  fr: (title) => `Illustration de projet pour ${title}`,
  it: (title) => `Illustrazione di progetto per ${title}`,
  uk: (title) => `Проєктна ілюстрація для ${title}`,
};

export function EventImage({
  event,
  locale,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(min-width: 1024px) 38vw, 92vw",
}: EventImageProps) {
  const image = event.media?.mediaStatus === "available" ? event.media.image : undefined;
  const title = getEventTitle(event, locale);
  const alt =
    event.media?.mediaType === "project_illustration"
      ? projectIllustrationAlt[locale](title)
      : event.media?.imageAlt?.[locale] ?? projectIllustrationAlt[locale](title);

  return (
    <figure className={`relative overflow-hidden border border-[#dfd4c1] bg-[#efe6d8] ${className}`}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          preload={priority}
          quality={90}
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(217,182,107,0.44),transparent_32%),linear-gradient(135deg,#f8efe1,#dbe9e5_54%,#173f36)]" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/34 to-transparent" aria-hidden="true" />
      <figcaption className="absolute bottom-4 left-4 right-4 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white drop-shadow">
        {event.location}
      </figcaption>
    </figure>
  );
}
