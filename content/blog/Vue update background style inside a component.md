---
title: "Vue Update Background Style Inside a Component"
description: ""
date: "2021-06-24"
tags: ["vue", "frontend"]
---

First, create a element in template:

```html
<div v-html="'<style>'+styleText+'</style>'"></div>
```

Then change the value of `styleText`:

```js
styleText: `
body {
  background: #ffe4c4;
}
`.trim();
```

The style will update if the value of `styleText` changed. The style will also be removed after the component unmounted.
