---
title: "Configuring Nuxt3 and @nuxtjs/i18n v8 Multilingual Module, and Common Pitfalls"
date: "2023-09-26 22:35"
tags: ["nuxt", "tool"]
---

These days, I have been itching to refactor my blog using Nuxt3.7 and configure multi-language functionality using `@nuxtjs/i18n` v8. During the configuration process, I encountered some challenges, so I decided to write down some notes.

<!-- more -->

## Routing

I wanted to add language-prefixed routes for the existing routes. For example, after adding the language `en`, the home page should automatically register the route `/en`. After configuring according to the official documentation, everything else was working fine except for the routes. By the way, Nuxt comes with a built-in in-browser development tool that allows you to view the registered routes. You can click on the floating Nuxt icon on the page or press the `Shift+Alt+D` key combination to open it.

After a few hours of tinkering, I finally succeeded. As for why I had to do it this way, I have no idea. Here's how I wrote it in `nuxt.config.ts/js`:

```ts
i18n: {
  locales: ["en", "zh"], // used in URL path prefix
  defaultLocale: "en", // default locale of your project for Nuxt pages and routings
}
```

This means that `locales` and `defaultLocale` should be written in `nuxt.config`, while the rest of the `@nuxtjs/i18n` configuration is written in `i18n.config.ts`. This configuration works fine. Previously, I had all the `@nuxtjs/i18n` configuration written in `i18n.config.ts`, which caused the issue of not adding routes for other languages.

`@nuxtjs/i18n` has several routing strategies, and I am using the default strategy here.

## nuxt generate

There was a bug in the `@nuxtjs/i18n` version I used these days. When running `nuxt generate`, an error occurred. Installing the latest version fixed the issue.

```json
"@nuxtjs/i18n": "npm:@nuxtjs/i18n-edge"

```

## Link Component

`@nuxtjs/i18n` provides the `useLocalePath` function for translating links. However, it was cumbersome to import it every time it was used. So, I tried to write a component that could automatically translate links. But halfway through, I discovered that it already exists and is called `NuxtLinkLocale`. I must say, this component is not mentioned on the page where the `useLocalePath` function is documented, nor is it included in the navigation menu on the left sidebar.
