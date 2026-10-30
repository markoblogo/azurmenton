import type { RivieraEvent } from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";

export function weeklyEventDateLabel(event:Pick<RivieraEvent,"startDate"|"endDate"|"schedule">,locale:Locale){
  if(!event.startDate)return "";
  const formatter=new Intl.DateTimeFormat(locale==="uk"?"uk-UA":locale,{timeZone:"Europe/Paris",day:"numeric",month:"long",year:"numeric"});
  const format=(date:string)=>formatter.format(new Date(`${date}T12:00:00Z`));
  const dates=event.endDate&&event.endDate!==event.startDate?`${format(event.startDate)} – ${format(event.endDate)}`:format(event.startDate);
  return event.schedule?.startTime?`${dates} · ${event.schedule.startTime} (Europe/Paris)`:dates;
}
