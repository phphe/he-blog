const appName = "He's Blog";
const appDescription =
  "A blog about frontend development, JavaScript, Vue, React.";

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
    vueI18n: "./i18n.config.ts",
    locales: ["en", "zh"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
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
    url: "https://phphe.com",
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
