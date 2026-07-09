import type { Locale } from "@/i18n/locales";
import type { GuideUtilityBlock } from "@/content/guide";
import Image from "next/image";
import { getRadioStationsForTenant, getRadioStationLabel } from "@/content/utility/radio";

type LocalizedCopy = {
  title: string;
  description: string;
  station: string;
  languages: string;
  contentTypes: string;
  musicStyles: string;
  usefulFor: string;
  listen: string;
  website: string;
  noStations: string;
  audioUnavailable: string;
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
    listen: "Listen online",
    website: "Website",
    noStations: "No station details available yet.",
    audioUnavailable: "Audio stream may not be available for this link.",
  },
  fr: {
    title: "Radio locale",
    description: "Sélections de radios locales utiles sur le secteur.",
    station: "Radio",
    languages: "Langues",
    contentTypes: "Rubriques",
    musicStyles: "Styles musicaux",
    usefulFor: "Utile pour",
    listen: "Écouter en ligne",
    website: "Site web",
    noStations: "Aucune station enregistrée pour le moment.",
    audioUnavailable: "Le flux audio peut ne pas être disponible depuis ce lien.",
  },
  it: {
    title: "Radio locali",
    description: "Selezione di radio locali utili per la zona.",
    station: "Stazione",
    contentTypes: "Contenuti",
    musicStyles: "Stili musicali",
    usefulFor: "Utile per",
    languages: "Lingue",
    listen: "Ascolta online",
    website: "Sito web",
    noStations: "Nessuna radio disponibile al momento.",
    audioUnavailable: "Lo streaming audio potrebbe non essere disponibile da questo link.",
  },
  uk: {
    title: "Локальне радіо",
    description: "Добірка корисних локальних станцій.",
    station: "Станція",
    languages: "Мови",
    contentTypes: "Формат",
    musicStyles: "Музика",
    usefulFor: "Корисно для",
    listen: "Слухати онлайн",
    website: "Сайт",
    noStations: "Поки що немає деталей по станціях.",
    audioUnavailable: "Аудіо-стрім може бути недоступний за цим посиланням.",
  },
};

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

          return (
            <div key={station.id} className="border border-[#e6d9c6] bg-white/65 p-3 sm:p-4">
              {station.image ? (
                <div className="relative aspect-[16/9] overflow-hidden border border-[#e6d9c6] bg-[#f7f2ea]">
                  <Image
                    src={station.image}
                    alt={`${stationName} logo`}
                    fill
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-contain p-2"
                  />
                </div>
              ) : null}
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
                {station.audioStreamUrl ? (
                  <>
                    <audio controls className="w-full max-w-sm" preload="none" src={station.audioStreamUrl} />
                    <span className="text-[0.62rem] text-[#71665b]">{copy.audioUnavailable}</span>
                  </>
                ) : null}

                {(station.audioStreamUrl || station.onlineStreamUrl) ? (
                  <a
                    className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]"
                    href={station.audioStreamUrl ?? station.onlineStreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.listen}
                  </a>
                ) : null}

                {station.websiteUrl ? (
                  <a className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]" href={station.websiteUrl} target="_blank" rel="noopener noreferrer">
                    {copy.website}
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
