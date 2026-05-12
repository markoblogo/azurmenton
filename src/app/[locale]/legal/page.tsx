import {
  generateSimpleMetadata,
  SimpleContentPage,
} from "@/components/layout/SimpleContentPage";

export const generateMetadata = generateSimpleMetadata.bind(null, "legal");

export default SimpleContentPage("legal");
