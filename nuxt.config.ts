// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
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
  app: {
    head: {
      // preload fonts
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400&family=Open+Sans:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
});
