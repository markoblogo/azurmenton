import type { Locale } from "@/i18n/locales";

type LocalizedString = Record<Locale, string>;

export type WindyWebcam = {
  id: string;
  title: string;
  provider: "Windy";
  webcamId: string;
  locationLabel: string;
  externalUrl: string;
  configUrl: string;
  playerScriptUrl: string;
  playMode: "day";
  autoPlay: false;
  loop: false;
  interactive: true;
};

export type ExternalWebcamLink = {
  title: LocalizedString;
  provider: string;
  externalUrl: string;
};

export const windyMentonWebcam: WindyWebcam = {
  id: "menton-vieux-port-windy",
  title: "Menton: Vieux port",
  provider: "Windy",
  webcamId: "1545515171",
  locationLabel: "Vieux Port de Menton",
  externalUrl: "https://windy.com/webcams/1545515171",
  configUrl: "https://embed.windy.com/config/webcam/1545515171",
  playerScriptUrl: "https://webcams.windy.com/webcams/public/embed/v2/script/player.js",
  playMode: "day",
  autoPlay: false,
  loop: false,
  interactive: true,
};

export const webcamSectionCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    sourceLabel: string;
    locationLabel: string;
    timelapseNote: string;
    cta: string;
    fallbackTitle: string;
    otherTitle: string;
    otherIntro: string;
  }
> = {
  en: {
    eyebrow: "Live Menton",
    title: "Live view from Menton's old port",
    intro: "A public Windy webcam from Vieux Port de Menton, useful for checking the seafront mood before planning your stay.",
    note: "The webcam is provided by Windy / third-party public sources. Availability may change.",
    sourceLabel: "Source",
    locationLabel: "Location",
    timelapseNote: "Timelapse player; not guaranteed real-time video.",
    cta: "Open on Windy",
    fallbackTitle: "The live view could not be loaded here.",
    otherTitle: "Other public webcam links",
    otherIntro: "Some public webcam pages do not provide a stable embed. They can still be useful as external references.",
  },
  fr: {
    eyebrow: "En direct à Menton",
    title: "Vue en direct du vieux port de Menton",
    intro: "Une webcam publique Windy depuis le Vieux Port de Menton, utile pour vérifier l'ambiance du front de mer avant de préparer votre séjour.",
    note: "La webcam est fournie par Windy / des sources publiques tierces. Sa disponibilité peut changer.",
    sourceLabel: "Source",
    locationLabel: "Lieu",
    timelapseNote: "Lecteur timelapse; la vidéo n'est pas garantie en temps réel.",
    cta: "Ouvrir sur Windy",
    fallbackTitle: "La vue en direct n'a pas pu être chargée ici.",
    otherTitle: "Autres liens webcams publics",
    otherIntro: "Certaines pages de webcams publiques ne proposent pas d'intégration stable. Elles peuvent rester utiles comme références externes.",
  },
  it: {
    eyebrow: "Menton dal vivo",
    title: "Vista in diretta dal vecchio porto di Mentone",
    intro: "Una webcam pubblica Windy dal Vieux Port de Menton, utile per controllare l'atmosfera del lungomare prima di pianificare il soggiorno.",
    note: "La webcam è fornita da Windy / fonti pubbliche di terze parti. La disponibilità può cambiare.",
    sourceLabel: "Fonte",
    locationLabel: "Luogo",
    timelapseNote: "Player timelapse; il video non è garantito in tempo reale.",
    cta: "Apri su Windy",
    fallbackTitle: "La vista live non può essere caricata qui.",
    otherTitle: "Altri link pubblici alle webcam",
    otherIntro: "Alcune pagine webcam pubbliche non offrono un embed stabile. Possono comunque essere utili come riferimenti esterni.",
  },
  uk: {
    eyebrow: "Ментон наживо",
    title: "Вид наживо на старий порт Ментона",
    intro: "Публічна вебкамера Windy з Vieux Port de Menton допомагає подивитися на набережну перед плануванням поїздки.",
    note: "Вебкамеру надає Windy / сторонні публічні джерела. Доступність може змінюватися.",
    sourceLabel: "Джерело",
    locationLabel: "Локація",
    timelapseNote: "Timelapse-плеєр; відео не гарантовано є прямою трансляцією в реальному часі.",
    cta: "Відкрити на Windy",
    fallbackTitle: "Вид наживо не вдалося завантажити на цій сторінці.",
    otherTitle: "Інші публічні посилання на вебкамери",
    otherIntro: "Деякі публічні сторінки вебкамер не мають стабільного embed. Вони можуть бути корисними як зовнішні джерела.",
  },
};

export const externalWebcamLinks: ExternalWebcamLink[] = [
  {
    title: {
      en: "Ville de Menton webcam page",
      fr: "Page webcam de la Ville de Menton",
      it: "Pagina webcam della Ville de Menton",
      uk: "Сторінка вебкамер Ville de Menton",
    },
    provider: "Ville de Menton",
    externalUrl: "https://www.menton.fr/-Webcam",
  },
  {
    title: {
      en: "WebcamGalore Menton page",
      fr: "Page Menton sur WebcamGalore",
      it: "Pagina Mentone su WebcamGalore",
      uk: "Сторінка Ментона на WebcamGalore",
    },
    provider: "WebcamGalore",
    externalUrl: "https://www.webcamgalore.com/webcam/France/Menton/32681.html",
  },
  {
    title: {
      en: "Skaping Sablettes panoramic page",
      fr: "Page panoramique Skaping Sablettes",
      it: "Pagina panoramica Skaping Sablettes",
      uk: "Панорамна сторінка Skaping Sablettes",
    },
    provider: "Skaping",
    externalUrl: "https://www.skaping.com/menton/plage-des-sablettes/panoramique",
  },
];
