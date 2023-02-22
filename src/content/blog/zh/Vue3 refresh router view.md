---
title: "Vue3 刷新 Router View"
description: "Vue3重新加载路由视图组件。"
date: "2021-06-24"
tags: ["frontend", "vue"]
---

给 router-view 添加 key, 改变 key 时 router-view 将会创建刷新.

使用 Vue `ref`创建变量.

```ts
import { ref } from "vue";

export const routeViewKey = ref(Math.random().toString());
export const reloadRouteView = () => {
  routeViewKey.value = Math.random().toString();
};
```

将`routeViewKey`作为 router-view 的 key.

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

## 使用

调用`reloadRouteView`即可.
