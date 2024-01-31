---
title: "npm库多个导出点以及type module和typescript类型定义文件"
date: "2024-01-31 23:09"
tags: ["npm", "library", "frontend"]
---

详解开发 npm 库时，package.json 里的相关字段。

<!-- more -->

## main & module

以前使用 main 和 module。main 指向主要入口, 一般是 cjs 格式的。module 指向 esm 入口。注意，仅 webpack 和 rollup 等打包工具支持 module，而 nodejs 仅支持 main. 如果你直接执行 node 命令如`node your.js`，你的 js 文件引入了库，node 将只会调用库的 main 字段对应的文件。

## exports

exports 可以导出多个入口。

```json
{
  "exports": {
    ".": {
      "import": "./src/main-esm.js",
      "require": "./src/main-cjs.js",
      "types": "./src/main.d.ts"
    },
    "./module-a": {
      "import": "./src/module-a-esm.js",
      "require": "./src/module-a-cjs.js",
      "types": "./src/module-a.d.ts"
    }
  }
}
```

"."代表主要入口，即上面的 main & module。子级的"import"是 esm 文件, "require"是 cjs 文件。"types"是类型定义文件。

遗憾的是，"exports"被 nodejs 和主要打包工具支持，却不被当前稳定版本的 typescript(4.5)支持。typescript4.7 已经支持了，但是 vscode 内置的是 4.5. 所以使用 vscode 时会找不到"exports"里的类型定义文件。

所以如果你的库有多个入口并且每个入口都有自己的类型定义文件，我建议你不要这样做，而是发布为不同的 npm 库。

## package.json 例子

```json
{
  "type": "module",
  "main": "./src/index.cjs",
  "module": "./src/index.js",
  "types": "./src/index.d.ts",
  "exports": {
    ".": {
      "require": "./src/index.cjs",
      "import": "./src/index.js",
      "types": "./src/index.d.ts"
    }
  }
}
```

因为使用了`"type": "module"`, 所以导出的 cjs 文件用'cjs'扩展名。
