import type { Locale } from "@/i18n/locales";
import type { GuideUtilityBlock } from "@/content/guide";
import { AirportLiveBoard } from "./AirportLiveBoard";
import { LocalRadioBlock } from "./LocalRadioBlock";

export function UtilityBlockRenderer({ blocks, locale }: { blocks: GuideUtilityBlock[]; locale: Locale }) {
  if (!blocks.length) return null;

  return (
    <div className="grid gap-4">
      {blocks.map((block) => {
        if (block.type === "localRadio") {
          return <LocalRadioBlock key={`${block.type}-${block.region}-${block.stationIds?.join(",") ?? "all"}`} block={block} locale={locale} />;
        }

        if (block.type === "airportLiveBoard") {
          return <AirportLiveBoard key={`${block.type}-${block.airportIds?.join(",") ?? "all"}`} block={block} locale={locale} />;
        }

        return null;
      })}
    </div>
  );
}
