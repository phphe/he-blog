#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 进入生成的文件夹
cd dist
# custom domain
echo "phphe.com" > CNAME

git init
git add -A
git commit -m 'deploy'
git commit -m 'rebuild pages' --allow-empty

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:phphe/he-blog.git master:gh-pages

rm -rf dist/.git
cd -