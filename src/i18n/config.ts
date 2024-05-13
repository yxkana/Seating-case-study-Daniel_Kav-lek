import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import cz from "./cz/translation.json";

i18next.use(initReactI18next).init({
  lng: "en",
  debug: true,
  resources: {
    en: {
      en,
    },
    cz: {
      cz,
    },
  },
 
});
