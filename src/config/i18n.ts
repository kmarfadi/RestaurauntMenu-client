import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "../languages/ar.json";
import en from "../languages/en.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: "en", // or "en" as default
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;