---
title: "配置Nuxt3和@nuxtjs/i18n多语言模块，及容易出错的地方"
date: "2023-09-26 22:35"
tags: ["nuxt", "tool"]
---

这几天心痒痒用 Nuxt3.7 重构了博客，使用`@nuxtjs/i18n` v8 配置多语言功能。配置过程中遇到了一些坑，写点文字记录一下。

<!-- more -->

## 路由

我想要为已经有的路由增加对应其他语言的带有语言前缀的路由，例如增加语言`en`后，应该自动为首页注册路由`/en`。按照官方文档配置后，其他功能都正常，就是路由没增加。顺带提一下，Nuxt 默认内置了页内开发工具，可以查看注册了哪些路由，点击页面上漂浮的 Nuxt 图标或在网页内按组合键`Shift+Alt+D`打开。

折腾了几个小时后还是成功了，至于为什么要这么做，那就不知道了。在`nuxt.config.ts/js`中这样写：

```ts
i18n: {
  locales: ["en", "zh"], // used in URL path prefix
  defaultLocale: "en", // default locale of your project for Nuxt pages and routings
}
```

也就是说`locales`和`defaultLocale`要写在`nuxt.config`里，其他`@nuxtjs/i18n`的配置我写在了`i18n.config.ts`里。这样配置是可以正常工作的。之前我把`@nuxtjs/i18n`的配置全写在`i18n.config.ts`里，就出现了上面的问题，即没有增加其他语言的路由。

`@nuxtjs/i18n`有几种路由策略，这里使用的是默认策略。

## nuxt generate

这几天的`@nuxtjs/i18n`版本有 bug，当执行`nuxt generate`时会出错，安装最新版就好了。

```json
"@nuxtjs/i18n": "npm:@nuxtjs/i18n-edge"
```

## 链接组件

`@nuxtjs/i18n`提供了函数`useLocalePath`以翻译链接。但是每个使用到的地方都要引入一次太麻烦了。我就尝试写一个可以自动翻译链接的组件，写一半的时候发现它已经提供了，叫做`NuxtLinkLocale`。我想吐槽的是，这个组件在`useLocalePath`函数的页面没有提到，也不在左边栏的导航菜单里。
