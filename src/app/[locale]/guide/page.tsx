import {
  generateSimpleMetadata,
  SimpleContentPage,
} from "@/components/layout/SimpleContentPage";

export const generateMetadata = generateSimpleMetadata.bind(null, "guide");

export default SimpleContentPage("guide");
