#!/usr/bin/env sh
# deploy to Github Page by push to gh-pages branch forcely
# 强行覆盖gh-pages分支以部署到Github Page

# Make sure the script throws errors encountered
# 确保脚本抛出遇到的错误
set -e

# Config
# Github Repository
repository="phphe/he-blog"
# Custom domain for GitHub Pages
custom_domain="phphe.com"

# Switch to the generated directory
cd .output/public

# Set custom domain for GitHub Pages
echo "$custom_domain" > CNAME

# Required to bypass Jekyll on GitHub Pages
echo "" > .nojekyll

git init -b main
git add -A
git commit -m "deploy $(date)"

# Push to GitHub Pages repository
git push -f git@github.com:$repository main:gh-pages

rm -rf .git
cd -