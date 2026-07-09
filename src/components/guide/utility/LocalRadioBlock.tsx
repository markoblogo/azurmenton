"use client";
import { useState } from "react";

import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import type { GuideUtilityBlock } from "@/content/guide";
import { getRadioStationsForTenant, getRadioStationLabel } from "@/content/utility/radio";

type LocalizedCopy = {
  title: string;
  description: string;
  station: string;
  languages: string;
  contentTypes: string;
  musicStyles: string;
  usefulFor: string;
  website: string;
  noStations: string;
  streamUnavailable: string;
};

const labels = {
  en: {
    title: "Local radio",
    description: "Useful local radio sources in your area.",
    station: "Station",
    languages: "Languages",
    contentTypes: "Content",
    musicStyles: "Music",
    usefulFor: "Useful for",
    website: "Website",
    noStations: "No station details available yet.",
    streamUnavailable: "Stream currently unavailable. Use station website.",
  },
  fr: {
    title: "Radio locale",
    description: "Sélections de radios locales utiles sur le secteur.",
    station: "Radio",
    languages: "Langues",
    contentTypes: "Rubriques",
    musicStyles: "Styles musicaux",
    usefulFor: "Utile pour",
    website: "Site web",
    noStations: "Aucune station enregistrée pour le moment.",
    streamUnavailable: "Le flux n'est pas disponible pour le moment. Ouvrez le site de la station.",
  },
  it: {
    title: "Radio locali",
    description: "Selezione di radio locali utili per la zona.",
    station: "Stazione",
    contentTypes: "Contenuti",
    musicStyles: "Stili musicali",
    usefulFor: "Utile per",
    languages: "Lingue",
    website: "Sito web",
    noStations: "Nessuna radio disponibile al momento.",
    streamUnavailable: "Streaming non disponibile al momento. Apri il sito della stazione.",
  },
  uk: {
    title: "Локальне радіо",
    description: "Добірка корисних локальних станцій.",
    station: "Станція",
    languages: "Мови",
    contentTypes: "Формат",
    musicStyles: "Музика",
    usefulFor: "Корисно для",
    website: "Сайт",
    noStations: "Поки що немає деталей по станціях.",
    streamUnavailable: "Потік зараз недоступний. Перейдіть на сайт станції.",
  },
};

const getStreamMimeType = (url: string) => {
  const lower = url.toLowerCase();
  if (lower.includes(".m3u8")) return "application/vnd.apple.mpegurl";
  if (lower.includes(".aac")) return "audio/aac";
  if (lower.includes(".mp3")) return "audio/mpeg";
  return "audio/mpeg";
};

export function LocalRadioBlock({ block, locale }: { block: GuideUtilityBlock; locale: Locale }) {
  const copy = labels[locale] as LocalizedCopy;
  const stations = getRadioStationsForTenant(block.region, block.stationIds);
  const [failedStreams, setFailedStreams] = useState<Set<string>>(new Set());

  const handleStreamError = (stationId: string) => {
    setFailedStreams((prev) => {
      if (prev.has(stationId)) return prev;
      const next = new Set(prev);
      next.add(stationId);
      return next;
    });
  };

  const unsupportedStreams = (() => {
    if (typeof window === "undefined") return new Set<string>();
    const blocked = new Set<string>();
    const probe = document.createElement("audio");
    stations.forEach((station) => {
      if (!station.audioStreamUrl) return;
      const mime = getStreamMimeType(station.audioStreamUrl);
      if (!probe.canPlayType(mime)) {
        blocked.add(station.id);
      }
    });
    return blocked;
  })();

  if (!stations.length) {
    return (
      <article className="border border-[#dfd2b8] bg-[#fffaf0] p-4 sm:p-5">
        <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{block.title ?? copy.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#5c5044]">{block.description ?? copy.description}</p>
        <p className="mt-3 text-sm text-[#71665b]">{copy.noStations}</p>
      </article>
    );
  }

  return (
    <article className="border border-[#dfd2b8] bg-[#fffaf0] p-4 sm:p-5">
      <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{block.title ?? copy.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#5c5044]">{block.description ?? copy.description}</p>
      <div className="mt-4 grid gap-3">
        {stations.map((station) => {
          const notes = station.notes?.[locale] ?? station.notes?.en;
          const stationName = getRadioStationLabel(station, locale);
          const streamUrl = station.audioStreamUrl ?? "";
          const hasStream = Boolean(station.audioStreamUrl);

          return (
            <div key={station.id} className="border border-[#e6d9c6] bg-white/65 p-3 sm:p-4">
              {station.image ? (
                <div className="relative mt-2 h-56 w-full overflow-hidden border border-[#e6d9c6] bg-[#f7f2ea] sm:h-60">
                  <Image
                    src={station.image}
                    alt={`${stationName} logo`}
                    fill
                    sizes="(min-width: 1024px) 420px, 92vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="relative mt-2 h-56 w-full overflow-hidden border border-[#e6d9c6] bg-[#f7f2ea] sm:h-60">
                  <div className="flex h-full items-center justify-center px-4 text-center text-xs leading-6 text-[#71665b]">{stationName}</div>
                </div>
              )}
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#b49353]">{copy.station}</p>
              <h4 className="mt-1 text-lg font-semibold text-[#173f36]">{stationName}</h4>
              {station.fmFrequency ? <p className="mt-1 text-sm text-[#5c5044]">{station.fmFrequency}</p> : null}
              <p className="mt-3 text-sm leading-6 text-[#5c5044]">{station.shortLabel?.[locale] ?? station.shortLabel?.en}</p>
              {notes ? <p className="mt-2 text-xs leading-5 text-[#71665b]">{notes}</p> : null}
              <div className="mt-3 grid gap-2 text-xs text-[#5c5044] sm:grid-cols-2">
                {station.languages?.length ? <p><span className="font-semibold text-[#173f36]">{copy.languages}:</span> {station.languages.join(", ")}</p> : null}
                {station.contentTypes?.length ? <p><span className="font-semibold text-[#173f36]">{copy.contentTypes}:</span> {station.contentTypes.join(", ")}</p> : null}
                {station.musicStyles?.length ? <p><span className="font-semibold text-[#173f36]">{copy.musicStyles}:</span> {station.musicStyles.join(", ")}</p> : null}
                {station.usefulFor?.length ? <p><span className="font-semibold text-[#173f36]">{copy.usefulFor}:</span> {station.usefulFor.join(", ")}</p> : null}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {hasStream && !failedStreams.has(station.id) && !unsupportedStreams.has(station.id) ? (
                  <audio
                    controls
                    className="w-full max-w-sm"
                    preload="none"
                    onError={() => handleStreamError(station.id)}
                  >
                    <source src={streamUrl} type={getStreamMimeType(streamUrl)} />
                  </audio>
                ) : null}

                {(!hasStream || failedStreams.has(station.id) || unsupportedStreams.has(station.id)) && station.websiteUrl ? (
                  <a
                    className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]"
                    href={station.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.website}
                  </a>
                ) : null}

                {(failedStreams.has(station.id) || unsupportedStreams.has(station.id)) ? (
                  <p className="w-full text-xs italic text-[#71665b]">{copy.streamUnavailable}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
