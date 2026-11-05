import type { Place } from "./places";

const t = (en: string, fr: string, it: string, uk: string) => ({ en, fr, it, uk });
const guide = "the-french-riviera-a-history-michael-nelson";

export const nelsonPlaces: Place[] = [
  {
    id: "musee-terra-amata-nice",
    image: "/images/guide/musee-terra-amata-nice.png", name: "Musée de Préhistoire de Terra Amata", type: "museum",
    address: "25 boulevard Carnot, 06300 Nice", area: t("Nice", "Nice", "Nizza", "Ніцца"),
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Musee%20Terra%20Amata%2025%20boulevard%20Carnot%20Nice",
    programmeUrl: "https://www.nice.fr/lieux/musee-terra-amata/", sourceStatus: "editorial", requiresMapReview: true,
    imageAlt: t("Project illustration of Terra Amata museum; imagined open doors are not evidence of current opening or an exact facade record", "Illustration de Terra Amata ; portes ouvertes imaginées, sans preuve d'ouverture actuelle ni relevé exact de façade", "Illustrazione di Terra Amata; porte aperte immaginate, non prova di apertura attuale o rilievo esatto", "Ілюстрація Terra Amata; уявні відкриті двері не підтверджують нинішнього відкриття чи точного вигляду фасаду"),
    openingHoursLabel: t("Closed for works; reopening not confirmed", "Fermé pour travaux ; réouverture non confirmée", "Chiuso per lavori; riapertura non confermata", "Закрито на роботи; відкриття не підтверджено"),
    shortNote: t("Prehistory museum on its excavation site. Checked 5 November 2026: City of Nice still lists closure since 15 April and only an autumn reopening intention. Ordinary hours do not override that notice. Use Cimiez as an alternative.", "Musée sur son site de fouille. Vérifié le 5 novembre 2026 : fermeture depuis le 15 avril toujours publiée, intention d'ouverture à l'automne sans date. Les horaires ordinaires n'annulent pas l'alerte. Alternative : Cimiez.", "Museo sul sito di scavo. Verificato il 5 novembre 2026: ancora pubblicata chiusura dal 15 aprile, intenzione di riapertura autunnale senza data. Gli orari ordinari non annullano l'avviso. Alternativa: Cimiez.", "Музей на місці розкопок. Перевірено 5 листопада 2026: досі опубліковано закриття від 15 квітня, лише намір відкриття восени без дати. Звичайний розклад не скасовує повідомлення. Альтернатива: Cimiez."),
    bestFor: [t("Prehistory, after confirmed reopening", "Préhistoire, après réouverture confirmée", "Preistoria, dopo riapertura confermata", "Доісторія після підтвердженого відкриття")],
    relatedArticleIds: [guide, "museums-in-menton-nice-monaco"],
    visitRules: { conditions: [{ checkedOn: "2026-11-05", sourceUrl: "https://www.nice.fr/lieux/musee-terra-amata/", value: t("Closed for accessibility works; no confirmed reopening", "Fermé pour accessibilité ; aucune réouverture confirmée", "Chiuso per accessibilità; nessuna riapertura confermata", "Закрито для робіт з доступності; відкриття не підтверджено") }] },
  },
  {
    id: "musee-resistance-azureenne-nice",
    image: "/images/guide/musee-resistance-azureenne-nice.png", name: "Musée de la Résistance Azuréenne", type: "museum",
    address: "Le Phare, place des Mosaïques, 455 promenade des Anglais, 06000 Nice", area: t("Nice Arénas", "Nice Arénas", "Nizza Arénas", "Ніцца Arénas"),
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Musee%20Resistance%20Azureenne%20Le%20Phare%20Nice",
    programmeUrl: "https://cotedazurfrance.fr/offres/musee-de-la-resistance-azureenne-nice-fr-4199783/", sourceStatus: "editorial", requiresMapReview: true,
    imageAlt: t("Project illustration representing the Resistance museum at Le Phare; not a documentary photograph or proof of current visitor access", "Illustration du musée de la Résistance au Phare ; ni photo documentaire ni preuve d'accès actuel", "Illustrazione del museo della Resistenza a Le Phare; non foto documentaria o prova di accesso attuale", "Ілюстрація музею Опору в Le Phare; не документальне фото чи доказ нинішнього доступу"),
    openingHoursLabel: t("Listed November weekday afternoons 14–16:30, excluding 11 November; confirm", "Novembre : après-midi de semaine 14h–16h30, hors 11 novembre ; confirmer", "Novembre: pomeriggi feriali 14–16:30, escluso 11 novembre; conferma", "Листопад: будні 14:00–16:30, крім 11 листопада; уточніть"),
    shortNote: t("Resistance history near Parc Phoenix, not in the old town. Official tourism listing checked 5 November 2026; weekends closed in current November periods. Confirm reception for your date; no verified step-free assessment.", "Histoire de la Résistance près du parc Phoenix, pas dans le Vieux-Nice. Fiche touristique vérifiée le 5 novembre 2026 ; week-ends fermés dans les périodes actuelles. Confirmer l'accueil ; accès sans marches non évalué.", "Storia della Resistenza vicino a Parc Phoenix, non nel centro storico. Scheda turistica verificata il 5 novembre 2026; fine settimana chiusi nei periodi attuali. Conferma accoglienza; percorso senza gradini non valutato.", "Історія Опору біля Parc Phoenix, не в старому місті. Туристичну картку перевірено 5 листопада 2026; вихідні закриті в нинішні періоди. Уточнюйте прийом; доступ без сходів не оцінено."),
    bestFor: [t("Documented wartime history", "Histoire documentée de la guerre", "Storia documentata della guerra", "Документована воєнна історія")],
    relatedArticleIds: [guide, "museums-in-menton-nice-monaco"],
  },
];
