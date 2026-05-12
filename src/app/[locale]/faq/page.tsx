import {
  generateSimpleMetadata,
  SimpleContentPage,
} from "@/components/layout/SimpleContentPage";

export const generateMetadata = generateSimpleMetadata.bind(null, "faq");

export default SimpleContentPage("faq");
