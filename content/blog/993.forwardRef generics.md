---
title: "React component's generics lost when use fowardRef"
date: "2024-02-02 13:30"
tags: ["react", "typescript", "bug"]
---

React component's generics lost when use forwardRef method. It is a bug. Solution: Use the fixed fowardRef function type to override the original one.

```ts
import React from "react";

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;

const forwardRef = React.forwardRef as FixedForwardRef;
```
