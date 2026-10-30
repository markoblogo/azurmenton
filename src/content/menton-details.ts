import type { Locale } from "@/i18n/locales";

type Text=Record<Locale,string>;
const t=(en:string,fr:string,it:string,uk:string):Text=>({en,fr,it,uk});
export const mentonDetails = [{
  id:"cocteau-wedding-room",
  placeId:"salle-des-mariages-jean-cocteau",
  guideSlug:"jean-cocteau-menton-walking-route",
  checkedOn:"2026-10-30",
  sourceUrl:"https://portail-savoirs.departement06.fr/annuaire-general/la-salle-des-mariages-de-lhotel-de-ville-de-menton-par-jean-cocteau",
  title:t("A wedding room designed as a whole work of art","Une salle des mariages conçue comme une œuvre totale","Una sala per matrimoni concepita come opera d'arte totale","Весільна зала як цілісний мистецький твір"),
  paragraphs:[
    t("Inside Menton's town hall, the interesting detail is not just a painting. The departmental arts resource describes the wedding room as a complete work conceived by Jean Cocteau, from the murals to the furniture. He worked on the decoration in 1957–1958. Look at how the room works together, rather than treating each wall as a separate picture.","À l'hôtel de ville de Menton, le détail intéressant n'est pas simplement une peinture. Le portail artistique du Département décrit la salle des mariages comme une œuvre totale conçue par Jean Cocteau, des fresques au mobilier. Il en réalise le décor en 1957–1958. Regardez leurs correspondances plutôt que chaque mur comme un tableau isolé.","Nel municipio di Mentone, il dettaglio interessante non è soltanto un dipinto. La risorsa artistica del Dipartimento descrive la sala dei matrimoni come un'opera totale concepita da Jean Cocteau, dagli affreschi agli arredi. La decorazione risale al 1957–1958. Osserva il rapporto tra gli elementi, non ogni parete come un quadro separato.","У мерії Ментона цікава деталь — не лише розпис. Мистецький портал департаменту описує весільну залу як цілісний твір Жана Кокто: від фресок до меблів. Він працював над декором у 1957–1958 роках. Придивіться до взаємозв'язку елементів, а не сприймайте кожну стіну як окрему картину."),
    t("This is a working municipal room, not a promise of unrestricted museum access. Check the current visiting arrangements before making it the centre of your day. The larger Cocteau walk connects it with the waterfront and the separate Bastion museum; the Wunderman museum remains an exterior-only stop.","C'est une salle municipale en activité, pas un musée garanti en accès libre. Vérifiez les modalités de visite avant d'organiser votre journée autour d'elle. La promenade Cocteau la relie au front de mer et au musée distinct du Bastion ; le musée Wunderman reste une étape extérieure uniquement.","È una sala comunale in uso, non un museo con accesso libero garantito. Verifica le modalità di visita prima di organizzare la giornata attorno ad essa. La passeggiata Cocteau la collega al lungomare e al distinto museo Bastion; il museo Wunderman rimane una tappa solo esterna.","Це діюча муніципальна зала, а не музей із гарантованим вільним доступом. Перевірте умови відвідування, перш ніж будувати навколо неї день. Прогулянка Кокто поєднує її з набережною та окремим музеєм Bastion; музей Wunderman залишається зупинкою лише для огляду зовні."),
  ],
}];
