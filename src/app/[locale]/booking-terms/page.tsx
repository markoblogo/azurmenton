import {
  generateLegalMetadata,
  LegalContentPage,
} from "@/components/layout/LegalContentPage";

export const generateMetadata = generateLegalMetadata.bind(null, "booking-terms");

export default LegalContentPage("booking-terms");
