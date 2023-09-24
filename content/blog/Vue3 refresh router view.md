---
title: "Vue3 Refresh Router View"
description: "Vue3 refresh router view component."
date: "2021-06-24"
tags: ["vue", "frontend"]
---

Add a key to router-view, then change the key, router-view will reload.

Create a variable with vue `ref`.

```ts
import { ref } from "vue";

export const routeViewKey = ref(Math.random().toString());
export const reloadRouteView = () => {
  routeViewKey.value = Math.random().toString();
};
```

Then use `routeViewKey` as the key of router-view.

```html
<router-view :key="routeViewKey"></router-view>
```

```ts
import { routeViewKey } from "yourpath";
export default {
  setup() {
    return { routeViewKey };
  },
};
```

## Usage

Call reloadRouteView
