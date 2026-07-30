"use client";

import { useEffect, useMemo, useState } from "react";

type ClockZone = {
  id: string;
  label: string;
  zone: string;
};

const defaultZones: ClockZone[] = [
  { id: "new-york", label: "New York", zone: "America/New_York" },
  { id: "london", label: "London", zone: "Europe/London" },
  { id: "dubai", label: "Dubai", zone: "Asia/Dubai" },
  { id: "tokyo", label: "Tokyo", zone: "Asia/Tokyo" },
];

const selectableZones = [
  { label: "Menton / Paris", zone: "Europe/Paris" },
  ...defaultZones.map(({ label, zone }) => ({ label, zone })),
  { label: "Los Angeles", zone: "America/Los_Angeles" },
  { label: "Singapore", zone: "Asia/Singapore" },
  { label: "Sydney", zone: "Australia/Sydney" },
];

function formatTime(date: Date, zone: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit" }).format(date);
}

function isDaytime(date: Date, zone: string) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "numeric", hour12: false }).format(date));
  return hour >= 7 && hour < 19;
}

export function WorldClocks({ locale }: { locale: string }) {
  const [now, setNow] = useState<Date | null>(null);
  const [selectedZone, setSelectedZone] = useState("Europe/Paris");
  const copy = {
    en: { eyebrow: "Local time", title: "Riviera time zones", note: "Menton, Monaco, Nice and Italy share Europe/Paris time.", custom: "Your time", select: "Select your time zone" },
    fr: { eyebrow: "Heure locale", title: "Fuseaux horaires de la Riviera", note: "Menton, Monaco, Nice et l’Italie partagent l’heure Europe/Paris.", custom: "Votre heure", select: "Choisir votre fuseau horaire" },
    it: { eyebrow: "Ora locale", title: "Fusi orari della Riviera", note: "Mentone, Monaco, Nizza e l’Italia condividono l’ora Europe/Paris.", custom: "La tua ora", select: "Scegli il tuo fuso orario" },
    uk: { eyebrow: "Місцевий час", title: "Часові пояси Рив’єри", note: "Ментон, Монако, Ніцца та Італія мають час Europe/Paris.", custom: "Ваш час", select: "Оберіть свій часовий пояс" },
  }[locale as "en" | "fr" | "it" | "uk"] ?? {
    eyebrow: "Local time", title: "Riviera time zones", note: "Menton, Monaco, Nice and Italy share Europe/Paris time.", custom: "Your time", select: "Select your time zone",
  };

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(new Date()), 0);
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  const customLabel = useMemo(
    () => selectableZones.find((option) => option.zone === selectedZone)?.label ?? selectedZone,
    [selectedZone],
  );
  const zones = [{ id: "custom", label: customLabel, zone: selectedZone }, ...defaultZones];

  return (
    <section className="relative overflow-hidden border-y border-[#dfd4c1] bg-[#f7efe0]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(247,189,60,0.24),transparent_28%),linear-gradient(135deg,rgba(255,250,232,0.96),rgba(226,242,242,0.84))]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b07820]">{copy.eyebrow}</p>
            <h2 className="mt-2 serif-heading text-3xl leading-none text-[#173f36]">{copy.title}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#5c5044]">{copy.note}</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {zones.map((clock, index) => (
            <div key={clock.id} className={`border border-white/80 p-5 ${now && !isDaytime(now, clock.zone) ? "bg-[#dfecef]" : index === 0 ? "bg-[#fff3cf]" : "bg-[#fffdf8]/72"}`}>
              <p className="text-lg font-semibold text-[#173f36]">{clock.label}</p>
              <p className="mt-5 font-mono text-4xl font-semibold tracking-[0.08em] text-[#173f36]">{now ? formatTime(now, clock.zone) : "--:--"}</p>
              {index === 0 ? (
                <label className="mt-3 block">
                  <span className="sr-only">{copy.select}</span>
                  <select value={selectedZone} onChange={(event) => setSelectedZone(event.target.value)} className="w-full border border-[#d9bf89] bg-[#fffdf8] px-2 py-2 text-xs font-semibold text-[#173f36]">
                    {selectableZones.map((option) => <option key={option.zone} value={option.zone}>{option.label}</option>)}
                  </select>
                </label>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
