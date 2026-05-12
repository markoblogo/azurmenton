import type { Locale } from "@/i18n/locales";

export const homeCopy: Record<
  Locale,
  {
    title: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
  }
> = {
  en: {
    title: "Family-run apartments in central Menton",
    intro:
      "A clear, practical home for Azur Menton's three short-term rentals. Full apartment details, photos, and direct booking request handling will be added as the source material is confirmed.",
    primaryCta: "Request to book",
    secondaryCta: "View apartments",
  },
  fr: {
    title: "Appartements familiaux au centre de Menton",
    intro:
      "Un site clair et pratique pour les trois locations courte duree d'Azur Menton. Les details, photos et demandes de reservation directe seront ajoutes avec les contenus confirmes.",
    primaryCta: "Faire une demande",
    secondaryCta: "Voir les appartements",
  },
  it: {
    title: "Appartamenti a gestione familiare nel centro di Mentone",
    intro:
      "Una base chiara e pratica per le tre case vacanza di Azur Menton. Dettagli, foto e richieste dirette saranno aggiunti quando i contenuti saranno confermati.",
    primaryCta: "Richiedi prenotazione",
    secondaryCta: "Vedi appartamenti",
  },
  uk: {
    title: "Family-run apartments in central Menton",
    intro:
      "A clear, practical home for Azur Menton's three short-term rentals. Full apartment details, photos, and direct booking request handling will be added as the source material is confirmed.",
    primaryCta: "Request to book",
    secondaryCta: "View apartments",
  },
};

export const pageCopy: Record<
  string,
  Record<Locale, { title: string; description: string; note: string }>
> = {
  guide: {
    en: {
      title: "Menton guide",
      description: "Travel notes for Menton and nearby Riviera destinations will live here.",
      note: "Future content can cover beaches, old town walks, transport, restaurants, Monaco, Italy, and family-friendly day trips.",
    },
    fr: {
      title: "Guide de Menton",
      description: "Les conseils de voyage pour Menton et la Riviera seront ajoutes ici.",
      note: "Les futurs contenus pourront couvrir les plages, la vieille ville, les transports, restaurants, Monaco, l'Italie et les sorties en famille.",
    },
    it: {
      title: "Guida di Mentone",
      description: "Qui saranno pubblicate note di viaggio su Mentone e la Riviera vicina.",
      note: "I contenuti futuri potranno includere spiagge, centro storico, trasporti, ristoranti, Monaco, Italia e gite in famiglia.",
    },
    uk: {
      title: "Menton guide",
      description: "Travel notes for Menton and nearby Riviera destinations will live here.",
      note: "Future content can cover beaches, old town walks, transport, restaurants, Monaco, Italy, and family-friendly day trips.",
    },
  },
  events: {
    en: {
      title: "Events in Menton",
      description: "Seasonal and event content will be added only when dates and details are confirmed.",
      note: "No event dates are shown yet to avoid stale or invented information.",
    },
    fr: {
      title: "Evenements a Menton",
      description: "Les contenus saisonniers seront ajoutes uniquement avec dates et details confirmes.",
      note: "Aucune date d'evenement n'est affichee pour eviter les informations inventees ou obsoletes.",
    },
    it: {
      title: "Eventi a Mentone",
      description: "I contenuti stagionali saranno aggiunti solo con date e dettagli confermati.",
      note: "Le date degli eventi non sono ancora indicate per evitare informazioni inventate o obsolete.",
    },
    uk: {
      title: "Events in Menton",
      description: "Seasonal and event content will be added only when dates and details are confirmed.",
      note: "No event dates are shown yet to avoid stale or invented information.",
    },
  },
  faq: {
    en: {
      title: "Frequently asked questions",
      description: "Practical guest questions and answers will be added after the booking workflow is confirmed.",
      note: "This page is ready for check-in, payment, cancellation, parking, and travel information.",
    },
    fr: {
      title: "Questions frequentes",
      description: "Les questions pratiques seront ajoutees apres confirmation du parcours de reservation.",
      note: "Cette page est prete pour les informations d'arrivee, paiement, annulation, parking et transport.",
    },
    it: {
      title: "Domande frequenti",
      description: "Le domande pratiche saranno aggiunte dopo la conferma del flusso di prenotazione.",
      note: "La pagina e pronta per informazioni su check-in, pagamento, cancellazione, parcheggio e viaggio.",
    },
    uk: {
      title: "Frequently asked questions",
      description: "Practical guest questions and answers will be added after the booking workflow is confirmed.",
      note: "This page is ready for check-in, payment, cancellation, parking, and travel information.",
    },
  },
  contact: {
    en: {
      title: "Contact Azur Menton",
      description: "Contact details and enquiry handling will be completed with the booking request backend.",
      note: "No email provider or form backend is connected yet.",
    },
    fr: {
      title: "Contacter Azur Menton",
      description: "Les coordonnees et demandes seront finalisees avec le backend du formulaire.",
      note: "Aucun fournisseur email ni backend de formulaire n'est connecte pour l'instant.",
    },
    it: {
      title: "Contatta Azur Menton",
      description: "Contatti e richieste saranno completati con il backend del modulo.",
      note: "Nessun provider email o backend del modulo e ancora collegato.",
    },
    uk: {
      title: "Contact Azur Menton",
      description: "Contact details and enquiry handling will be completed with the booking request backend.",
      note: "No email provider or form backend is connected yet.",
    },
  },
  privacy: {
    en: {
      title: "Privacy policy",
      description: "A full privacy policy will be added before collecting real guest enquiries.",
      note: "The production policy should reflect the final form backend, email handling, analytics, and hosting setup.",
    },
    fr: {
      title: "Politique de confidentialite",
      description: "La politique complete sera ajoutee avant la collecte de vraies demandes clients.",
      note: "La version finale devra refleter le backend, l'email, les analytics et l'hebergement.",
    },
    it: {
      title: "Privacy policy",
      description: "La policy completa sara aggiunta prima di raccogliere richieste reali.",
      note: "La versione finale dovra riflettere backend, email, analytics e hosting.",
    },
    uk: {
      title: "Privacy policy",
      description: "A full privacy policy will be added before collecting real guest enquiries.",
      note: "The production policy should reflect the final form backend, email handling, analytics, and hosting setup.",
    },
  },
  legal: {
    en: {
      title: "Legal notice",
      description: "Legal owner and publication details will be added from confirmed business information.",
      note: "Do not publish this page as final until the legal details are verified.",
    },
    fr: {
      title: "Mentions legales",
      description: "Les informations legales seront ajoutees a partir des donnees confirmees.",
      note: "Ne pas publier cette page comme finale avant verification des details legaux.",
    },
    it: {
      title: "Note legali",
      description: "Le informazioni legali saranno aggiunte dai dati aziendali confermati.",
      note: "Non pubblicare questa pagina come definitiva prima della verifica.",
    },
    uk: {
      title: "Legal notice",
      description: "Legal owner and publication details will be added from confirmed business information.",
      note: "Do not publish this page as final until the legal details are verified.",
    },
  },
};
