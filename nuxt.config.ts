// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  content: {
    highlight: {
      // OR
      theme: {
        // Default theme (same as single string)
        default: "solarized-light",
        // Theme used if `html.dark`
        dark: "solarized-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
  },
});
