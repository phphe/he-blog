---
title: "npm library type module and exports"
date: "2024-01-31 23:09"
tags: ["npm", "library", "frontend"]
---

The fields of package.json for npm library.

<!-- more -->

## main & module

Previously, we used "main" and "module". "main" refers to the main entry point, usually in cjs format. "module" refers to the esm entry point. Note that only bundling tools like webpack and rollup support "module", while Node.js only supports "main". If you directly run the node command like `node your.js`, and your js file imports a library, Node.js will only call the file corresponding to the library's "main" field.

## exports

"exports" can export multiple entry points.

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

"." represents the main entry point, which is the "main" and "module" mentioned above. The "import" field in the child level refers to the esm file, the "require" field refers to the cjs file, and the "types" field refers to the type definition file.

Unfortunately, "exports" is supported by Node.js and major bundling tools, but not by the current stable version of TypeScript (4.5). TypeScript 4.7 already supports it, but the built-in version of vscode is 4.5. So when using vscode, the type definition files in "exports" cannot be found.

Therefore, if your library has multiple entry points and each entry point has its own type definition file, I suggest you not to do it this way, but to publish them as different npm libraries.

## Example package.json

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

Because we used `"type": "module"`, the exported cjs file has the 'cjs' extension.
