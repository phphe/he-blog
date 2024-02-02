---
title: "React使用fowardRef导致丢失组件泛型"
date: "2024-02-02 13:30"
tags: ["react", "typescript", "bug"]
---

React 中使用 fowardRef 包裹组件后，会丢失组件的泛型。这是个 bug。解决办法，使用修复的 fowardRef 函数类型覆盖原来的。

```ts
import React from "react";

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;

const forwardRef = React.forwardRef as FixedForwardRef;
```
