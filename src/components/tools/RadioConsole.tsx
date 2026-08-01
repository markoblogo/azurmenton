"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/i18n/locales";
import { getRadioStationsForTenant } from "@/content/utility/radio";

const copy = {
  en: { eyebrow: "Radio mode", title: "Local radio for the road", previous: "Previous station", next: "Next station", play: "Play", pause: "Pause", volume: "Volume", website: "Station website", unavailable: "No direct stream available", loading: "Connecting", station: "Station" },
  fr: { eyebrow: "Mode radio", title: "Les radios locales pour la route", previous: "Station précédente", next: "Station suivante", play: "Écouter", pause: "Pause", volume: "Volume", website: "Site de la station", unavailable: "Flux direct indisponible", loading: "Connexion", station: "Station" },
  it: { eyebrow: "Modalità radio", title: "Radio locali per il viaggio", previous: "Stazione precedente", next: "Stazione successiva", play: "Ascolta", pause: "Pausa", volume: "Volume", website: "Sito della radio", unavailable: "Flusso diretto non disponibile", loading: "Connessione", station: "Stazione" },
  uk: { eyebrow: "Радіорежим", title: "Локальне радіо в дорозі", previous: "Попередня станція", next: "Наступна станція", play: "Слухати", pause: "Пауза", volume: "Гучність", website: "Сайт станції", unavailable: "Прямий потік недоступний", loading: "З'єднання", station: "Станція" },
} as const;

type PlayerState = "ready" | "loading" | "error";

export function RadioConsole({ locale }: { locale: Locale }) {
  const stations = useMemo(() => getRadioStationsForTenant("menton").filter((station) => station.audioStreamUrl), []);
  const text = copy[locale];
  const audioRef = useRef<HTMLAudioElement>(null);
  const resumeRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [state, setState] = useState<PlayerState>("ready");
  const station = stations[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !station?.audioStreamUrl) return undefined;

    let hls: import("hls.js").default | null = null;
    let cancelled = false;
    const streamUrl = station.audioStreamUrl;
    const isHls = streamUrl.toLowerCase().includes(".m3u8");
    const handlePlaying = () => {
      setIsPlaying(true);
      setState("ready");
    };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setState("loading");
    const handleError = () => {
      setIsPlaying(false);
      setState("error");
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);
    setState("ready");

    const connect = async () => {
      if (isHls) {
        const nativeHls = audio.canPlayType("application/vnd.apple.mpegurl");
        if (nativeHls !== "probably" && nativeHls !== "maybe") {
          const { default: Hls } = await import("hls.js");
          if (cancelled || !Hls.isSupported()) {
            if (!cancelled) setState("error");
            return;
          }
          hls = new Hls({});
          hls.loadSource(streamUrl);
          hls.attachMedia(audio);
        } else {
          audio.src = streamUrl;
        }
      } else {
        audio.src = streamUrl;
      }
      audio.load();
      if (resumeRef.current) {
        resumeRef.current = false;
        void audio.play().catch(() => setState("error"));
      }
    };
    void connect();

    return () => {
      cancelled = true;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
      hls?.destroy();
    };
  }, [station]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  if (!station) return null;

  const selectStation = (nextIndex: number) => {
    resumeRef.current = isPlaying;
    setIndex((nextIndex + stations.length) % stations.length);
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      setState("loading");
      void audio.play().catch(() => setState("error"));
    }
  };

  return (
    <section className="border border-[#173f36] bg-[#102f2a] p-5 text-[#fffaf0] sm:p-7" aria-label={text.title}>
      <audio ref={audioRef} preload="none" aria-label={`${station.name[locale]} live radio`} />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[#d7b56c]">{text.eyebrow}</p>
          <h2 className="mt-2 serif-heading text-3xl leading-none sm:text-4xl">{text.title}</h2>
        </div>
        <span className="border border-[#d7b56c]/70 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#d7b56c]">{index + 1} / {stations.length}</span>
      </div>

      <div className="mt-5 grid items-center gap-5 border border-[#d7b56c]/50 bg-[#173f36] p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-5">
        <div className="flex items-center justify-center gap-2 sm:flex-col">
          <span className="h-11 w-11 rounded-full border-4 border-[#d7b56c] bg-[#b49353] shadow-[inset_0_0_0_4px_#173f36]" aria-hidden="true" />
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#b9dfe4]">FM</span>
        </div>
        <div className="min-w-0 border border-[#d7b56c]/70 bg-[#0d2925] px-4 py-4 text-center shadow-[inset_0_0_18px_rgba(0,0,0,0.35)] sm:px-6">
          <p className="font-mono text-3xl font-semibold tracking-[0.12em] text-[#f0cf79] sm:text-4xl">{station.fmFrequency ?? "ONLINE"}</p>
          <p className="mt-2 truncate text-lg font-semibold text-[#fffaf0] sm:text-xl">{station.name[locale]}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#b9dfe4]">{state === "loading" ? text.loading : state === "error" ? text.unavailable : station.shortLabel?.[locale] ?? text.station}</p>
        </div>
        <div className="flex items-center justify-center gap-3 sm:flex-col">
          <span className="h-11 w-11 rounded-full border-4 border-[#d7b56c] bg-[#b49353] shadow-[inset_0_0_0_4px_#173f36]" aria-hidden="true" />
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#b9dfe4]">TUNE</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-between">
        <div className="flex gap-2">
          <button type="button" onClick={() => selectStation(index - 1)} aria-label={text.previous} className="min-h-10 border border-[#d7b56c] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#fffaf0] hover:bg-[#245249]">◀◀</button>
          <button type="button" onClick={togglePlayback} aria-label={isPlaying ? text.pause : text.play} className="min-h-10 min-w-24 border border-[#d7b56c] bg-[#d7b56c] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#102f2a] hover:bg-[#ebcf8b]">{isPlaying ? "Ⅱ" : "▶"} {isPlaying ? text.pause : text.play}</button>
          <button type="button" onClick={() => selectStation(index + 1)} aria-label={text.next} className="min-h-10 border border-[#d7b56c] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#fffaf0] hover:bg-[#245249]">▶▶</button>
        </div>
        <label className="flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#b9dfe4]">
          {text.volume}
          <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label={text.volume} className="accent-[#d7b56c]" />
        </label>
        {station.websiteUrl ? <a href={station.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#d7b56c] underline underline-offset-4">{text.website}</a> : null}
      </div>
    </section>
  );
}
