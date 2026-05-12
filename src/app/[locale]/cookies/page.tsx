import {
  generateLegalMetadata,
  LegalContentPage,
} from "@/components/layout/LegalContentPage";

export const generateMetadata = generateLegalMetadata.bind(null, "cookies");

export default LegalContentPage("cookies");
