---
title: "Lerna 5/6 配置对话式更新日志（Conventional Changelog）"
description: "配置lerna，并增加对话式更新日志（Conventional Changelog）。"
date: "2023-03-02 01:09"
tags: ["lerna", "tool"]
---

之前，我使用[cz-lerna-changelog](https://github.com/atlassian/cz-lerna-changelog)。问题是这个库很久不更新了，而且仅适用于 lerna 3 及更早版本。所以我创建了[cz-conventional-changelog-lerna](https://github.com/phphe/cz-conventional-changelog-lerna)。它适用于 lerna 5 及以后的版本。

## 使用示例

项目根目录下的 package.json

```json
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*"],
  "devDependencies": {
    "commitizen": "^4.1.2",
    "cz-conventional-changelog-lerna": "^0.1.0",
    "lerna": "^5.0.0"
  },
  "scripts": {
    "commit": "cz",
    "commit-all": "git add . && cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog-lerna"
    }
  }
}
```

lerna.json

```json
{
  "packages": ["packages/*"],
  "command": {
    "version": {
      "conventionalCommits": true
    }
  },
  "version": "independent"
}
```

提交 git commit 时，首先添加更改到缓冲区（git add），然后执行`npm run commit`，根据提示填写信息并完成提交。

执行`lerna version`或`lerna publish`时会在 package 目录自动生成`CHANGELOG.md`. 可以参考我的项目: [he-tree: Vue 可拖拽树组件](https://github.com/phphe/he-tree).
