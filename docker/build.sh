#!/bin/bash
set -e

custom_tag=""

if [ "$#" -ge 1 ]; then
  echo "Building containers with custom tag: $1"
  custom_tag=$1
fi

BUILD="$(pwd)/build"
APP="app"
BACKEND="backend"

git submodule update --init

rm -rf "$BUILD" && mkdir -p "$BUILD" "$BUILD/$APP" "$BUILD/$BACKEND" && cd "$BUILD"

cp ../docker-node/19/bullseye/* .

docker build -t node-misinfo .

cp -a ../../public "$BUILD/$APP/public"
cp -a ../../src "$BUILD/$APP/src"
cp -a ../../package.json "$BUILD/$APP"
cp -a ../../index.html "$BUILD/$APP"
cp -a ../../postcss.config.cjs "$BUILD/$APP"
cp -a ../../tailwind.config.cjs "$BUILD/$APP"
cp -a ../../tsconfig.json "$BUILD/$APP"
cp -a ../../tsconfig.node.json "$BUILD/$APP"
cp -a ../../vite.config.js "$BUILD/$APP"
cp -a ../../misinfo_trends_prod_nginx.conf "$BUILD/$APP"
cp -a ../../misinfo_trends_dev_nginx.conf "$BUILD/$APP"
cp -a ../../run_frontend.sh "$BUILD/$APP"

cp -a ../../backend/app.ts "$BUILD/$BACKEND"
cp -a ../../package.json "$BUILD/$BACKEND"
cp -a ../../tsconfig.json "$BUILD/$BACKEND"
cp -a ../app/Dockerfile app
cp -a ../backend/Dockerfile backend
cp -a ../fetch-new-articles "$BUILD/"

docker build --no-cache -t misinfo-app app
# docker build --no-cache -t misinfo-backend backend
if [ -z "$custom_tag" ]; then
  docker build -t misinfo-fetch-new-articles fetch-new-articles
else
  docker build -t misinfo-fetch-new-articles:$custom_tag fetch-new-articles
fi
