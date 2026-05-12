import {
  generateSimpleMetadata,
  SimpleContentPage,
} from "@/components/layout/SimpleContentPage";

export const generateMetadata = generateSimpleMetadata.bind(null, "contact");

export default SimpleContentPage("contact");
