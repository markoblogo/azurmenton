"use client";

import { useEffect, useRef, useState } from "react";

import Hls from "hls.js";
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
  loading: string;
  streamUnavailable: string;
  noStations: string;
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
    loading: "Loading",
    streamUnavailable: "This stream is unavailable right now.",
    noStations: "No station details available yet.",
  },
  fr: {
    title: "Radio locale",
    description: "Sélections de radios locales utiles sur le secteur.",
    station: "Radio",
    languages: "Langues",
    contentTypes: "Rubriques",
    musicStyles: "Styles musicaux",
    usefulFor: "Utile pour",
    loading: "Chargement",
    streamUnavailable: "Ce flux est indisponible pour le moment.",
    noStations: "Aucune station enregistrée pour le moment.",
  },
  it: {
    title: "Radio locali",
    description: "Selezione di radio locali utili per la zona.",
    station: "Stazione",
    contentTypes: "Contenuti",
    musicStyles: "Stili musicali",
    usefulFor: "Utile per",
    languages: "Lingue",
    loading: "Caricamento",
    streamUnavailable: "Questo flusso non è disponibile al momento.",
    noStations: "Nessuna radio disponibile al momento.",
  },
  uk: {
    title: "Локальне радіо",
    description: "Добірка корисних локальних станцій.",
    station: "Станція",
    languages: "Мови",
    contentTypes: "Формат",
    musicStyles: "Музика",
    usefulFor: "Корисно для",
    loading: "Завантаження",
    streamUnavailable: "Цей потік зараз недоступний.",
    noStations: "Поки що немає деталей по станціях.",
  },
};

type PlayerState = "idle" | "loading" | "error";

type RadioStreamCopy = Pick<LocalizedCopy, "loading" | "streamUnavailable">;

function RadioStream({
  streamUrl,
  copy,
}: {
  streamUrl: string;
  copy: RadioStreamCopy;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<PlayerState>("idle");
  const isHlsStream = streamUrl.toLowerCase().includes(".m3u8");
  const canPlayNativeHls =
    typeof window !== "undefined"
      ? (() => {
          const probe = document.createElement("audio");
          const support = probe.canPlayType("application/vnd.apple.mpegurl");
          return support === "probably" || support === "maybe";
        })()
      : false;
  const hasHlsLibrary = Hls.isSupported();
  const hasPlayableHls = isHlsStream ? canPlayNativeHls || hasHlsLibrary : true;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    let hls: Hls | null = null;

    const handleError = () => setState("error");
    const handleLoadStart = () => setState("loading");
    const handleCanPlay = () => setState("idle");

    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    if (isHlsStream) {
      if (canPlayNativeHls) {
        audio.src = streamUrl;
        audio.load();
      } else if (hasHlsLibrary) {
        hls = new Hls({});
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) setState("error");
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(audio);
      }
    } else {
      audio.src = streamUrl;
      audio.load();
    }

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);

      if (hls) {
        hls.destroy();
        hls = null;
      }
    };
  }, [canPlayNativeHls, hasHlsLibrary, isHlsStream, streamUrl]);

  return (
    <div className="mt-2">
      <audio
        ref={audioRef}
        controls
        preload="none"
        className="h-9 w-full"
      >
        {!isHlsStream || canPlayNativeHls ? <source src={streamUrl} type={isHlsStream ? "application/vnd.apple.mpegurl" : undefined} /> : null}
      </audio>
      {state === "loading" ? <p className="mt-2 text-[11px] text-[#71665b]">{copy.loading}</p> : null}
      {state === "error" || !hasPlayableHls ? <p className="mt-2 text-[11px] text-[#71665b]">{copy.streamUnavailable}</p> : null}
    </div>
  );
}

export function LocalRadioBlock({ block, locale }: { block: GuideUtilityBlock; locale: Locale }) {
  const copy = labels[locale] as LocalizedCopy;
  const stations = getRadioStationsForTenant(block.region, block.stationIds);

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
          const streamUrl = station.audioStreamUrl?.trim() ?? "";
          const stationImage = station.image ?? "";
          const hasImage = stationImage.length > 0;
          const hasStream = Boolean(streamUrl);

          return (
            <div key={station.id} className="border border-[#e6d9c6] bg-white/65 p-3 sm:p-4">
              <div className="relative mt-2 h-64 w-full overflow-hidden border border-[#e6d9c6] bg-[#f7f2ea] sm:h-72">
                {hasImage ? (
                  <Image
                    src={stationImage}
                    alt={`${stationName} logo`}
                    fill
                    sizes="(min-width: 1024px) 420px, 92vw"
                    className="next-fill-cover h-full w-full"
                    quality={90}
                    priority={false}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-4 text-center text-xs leading-6 text-[#71665b]">{stationName}</div>
                )}
              </div>

              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#b49353]">{copy.station}</p>
              <h4 className="mt-1 text-lg font-semibold text-[#173f36]">{stationName}</h4>
              {station.fmFrequency ? <p className="mt-1 text-sm text-[#5c5044]">{station.fmFrequency}</p> : null}
              <p className="mt-3 text-sm leading-6 text-[#5c5044]">{station.shortLabel?.[locale] ?? station.shortLabel?.en}</p>
              {notes ? <p className="mt-2 text-xs leading-5 text-[#71665b]">{notes}</p> : null}

              <div className="mt-3 grid gap-2 text-xs text-[#5c5044] sm:grid-cols-2">
                {station.languages?.length ? (
                  <p>
                    <span className="font-semibold text-[#173f36]">{copy.languages}:</span> {station.languages.join(", ")}
                  </p>
                ) : null}
                {station.contentTypes?.length ? (
                  <p>
                    <span className="font-semibold text-[#173f36]">{copy.contentTypes}:</span> {station.contentTypes.join(", ")}
                  </p>
                ) : null}
                {station.musicStyles?.length ? (
                  <p>
                    <span className="font-semibold text-[#173f36]">{copy.musicStyles}:</span> {station.musicStyles.join(", ")}
                  </p>
                ) : null}
                {station.usefulFor?.length ? (
                  <p>
                    <span className="font-semibold text-[#173f36]">{copy.usefulFor}:</span> {station.usefulFor.join(", ")}
                  </p>
                ) : null}
              </div>

              <div className="mt-4">
                {hasStream ? <RadioStream streamUrl={streamUrl} copy={copy} /> : null}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
