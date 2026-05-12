import {
  generateLegalMetadata,
  LegalContentPage,
} from "@/components/layout/LegalContentPage";

export const generateMetadata = generateLegalMetadata.bind(null, "legal");

export default LegalContentPage("legal");
