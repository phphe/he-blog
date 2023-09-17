#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 进入生成的文件夹
cd dist
# custom domain
echo "phphe.com" > CNAME
# adsense
echo "google.com, pub-5757487942993573, DIRECT, f08c47fec0942fa0" > "ads.txt"
# required. Or file or directory which starts with underscore can't be found. https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/
echo "" > .nojekyll

git init -b master
git add -A
git commit -m 'deploy'
git commit -m 'rebuild pages' --allow-empty

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:phphe/he-blog.git master:gh-pages

rm -rf .git
cd -