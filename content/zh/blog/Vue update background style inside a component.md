---
title: "Vue 在组件内部更新 body 样式"
description: ""
date: "2021-06-24"
tags: ["vue", "frontend"]
---

首先, 在模板里创建一个新元素:

```html
<div v-html="'<style>'+styleText+'</style>'"></div>
```

然后设置`styleText`的值:

```js
styleText: `
body {
  background: #ffe4c4;
}
`.trim();
```

你可以动态修改 styleText 的值, 修改后样式会自动更新. 组件卸载后样式也会被移除.
