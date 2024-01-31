// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "nuxt-gtag",
    "@nuxtjs/sitemap",
    "nuxt-disqus",
  ],
  i18n: {
    locales: ["en", "zh"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
  },
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "solarized-light",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
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
  },
  // @ts-ignore
  disqus: {
    shortname: "hes-blog-1",
  },
  site: {
    url: "https://phphe.com",
  },
  runtimeConfig: {
    public: {},
  },
});
