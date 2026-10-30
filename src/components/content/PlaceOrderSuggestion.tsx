"use client";
import { useState } from "react";
import { Check, Undo2, WandSparkles } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { PlaceDay, PlanPlace } from "@/lib/trip-place-days";
import { canSuggestPlaceOrder, suggestPlaceOrder } from "@/lib/trip-order";

const copy={
  en:{suggest:"Suggest nearby order",apply:"Apply this order",undo:"Undo suggested order",none:"No shorter nearby order found.",error:"Could not apply. The plan may have changed; review it before trying again.",note:"Keeps the first stop. Uses straight-line proximity, not streets, opening hours or accessible paths. Review every leg in Maps before following it.",preview:"Suggested order — not saved yet"},
  fr:{suggest:"Proposer un ordre par proximité",apply:"Appliquer cet ordre",undo:"Annuler l'ordre proposé",none:"Aucun ordre de proximité plus court trouvé.",error:"Application impossible. Le programme a peut-être changé ; vérifiez-le.",note:"Conserve la première étape. Utilise la proximité à vol d'oiseau, pas les rues, horaires ou accès sans marches. Vérifiez chaque trajet dans Maps.",preview:"Ordre proposé — pas encore enregistré"},
  it:{suggest:"Proponi ordine per vicinanza",apply:"Applica questo ordine",undo:"Annulla l'ordine proposto",none:"Nessun ordine per vicinanza più breve trovato.",error:"Impossibile applicare. Il programma potrebbe essere cambiato: controllalo.",note:"Mantiene la prima tappa. Usa la vicinanza in linea d'aria, non strade, orari o percorsi accessibili. Verifica ogni tratto in Maps.",preview:"Ordine proposto — non ancora salvato"},
  uk:{suggest:"Запропонувати порядок за близькістю",apply:"Застосувати цей порядок",undo:"Скасувати запропонований порядок",none:"Коротшого порядку за близькістю не знайдено.",error:"Не вдалося застосувати. План міг змінитися; перегляньте його.",note:"Перша зупинка не змінюється. Враховується відстань по прямій, а не вулиці, години чи безбар'єрність. Перевірте кожну ділянку в Maps.",preview:"Запропонований порядок — ще не збережено"},
};

export function PlaceOrderSuggestion({day,places,locale,apply}:{day:PlaceDay;places:PlanPlace[];locale:Locale;apply:(before:string[],after:string[])=>boolean}){
  const [preview,setPreview]=useState<{before:string[];after:string[]}|null>(null);
  const [undo,setUndo]=useState<{before:string[];after:string[]}|null>(null);
  const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");const c=copy[locale];
  if(!canSuggestPlaceOrder(day,places))return null;
  async function suggest(){
    setBusy(true);setMessage("");setPreview(null);
    try{
      const L=await import("leaflet");
      const points=new Map(day.placeIds.map(id=>{const [lat,lng]=places.find(place=>place.id===id)!.point!.split(",").map(Number);return [id,L.latLng(lat,lng)] as const;}));
      const before=[...day.placeIds];const after=suggestPlaceOrder(before,(a,b)=>points.get(a)!.distanceTo(points.get(b)!));
      if(after)setPreview({before,after});else setMessage(c.none);
    }catch{setMessage(c.error);}finally{setBusy(false);}
  }
  const buttonClass="inline-flex min-h-11 items-center gap-2 border border-[#9bb7b5] px-3 py-2 font-semibold text-[#155b6c] disabled:opacity-50";
  return <div className="space-y-3" data-place-order-suggestion><button type="button" disabled={busy} className={buttonClass} onClick={suggest}><WandSparkles aria-hidden="true" className="size-5 shrink-0" />{c.suggest}</button><p className="text-[#586660]">{c.note}</p>{preview?<div className="border-l-2 border-[#358392] pl-3"><h4 className="font-semibold">{c.preview}</h4><ol className="my-3 list-inside list-decimal">{preview.after.map(id=><li key={id}>{places.find(place=>place.id===id)?.title}</li>)}</ol><button type="button" className={buttonClass} onClick={()=>{if(apply(preview.before,preview.after)){setUndo(preview);setPreview(null);setMessage("");}else setMessage(c.error);}}><Check aria-hidden="true" className="size-5" />{c.apply}</button></div>:null}{undo?<button type="button" className={buttonClass} onClick={()=>{if(apply(undo.after,undo.before)){setUndo(null);setPreview(null);setMessage("");}else setMessage(c.error);}}><Undo2 aria-hidden="true" className="size-5" />{c.undo}</button>:null}<p role="status">{message}</p></div>;
}
