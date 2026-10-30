import type { Place, VerifiedVisitRule } from "@/content/places";
import type { Locale } from "@/i18n/locales";

export function hasVisitRuleSource<T>(rule: VerifiedVisitRule<T> | undefined): rule is VerifiedVisitRule<T> {
  if (!rule || !/^\d{4}-\d{2}-\d{2}$/.test(rule.checkedOn) || !Number.isFinite(Date.parse(rule.checkedOn)) || new Date(rule.checkedOn).toISOString().slice(0,10)!==rule.checkedOn) return false;
  try {const url=new URL(rule.sourceUrl); return url.protocol==="https:"&&!url.username&&!url.password;}catch{return false;}
}

export function placeMinimumAge(place: Pick<Place,"visitRules">): number | undefined {
  const rule=place.visitRules?.minimumAge;
  return hasVisitRuleSource(rule)&&Number.isInteger(rule.value)&&rule.value>=0&&rule.value<=99 ? rule.value : undefined;
}

export function placeVisitDetails(place: Pick<Place,"visitRules">,locale: Locale): VerifiedVisitRule<string>[] {
  const notes: VerifiedVisitRule<string>[]=[];
  const steps=place.visitRules?.steps;
  if(hasVisitRuleSource(steps)&&steps.value===true) notes.push({...steps,value:{en:"Includes stairs; check an alternative if needed.",fr:"Présence d'escaliers ; vérifiez une alternative si nécessaire.",it:"Sono presenti scale; verifica un'alternativa se necessario.",uk:"Є сходи; за потреби перевірте альтернативний шлях."}[locale]});
  const age=placeMinimumAge(place);
  if(age!==undefined) notes.push({...place.visitRules!.minimumAge!,value:age===0 ? {en:"General admission is open to all ages; separate activities may have their own conditions.",fr:"La visite générale est ouverte à tous les âges ; les activités peuvent avoir leurs propres conditions.",it:"La visita generale è aperta a tutte le età; le singole attività possono avere condizioni proprie.",uk:"Загальне відвідування доступне для будь-якого віку; окремі заняття можуть мати власні умови."}[locale] : {en:`Published minimum age: ${age}. Check the current conditions with the venue.`,fr:`Âge minimum publié : ${age} ans. Vérifiez les conditions actuelles auprès du lieu.`,it:`Età minima pubblicata: ${age} anni. Verifica le condizioni aggiornate con la sede.`,uk:`Оприлюднений мінімальний вік: ${age}. Уточніть поточні умови в закладі.`}[locale]});
  for (const condition of place.visitRules?.conditions ?? []) {
    if (hasVisitRuleSource(condition) && typeof condition.value?.[locale] === "string" && condition.value[locale].trim()) notes.push({...condition,value:condition.value[locale]});
  }
  return notes;
}

export function placeVisitNotes(place: Pick<Place,"visitRules">,locale: Locale): string[] {
  return placeVisitDetails(place,locale).map(note=>note.value);
}
