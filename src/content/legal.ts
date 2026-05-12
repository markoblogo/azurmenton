import type { Locale } from "@/i18n/locales";

export type LegalPageKey = "legal" | "privacy" | "cookies" | "booking-terms";

type LegalSection = {
  title: string;
  body: string[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  sections: LegalSection[];
};

const legalTodos = [
  "TODO: add website publisher / editeur details.",
  "TODO: add business or owner name and legal form/status.",
  "TODO: add SIRET/SIREN, VAT number or registration details if applicable.",
  "TODO: add registered address or contact address.",
  "TODO: add publication director.",
  "TODO: confirm hosting provider legal details.",
  "TODO: add appointed consumer mediator details if legally required.",
  "TODO: confirm payment, deposit, cancellation, tourist tax and retention periods.",
];

export const legalTodoFields = legalTodos;

export const legalPages: Record<LegalPageKey, Record<Locale, LegalPageContent>> = {
  legal: {
    fr: {
      title: "Mentions legales",
      description:
        "Mentions legales d'Azur Menton. Les champs inconnus sont marques comme TODO et doivent etre completes avant lancement definitif.",
      seoTitle: "Mentions legales",
      seoDescription: "Mentions legales d'Azur Menton avec champs proprietaire, editeur, hebergeur et contact a completer.",
      sections: [
        {
          title: "Editeur du site",
          body: [
            "Site: Azur Menton, azurmenton.com.",
            "TODO: nom du proprietaire, de l'entreprise ou de l'editeur du site.",
            "TODO: forme juridique ou statut, SIRET/SIREN, TVA intracommunautaire ou numero d'immatriculation si applicable.",
            "TODO: adresse du siege social ou adresse de contact.",
            "Email de contact: hello@azurmenton.com. TODO: confirmer l'adresse email officielle et ajouter un telephone si applicable.",
            "TODO: directeur ou directrice de la publication.",
          ],
        },
        {
          title: "Hebergement",
          body: [
            "Le site est prevu pour un hebergement sur Vercel. TODO: confirmer le prestataire d'hebergement final, sa denomination sociale et son adresse avant mise en production.",
          ],
        },
        {
          title: "Propriete intellectuelle",
          body: [
            "Les textes, photographies, logos, elements graphiques et contenus du site sont proteges par le droit applicable. Toute reproduction ou reutilisation non autorisee est interdite, sauf accord ecrit prealable.",
            "Les photographies des appartements doivent provenir de sources autorisees par Azur Menton.",
          ],
        },
        {
          title: "Responsabilite",
          body: [
            "Azur Menton s'efforce de publier des informations exactes et a jour, mais ne peut garantir l'absence totale d'erreur ou d'indisponibilite temporaire du site.",
            "Les demandes de reservation envoyees depuis le site ne constituent pas une confirmation instantanee. La disponibilite, le prix et les conditions sont confirmes par ecrit par l'hote.",
          ],
        },
        {
          title: "Contact",
          body: [
            "Pour toute question relative au site ou aux contenus: hello@azurmenton.com. TODO: confirmer les coordonnees definitives du responsable du site.",
          ],
        },
      ],
    },
    en: {
      title: "Legal Notice",
      description:
        "Legal notice for Azur Menton. Unknown owner and business fields are clearly marked as TODO placeholders.",
      seoTitle: "Legal Notice",
      seoDescription: "Legal notice for Azur Menton with publisher, owner, hosting and contact placeholders.",
      sections: [
        {
          title: "Website publisher",
          body: [
            "Website: Azur Menton, azurmenton.com.",
            "TODO: add business or owner name, legal status, SIRET/SIREN, VAT or registration number if applicable.",
            "TODO: add registered address or contact address, publication director and confirmed phone details if applicable.",
            "Contact email: hello@azurmenton.com. TODO: confirm the final official contact address.",
          ],
        },
        {
          title: "Hosting",
          body: [
            "The website is prepared for Vercel hosting. TODO: confirm the final hosting provider legal name and address before production launch.",
          ],
        },
        {
          title: "Intellectual property and liability",
          body: [
            "Texts, photos, logos and design elements are protected. Reuse requires prior written permission.",
            "Booking requests are not instant confirmations. Availability, prices and conditions are confirmed manually in writing by the host.",
          ],
        },
      ],
    },
    it: {
      title: "Note legali",
      description: "Note legali di Azur Menton con campi da completare prima del lancio definitivo.",
      seoTitle: "Note legali",
      seoDescription: "Note legali di Azur Menton con segnaposto per editore, proprietario, hosting e contatti.",
      sections: [
        {
          title: "Editore del sito",
          body: [
            "Sito: Azur Menton, azurmenton.com.",
            "TODO: aggiungere nome del proprietario o dell'attivita, forma giuridica, SIRET/SIREN, partita IVA o registrazione se applicabile.",
            "TODO: aggiungere indirizzo, direttore della pubblicazione, telefono se applicabile e dati definitivi di contatto.",
          ],
        },
        {
          title: "Hosting, proprieta intellettuale e responsabilita",
          body: [
            "Il sito e predisposto per Vercel. TODO: confermare i dettagli legali dell'hosting prima del lancio.",
            "Testi, foto, logo e design sono protetti. Le richieste di prenotazione non sono conferme istantanee.",
          ],
        },
      ],
    },
    uk: {
      title: "Legal Notice",
      description: "Legal notice for Azur Menton with TODO placeholders for owner and business details.",
      seoTitle: "Legal Notice",
      seoDescription: "Legal notice for Azur Menton with publisher, hosting and contact placeholders.",
      sections: [
        {
          title: "Website publisher",
          body: [
            "Website: Azur Menton, azurmenton.com.",
            "TODO: add owner or business name, legal status, registration details, address, publication director and confirmed contact details.",
          ],
        },
        {
          title: "Hosting and liability",
          body: [
            "The website is prepared for Vercel hosting. TODO: confirm final hosting legal details.",
            "Booking requests are not instant confirmations. Availability, prices and conditions are confirmed manually in writing.",
          ],
        },
      ],
    },
  },
  privacy: {
    fr: {
      title: "Politique de confidentialite",
      description:
        "Informations sur les donnees collectees par Azur Menton pour repondre aux demandes de reservation.",
      seoTitle: "Politique de confidentialite",
      seoDescription: "Politique de confidentialite Azur Menton: donnees du formulaire, finalites, base legale, droits RGPD et contact.",
      sections: [
        {
          title: "Responsable du traitement",
          body: [
            "Le responsable du traitement est Azur Menton / l'hote exploitant les appartements. TODO: ajouter le nom legal complet, le statut, l'adresse et les coordonnees definitives.",
            "Contact pour les demandes relatives aux donnees personnelles: hello@azurmenton.com. TODO: confirmer l'adresse dediee si differente.",
          ],
        },
        {
          title: "Donnees collectees",
          body: [
            "Le formulaire de demande de reservation peut collecter: nom, email, telephone ou WhatsApp, langue preferee, appartement demande, dates d'arrivee et de depart, nombre de voyageurs, demande de parking et message libre.",
            "Aucune donnee de paiement n'est collectee par le site actuellement.",
          ],
        },
        {
          title: "Finalites et bases legales",
          body: [
            "Les donnees servent a repondre aux demandes de reservation, gerer les echanges precontractuels, gerer une reservation confirmee le cas echeant et assurer le support client.",
            "Les bases legales peuvent inclure les mesures precontractuelles demandees par l'utilisateur, l'execution d'un contrat le cas echeant, l'interet legitime pour la communication operationnelle et le consentement lorsque celui-ci est requis.",
          ],
        },
        {
          title: "Destinataires, conservation et transferts",
          body: [
            "Les donnees sont destinees a Azur Menton / l'equipe hote et aux prestataires techniques strictement necessaires, le cas echeant.",
            "TODO: definir les durees exactes de conservation des demandes non confirmees, reservations confirmees, archives comptables et messages de support.",
            "TODO: verifier les eventuels transferts hors Union europeenne si des outils email, notification, CRM, Airtable, Supabase ou equivalents sont ajoutes.",
          ],
        },
        {
          title: "Droits RGPD",
          body: [
            "Vous pouvez demander l'acces, la rectification, l'effacement, la limitation du traitement, l'opposition et la portabilite lorsque ces droits s'appliquent.",
            "Vous pouvez egalement introduire une reclamation aupres de la CNIL: cnil.fr.",
            "Azur Menton ne vend pas les donnees personnelles.",
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      description: "How Azur Menton uses booking request details to reply to guests.",
      seoTitle: "Privacy Policy",
      seoDescription: "Azur Menton privacy policy covering booking request data, purposes, GDPR rights and contact.",
      sections: [
        {
          title: "Controller and contact",
          body: [
            "The data controller is Azur Menton / the host team. TODO: add the full legal owner or business details.",
            "Privacy contact: hello@azurmenton.com. TODO: confirm a dedicated privacy contact if different.",
          ],
        },
        {
          title: "Data, purpose and legal basis",
          body: [
            "The booking request form may collect name, email, phone/WhatsApp, preferred language, requested apartment, check-in/check-out dates, guest numbers, parking request and message.",
            "This data is used to respond to booking requests, manage pre-contractual communication, manage confirmed reservations where applicable and provide customer support.",
            "Legal bases may include pre-contractual steps requested by the user, contract where applicable, legitimate interest for operational communication and consent where required.",
          ],
        },
        {
          title: "Recipients, retention and rights",
          body: [
            "Data may be accessed by Azur Menton / the host team and necessary technical providers. TODO: confirm exact providers and retention periods.",
            "Users may request access, rectification, deletion, restriction, objection and portability where applicable, and may complain to CNIL.",
            "Azur Menton does not sell personal data. TODO: assess international transfers if non-EU tools are added later.",
          ],
        },
      ],
    },
    it: {
      title: "Informativa privacy",
      description: "Come Azur Menton usa i dati delle richieste di prenotazione per rispondere agli ospiti.",
      seoTitle: "Informativa privacy",
      seoDescription: "Informativa privacy Azur Menton su dati del modulo, finalita, diritti GDPR e contatti.",
      sections: [
        {
          title: "Titolare, dati e finalita",
          body: [
            "Il titolare e Azur Menton / il team host. TODO: aggiungere i dati legali completi.",
            "Il modulo puo raccogliere nome, email, telefono/WhatsApp, lingua, appartamento, date, numero ospiti, richiesta parcheggio e messaggio.",
            "I dati servono per rispondere alla richiesta, gestire comunicazioni precontrattuali, eventuali prenotazioni confermate e supporto.",
          ],
        },
        {
          title: "Diritti e conservazione",
          body: [
            "Le basi giuridiche possono includere misure precontrattuali, contratto, interesse legittimo e consenso dove richiesto.",
            "TODO: confermare destinatari, tempi di conservazione e eventuali trasferimenti internazionali.",
            "Gli utenti hanno diritti GDPR applicabili e possono presentare reclamo alla CNIL. Azur Menton non vende dati personali.",
          ],
        },
      ],
    },
    uk: {
      title: "Privacy Policy",
      description: "How Azur Menton uses booking request details to respond to guests.",
      seoTitle: "Privacy Policy",
      seoDescription: "Azur Menton privacy policy covering request data, purposes, GDPR rights and contact.",
      sections: [
        {
          title: "Controller, data and purpose",
          body: [
            "The controller is Azur Menton / the host team. TODO: add full legal owner or business details.",
            "The form may collect name, email, phone/WhatsApp, preferred language, apartment, dates, guest numbers, parking request and message.",
            "Data is used to answer booking requests, manage pre-contractual communication, confirmed reservations where applicable and customer support.",
          ],
        },
        {
          title: "Rights and retention",
          body: [
            "Legal bases may include pre-contractual steps, contract, legitimate interest and consent where required.",
            "TODO: confirm recipients, retention periods and any international transfers.",
            "Users have applicable GDPR rights and may complain to CNIL. Azur Menton does not sell personal data.",
          ],
        },
      ],
    },
  },
  cookies: {
    fr: {
      title: "Politique cookies",
      description: "Informations sur les cookies, mesures d'audience et contenus tiers du site Azur Menton.",
      seoTitle: "Politique cookies",
      seoDescription: "Politique cookies Azur Menton: cookies strictement necessaires, analytics, webcams, meteo et consentement.",
      sections: [
        {
          title: "Cookies actuellement utilises",
          body: [
            "A ce stade, le site n'utilise pas de cookies non essentiels connus pour l'analyse marketing ou publicitaire.",
            "Des cookies strictement necessaires peuvent etre utilises par l'hebergement ou le fonctionnement technique du site.",
          ],
        },
        {
          title: "Services qui pourraient etre ajoutes",
          body: [
            "Si des outils d'analytics sont ajoutes plus tard, ils devront etre documentes ici et, si necessaire, soumis au consentement.",
            "Le widget meteo et la section webcams ne doivent pas charger de scripts tiers cote navigateur par defaut. Les webcams sont proposees sous forme de liens externes.",
          ],
        },
        {
          title: "Consentement",
          body: [
            "TODO: ajouter un mecanisme de consentement et de retrait si des cookies non essentiels, analytics ou embeds tiers sont actives.",
          ],
        },
      ],
    },
    en: {
      title: "Cookie Policy",
      description: "Cookie information for the Azur Menton website.",
      seoTitle: "Cookie Policy",
      seoDescription: "Azur Menton cookie policy covering essential cookies, analytics placeholders and third-party embeds.",
      sections: [
        {
          title: "Current use",
          body: [
            "The website does not currently use known non-essential marketing or analytics cookies.",
            "Strictly necessary cookies may be used by hosting or core technical services.",
          ],
        },
        {
          title: "Future services and consent",
          body: [
            "Analytics cookies, third-party embeds or additional providers must be documented here if added later.",
            "Weather and webcam features should not load third-party browser scripts by default. Webcam cards currently link out to public sources.",
            "TODO: add a consent and withdrawal mechanism if non-essential cookies are introduced.",
          ],
        },
      ],
    },
    it: {
      title: "Politica cookie",
      description: "Informazioni sui cookie del sito Azur Menton.",
      seoTitle: "Politica cookie",
      seoDescription: "Politica cookie Azur Menton su cookie essenziali, analytics futuri e contenuti terzi.",
      sections: [
        {
          title: "Uso attuale",
          body: [
            "Il sito non usa attualmente cookie non essenziali noti per marketing o analytics.",
            "Cookie strettamente necessari possono essere usati dall'hosting o da servizi tecnici.",
            "TODO: aggiungere consenso e revoca se in futuro vengono attivati cookie non essenziali o embed terzi.",
          ],
        },
      ],
    },
    uk: {
      title: "Cookie Policy",
      description: "Cookie information for the Azur Menton website.",
      seoTitle: "Cookie Policy",
      seoDescription: "Azur Menton cookie policy for essential cookies, future analytics and third-party embeds.",
      sections: [
        {
          title: "Current use",
          body: [
            "The website does not currently use known non-essential marketing or analytics cookies.",
            "Strictly necessary cookies may be used by hosting or core technical services.",
            "TODO: add consent and withdrawal controls if non-essential cookies or third-party embeds are introduced.",
          ],
        },
      ],
    },
  },
  "booking-terms": {
    fr: {
      title: "Conditions de reservation",
      description: "Conditions applicables aux demandes de reservation directe Azur Menton.",
      seoTitle: "Conditions de reservation",
      seoDescription: "Conditions de reservation Azur Menton: demande non instantanee, confirmation, paiement, annulation, taxe de sejour et regles.",
      sections: [
        {
          title: "Demande et confirmation",
          body: [
            "Le formulaire envoie une demande de reservation directe. Il ne s'agit pas d'une confirmation instantanee.",
            "La reservation est confirmee uniquement apres confirmation ecrite de l'hote. Les prix, disponibilites et conditions sont confirmes manuellement jusqu'a l'integration eventuelle d'un channel manager.",
          ],
        },
        {
          title: "Paiement, annulation et taxe",
          body: [
            "TODO: definir les conditions de paiement, acompte ou solde.",
            "TODO: definir les conditions d'annulation et de remboursement.",
            "TODO: definir les modalites de taxe de sejour, si applicable.",
            "TODO: definir le depot de garantie ou caution dommage, si applicable.",
          ],
        },
        {
          title: "Arrivee, depart et regles de maison",
          body: [
            "TODO: confirmer les horaires d'arrivee et de depart.",
            "Regles prevues: logement non-fumeur, pas de fetes ni evenements, respect de l'occupation maximale de chaque appartement.",
            "TODO: confirmer la politique animaux, enfants et lit bebe.",
          ],
        },
        {
          title: "Parking, responsabilites et reclamations",
          body: [
            "Le parking depend de l'appartement, de la disponibilite et peut necessiter une reservation. Des frais peuvent s'appliquer lorsque cela est indique.",
            "Les voyageurs sont responsables de l'utilisation normale du logement, du respect du voisinage et du signalement rapide de tout probleme.",
            "Pour une reclamation, contacter hello@azurmenton.com. TODO: ajouter la procedure definitive.",
            "TODO: ajouter les coordonnees du mediateur de la consommation si legalement requis.",
            "TODO: confirmer la loi applicable et la juridiction competente.",
          ],
        },
      ],
    },
    en: {
      title: "Booking Terms",
      description: "Terms for direct booking requests with Azur Menton.",
      seoTitle: "Booking Terms",
      seoDescription: "Azur Menton booking terms for manual requests, written confirmation, payments, cancellation and house rules.",
      sections: [
        {
          title: "Request and confirmation",
          body: [
            "Submitting the form sends a direct booking request only. It is not instant confirmation.",
            "A booking is confirmed only after written confirmation from the host. Availability, prices and conditions are confirmed manually until a channel manager is connected.",
          ],
        },
        {
          title: "Payments, cancellation and tax",
          body: [
            "TODO: define payment, deposit and balance terms.",
            "TODO: define cancellation and refund terms.",
            "TODO: define tourist tax handling, if applicable.",
            "TODO: define damage or security deposit terms, if applicable.",
          ],
        },
        {
          title: "House rules and guest responsibilities",
          body: [
            "Expected house rules: no smoking, no parties/events and respect for each apartment's maximum occupancy.",
            "TODO: confirm pets, children and cot policies, check-in/check-out times, complaints process, consumer mediator if legally required, governing law and jurisdiction.",
            "Parking depends on the apartment and availability. Reservation may be required and charges may apply where relevant.",
          ],
        },
      ],
    },
    it: {
      title: "Condizioni di prenotazione",
      description: "Condizioni per le richieste dirette di prenotazione Azur Menton.",
      seoTitle: "Condizioni di prenotazione",
      seoDescription: "Condizioni Azur Menton per richieste manuali, conferma scritta, pagamenti, cancellazione e regole.",
      sections: [
        {
          title: "Richiesta, conferma e condizioni principali",
          body: [
            "Il modulo invia solo una richiesta diretta. Non e una conferma immediata.",
            "La prenotazione e confermata solo dopo conferma scritta dell'host. Prezzi, disponibilita e condizioni sono confermati manualmente.",
            "TODO: definire pagamento, deposito, cancellazione, tassa di soggiorno, cauzione, orari, animali, bambini, reclami, mediatore se richiesto, legge applicabile e giurisdizione.",
            "Regole previste: non fumare, niente feste/eventi e rispetto dell'occupazione massima. Il parcheggio dipende dall'appartamento e dalla disponibilita.",
          ],
        },
      ],
    },
    uk: {
      title: "Booking Terms",
      description: "Terms for direct booking requests with Azur Menton.",
      seoTitle: "Booking Terms",
      seoDescription: "Azur Menton booking terms for manual requests, written confirmation, payments, cancellation and house rules.",
      sections: [
        {
          title: "Request, confirmation and key terms",
          body: [
            "The form sends a direct booking request only. It is not instant confirmation.",
            "A booking is confirmed only after written confirmation from the host. Prices, availability and conditions are confirmed manually.",
            "TODO: define payment, deposit, cancellation, tourist tax, security deposit, check-in/check-out, pets, children, complaints, mediator if required, governing law and jurisdiction.",
            "Expected rules: no smoking, no parties/events and respect for maximum occupancy. Parking depends on apartment and availability.",
          ],
        },
      ],
    },
  },
};
