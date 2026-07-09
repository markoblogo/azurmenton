"use client";
import { useRef, useState } from "react";

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
  play: string;
  pause: string;
  loading: string;
  website: string;
  listenOnline: string;
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
    play: "Play",
    pause: "Pause",
    loading: "Connecting",
    website: "Website",
    listenOnline: "Listen online",
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
    play: "Écouter",
    pause: "Pause",
    loading: "Connexion",
    website: "Site web",
    listenOnline: "Écouter en ligne",
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
    play: "Ascolta",
    pause: "Pausa",
    loading: "Connessione",
    website: "Sito web",
    listenOnline: "Ascolta online",
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
    play: "Слухати",
    pause: "Пауза",
    loading: "Підключення",
    website: "Сайт",
    listenOnline: "Слухати онлайн",
    noStations: "Поки що немає деталей по станціях.",
    streamUnavailable: "Потік зараз недоступний. Перейдіть на сайт станції.",
  },
};

const isKnownDirectStream = (url: string) => {
  const lower = url.toLowerCase();

  if (lower.includes(".m3u8")) {
    return false;
  }

  if (lower.includes(".mp3") || lower.includes(".aac") || lower.includes(".m4a")) {
    return true;
  }

  if (lower.includes("audio.bfmtv.com") || lower.includes("icecast") || lower.includes("rivieraradio.ice.infomaniak.ch") || lower.includes("sc.creacast.com") || lower.includes("rfm.lmn.fm") || lower.includes("mfm.ice.infomaniak.ch")) {
    return true;
  }

  return false;
};

type PlayerState = "idle" | "loading" | "playing" | "error";

function RadioPlayer({
  streamUrl,
  copy,
  websiteUrl,
}: {
  streamUrl: string;
  copy: Pick<LocalizedCopy, "play" | "pause" | "loading" | "listenOnline" | "streamUnavailable">;
  websiteUrl?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<PlayerState>("idle");

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state === "playing") {
      audio.pause();
      setState("idle");
      return;
    }

    try {
      setState("loading");
      audio.load();
      await audio.play();
      setState("playing");
    } catch {
      setState("error");
    }
  };

  if (!isKnownDirectStream(streamUrl)) {
    if (!websiteUrl) return null;
    return (
      <a
        className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]"
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {copy.listenOnline}
      </a>
    );
  }

  if (state === "error") {
    if (!websiteUrl) {
      return <p className="w-full text-xs italic text-[#71665b]">{copy.streamUnavailable}</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        <p className="w-full text-xs italic text-[#71665b]">{copy.streamUnavailable}</p>
        <a
          className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]"
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.listenOnline}
        </a>
      </div>
    );
  }

  const buttonLabel = state === "loading" ? copy.loading : state === "playing" ? copy.pause : copy.play;

  return (
    <div className="mt-1 flex flex-wrap gap-2">
      <audio
        ref={audioRef}
        className="sr-only"
        preload="none"
        crossOrigin="anonymous"
        src={streamUrl}
        onError={() => setState("error")}
        onPause={() => setState("idle")}
      />
      <button
        type="button"
        className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]"
        onClick={handleTogglePlay}
      >
        {buttonLabel}
      </button>
      {state === "loading" ? <span className="text-xs text-[#71665b]">{copy.loading}…</span> : null}
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
          const streamUrl = station.audioStreamUrl ?? "";

          return (
            <div key={station.id} className="border border-[#e6d9c6] bg-white/65 p-3 sm:p-4">
              {station.image ? (
                <div className="relative mt-2 h-64 w-full overflow-hidden border border-[#e6d9c6] bg-[#f7f2ea] sm:h-72">
                  <Image
                    src={station.image}
                    alt={`${stationName} logo`}
                    fill
                    sizes="(min-width: 1024px) 420px, 92vw"
                    className="object-cover object-center"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="relative mt-2 h-64 w-full overflow-hidden border border-[#e6d9c6] bg-[#f7f2ea] sm:h-72">
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
                {streamUrl ? (
                  <RadioPlayer streamUrl={streamUrl} copy={copy} websiteUrl={station.websiteUrl} />
                ) : station.websiteUrl ? (
                  <a
                    className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]"
                    href={station.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.listenOnline}
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
