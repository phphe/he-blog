---
title: "Simple solution for vue3 meta"
description: "Use Teleport component to append meta elements into HTML head."
date: "2021-06-24"
tags: ["frontend", "vue"]
---

With it, you can set meta title, description, keywords, and author. Same life cycle as the component which it used in. Reset when the component `onUnmounted`. It can be used in the `setup` of the composition api, or in `created, mounted, and methods` in the traditional Vue component style.

## Installation

create `HTMLHead.tsx`

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

import `HTMLHead` component and append to your root component, such as `App.vue`

```vue
<template>
  <div id="app">
    <HTMLHead />
  </div>
</template>

<script>
import { HTMLHead } from "./HTMLHead.tsx";
export default {
  components: { HTMLHead },
};
</script>
```

## Usage

```ts
import {
  useTitle,
  useDescription,
  useKeywords,
  useAuthor,
} from "./HTMLHead.tsx";
```

In `setup`

```ts
setup() {
  useTitle('title text')
}
```

> :warning: The second argument is required if used in asynchronous setup or outside of setup.

In `created`, `mounted`, `methods`

```ts
created() {
  useTitle('title text', this)
}
```

After await in asynchronous setup

```ts
async setup() {
  const vm = getCurrentInstance()
  await something
  useTitle('title text', vm)
}
```

Please tell me if you have more elegant code.
