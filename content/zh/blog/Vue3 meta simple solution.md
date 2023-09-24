---
title: "一个文件搞定vue3 meta"
description: "使用Teleport添加元素到HTML head标签内."
date: "2021-06-24"
tags: ["vue", "frontend"]
---

可以设置 meta title, description, keywords, author. 与组件同生命周期, 组件卸载时还原. 可以在 composition api 的 setup 里使用, 也可以再 Vue 传统组件写法里的 created, mounted, methods 里使用.

## 安装

创建`HTMLHead.tsx`

```tsx
import {
  reactive,
  onBeforeUnmount,
  Teleport,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";

const store = reactive({
  title: "",
  description: "",
  keywords: "",
  author: "",
});

// try to remove existing elements
try {
  for (const sel of [
    "title",
    'meta[name="description"]',
    'meta[name="keywords"]',
    'meta[name="author"]',
  ]) {
    const el = document.head.querySelector(sel);
    if (el) {
      el.remove();
    }
  }
} catch (error) {}

export function HTMLHead() {
  return (
    <Teleport to="head">
      {store.title && <title>{store.title}</title>}
      {store.description && (
        <meta name="description" content={store.description} />
      )}
      {store.keywords && <meta name="keywords" content={store.keywords} />}
      {store.author && <meta name="author" content={store.author} />}
    </Teleport>
  );
}

export const useTitle = generateUseFunction("title");
export const useDescription = generateUseFunction("description");
export const useKeywords = generateUseFunction("keywords");
export const useAuthor = generateUseFunction("author");

function generateUseFunction(name: string) {
  return (value: string, vm?: ComponentInternalInstance) => {
    // @ts-ignore
    store[name] = value;
    const thevm = vm || getCurrentInstance();
    if (!thevm) {
      throw new Error(
        `HTMLHead use ${name}: the second argument is required when called outside of setup`
      );
    }
    onBeforeUnmount(() => {
      // @ts-ignore
      if (store[name] === value) {
        // @ts-ignore
        store[name] = "";
      }
    }, thevm);
  };
}
```

引入 HTMLHead 组件并附加到根组件中, 如`App.vue`

```vue
<template>
  <div id="app">
    <HTMLHead />
  </div>
</template>

<script>
import { HTMLHead } from "./HTMLHead.tsx";
export default {
  components: {},
};
</script>
```

## 使用

```ts
import {
  useTitle,
  useDescription,
  useKeywords,
  useAuthor,
} from "./HTMLHead.tsx";
```

在 setup 中使用

```ts
setup() {
  useTitle('title text')
}
```

> :warning: 在异步 setup 及 setup 以外使用需要第二个参数.

在`created`, `mounted`, `methods` 中使用

```ts
created() {
  useTitle('title text', this)
}
```

在 异步 setup 的 await 之后使用

```ts
async setup() {
  const vm = getCurrentInstance()
  await something
  useTitle('title text', vm)
}
```

如果你有更好的写法, 请告诉我.
