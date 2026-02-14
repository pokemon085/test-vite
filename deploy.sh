#!/usr/bin/env sh

# 發生錯誤就停止
set -e

# 刪除舊 git
rm -rf dist/.git

# build
npm run build

# 進入 build 資料夾
cd dist

# 初始化 git
git init
git add -A
git commit -m 'deploy'

# 推到 gh-pages branch
git push -f https://github.com/pokemon085/test-vite.git master:gh-pages

# 回到專案根目錄
cd -
