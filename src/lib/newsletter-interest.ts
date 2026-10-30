import type { Locale } from "@/i18n/locales";

export const newsletterConsentVersion="newsletter-interest-v1-2026-10-30";
export const newsletterConsent:Record<Locale,string>={
  en:"I agree that Azur Menton may keep my email and preferred language to register my interest in future editorial updates. No newsletter is being sent yet. I can withdraw this request at any time.",
  fr:"J'accepte qu'Azur Menton conserve mon email et ma langue pour enregistrer mon intérêt pour de futures sélections éditoriales. Aucune newsletter n'est envoyée pour le moment. Je peux retirer cette demande à tout moment.",
  it:"Acconsento alla conservazione della mia email e lingua da parte di Azur Menton per registrare l'interesse per futuri aggiornamenti editoriali. Non viene ancora inviata una newsletter. Posso ritirare la richiesta in qualsiasi momento.",
  uk:"Погоджуюся, щоб Azur Menton зберігав мій email і мову для реєстрації зацікавленості в майбутніх редакційних добірках. Розсилки поки немає. Я можу відкликати запит у будь-який час.",
};

export function validateNewsletterInterest(value:Record<string,unknown>){
  const email=typeof value.email==="string"?value.email.trim():"";
  const locale=value.locale as Locale;
  const action=value.action;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||!["en","fr","it","uk"].includes(locale)||!["subscribe","withdraw"].includes(action as string)||value.privacy!=="accepted"||value.consentVersion!==newsletterConsentVersion||(action==="subscribe"&&value.consent!=="accepted"))return null;
  return {type:"newsletter",name:"Newsletter interest",email,locale,action:String(action),consentVersion:newsletterConsentVersion,consentText:action==="subscribe"?newsletterConsent[locale]:"Request to withdraw newsletter interest. Manual handling required.",receivedAt:new Date().toISOString(),privacy:"accepted"};
}
