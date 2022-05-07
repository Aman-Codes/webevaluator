import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import yaml from "js-yaml";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: {
      "en-US": ["en"],
      "en-GB": ["en"],
      "en-UK": ["en"],
      default: ["en"],
    },
    debug: true,
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.yaml`,
      parse(data) {
        return yaml.load(data);
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
