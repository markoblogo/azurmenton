import {
  generateLegalMetadata,
  LegalContentPage,
} from "@/components/layout/LegalContentPage";

export const generateMetadata = generateLegalMetadata.bind(null, "privacy");

export default LegalContentPage("privacy");
