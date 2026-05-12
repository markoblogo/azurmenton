import {
  generateSimpleMetadata,
  SimpleContentPage,
} from "@/components/layout/SimpleContentPage";

export const generateMetadata = generateSimpleMetadata.bind(null, "privacy");

export default SimpleContentPage("privacy");
