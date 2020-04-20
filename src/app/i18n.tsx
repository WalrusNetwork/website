import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en-US", // use en if detected lng is not available
    ns: ["commons", "homepage", "guides", "blog", "profiles", "staff"],
    defaultNS: "commons",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true,
      useSuspense: false,
    },
  });

export default i18n;
