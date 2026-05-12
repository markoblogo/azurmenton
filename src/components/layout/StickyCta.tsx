import { Button } from "@/components/ui/Button";
import { routeLabels } from "@/content/navigation";
import type { Locale } from "@/i18n/locales";

export function StickyCta({ locale }: { locale: Locale }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d9cdbd] bg-[#fff9f0]/94 px-4 py-3 shadow-[0_-8px_24px_rgba(23,49,58,0.08)] backdrop-blur md:hidden">
      <Button href={`/${locale}/check-availability`}>{routeLabels[locale].availability}</Button>
    </div>
  );
}
