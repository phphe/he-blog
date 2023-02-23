import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
  defaultLangCode: "zh",
  supportedLangCodes: ["en"],
  showDefaultLangCode: false,
  translations: {
    zh: {
      Home: "首页",
      Works: "作品",
      About: "关于",
    },
    en: {
      Home: "Home",
      Works: "Works",
      About: "About",
    },
  },
  routeTranslations: {},
});
