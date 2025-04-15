const appName = "He's Blog";
const appDescription =
  "A blog about frontend development, JavaScript, Vue, React.";
const appUrl = "https://phphe.com";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/sitemap", // sitemap first
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "nuxt-gtag",
    "nuxt-disqus",
  ],

  i18n: {
    // vueI18n: "./i18n.config.ts",
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
      },
      {
        code: "zh",
        name: "简体中文",
        language: "zh-CN",
      },
    ], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    baseUrl: appUrl,
    // https://github.com/nuxt-modules/i18n/issues/3238#issuecomment-2672492536
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  content: {
    // https://content.nuxt.com/get-started/configuration#highlight
    // still need config 'pre' tag background color. I code it in layout file.
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "solarized-light",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
      langs: [
        // default, check https://content.nuxt.com/docs/getting-started/configuration#highlight
        "json",
        "js",
        "ts",
        "html",
        "css",
        "vue",
        "shell",
        "mdc",
        "md",
        "yaml",
        // custom
        "python",
        "tsx",
      ],
    },
  },

  colorMode: {
    classSuffix: "", // no suffix, so color mode class will be `dark` or `light` in html tag
  },

  googleFonts: {
    download: true,
    families: {
      Cairo: [400],
      "Open+Sans": [300, 400, 500, 600, 700],
    },
  },

  gtag: {
    id: "G-GG17SFDKPV",
    enabled: process.env.NODE_ENV === "production",
  },

  // @ts-ignore
  disqus: {
    shortname: "hes-blog-1",
  },

  site: {
    url: appUrl,
    name: appName,
  },

  runtimeConfig: {
    public: {
      appName,
      appDescription,
    },
  },

  compatibilityDate: "2025-01-04",
});
