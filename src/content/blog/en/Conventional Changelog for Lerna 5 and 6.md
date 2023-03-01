---
title: "Conventional Changelog for Lerna 5 and 6"
description: "Config lerna with conventional changelog."
date: "2023-03-02 01:09"
tags: ["tool", "lerna"]
---

Previously, I used [cz-lerna-changelog](https://github.com/atlassian/cz-lerna-changelog). The problem was that the library hasn't been updated for a long time, and it only works for Lerna 3 and earlier versions. So I created [cz-conventional-changelog-lerna](https://github.com/phphe/cz-conventional-changelog-lerna). It works for Lerna 5 and later versions.

## Usage

In the project root directory package.json:

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

lerna.json:

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

When submitting a git commit, first add changes to the buffer (git add), then execute `npm run commit`, fill in the information according to the prompts and complete the submission.

When executing `lerna version` or `lerna publish`, `CHANGELOG.md` will be automatically generated in each package directory. You can refer to my project: [he-tree: Vue draggable tree component](https://github.com/phphe/he-tree).
