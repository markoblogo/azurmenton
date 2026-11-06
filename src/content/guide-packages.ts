import type { GuideArticle, LocalizedGuideSection, LocalizedText } from "@/content/guide";
import { formattedMarkdownGuideBody, markdownGuideSections, type GuideMarkdownRecord } from "@/lib/guide-markdown";
import data from "./guide-packages.generated.json";

type GuidePackage = {
  article: Omit<GuideArticle, "sections">;
  introHeading: LocalizedText;
  sectionOverrides: Partial<LocalizedGuideSection>[];
  collections: string[];
  records: GuideMarkdownRecord[];
};
export const guidePackages = data as GuidePackage[];
export const packagedGuides: GuideArticle[] = guidePackages.map(({ article, introHeading, sectionOverrides, records }) => {
  const sections = markdownGuideSections(records, introHeading);
  sections.forEach((section, index) => {
    section.body = [Object.fromEntries((["en", "fr", "it", "uk"] as const).map(locale => [locale, formattedMarkdownGuideBody(records[index][locale])])) as LocalizedText];
    section.formattedBody = true;
    section.officialLinks = undefined;
    Object.assign(section, sectionOverrides[index]);
  });
  return { ...article, sections };
});
