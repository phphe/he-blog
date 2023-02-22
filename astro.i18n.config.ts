import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
  defaultLangCode: "zh",
  supportedLangCodes: ["zh", "en"],
  showDefaultLangCode: false,
  translations: {},
  routeTranslations: {
    en: {
      // about: "about-en",
    },
  },
});
