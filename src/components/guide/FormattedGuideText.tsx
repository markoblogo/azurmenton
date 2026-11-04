import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";

export function formattedGuideText(text: string, locale: Locale) {
  const tokens = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|_([^_]+)_)/g;
  return text.split(tokens).reduce<ReactNode[]>((out, part, index, parts) => {
    if (index % 6 === 0) { if (part) out.push(part); return out; }
    if (index % 6 !== 1 || !part) return out;
    const label = parts[index + 1];
    const url = parts[index + 2];
    if (label && url) {
      const href = url.replace(/^https:\/\/azurmenton\.com\/(?:en|fr|it|uk)(?=\/|$)/, `/${locale}`);
      out.push(<a key={index} href={href} className="underline underline-offset-4 hover:text-[#173f36]" {...(href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>);
    } else if (parts[index + 3]) out.push(<strong key={index} className="font-semibold text-[#173f36]">{parts[index + 3]}</strong>);
    else if (parts[index + 4]) out.push(<em key={index}>{parts[index + 4]}</em>);
    return out;
  }, []);
}
