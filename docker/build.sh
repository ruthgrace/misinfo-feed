#!/bin/bash
set -e

BUILD="$(pwd)/build"
APP="app"
BACKEND="backend"

git submodule update --init

rm -rf "$BUILD" && mkdir -p "$BUILD" "$BUILD/$APP" "$BUILD/$BACKEND" && cd "$BUILD"

cp ../docker-node/19/bullseye/* .

docker build -t node-misinfo .

cp -a ../../public "$BUILD/$APP"
cp -a ../../src "$BUILD/$APP"
cp -a ../../backend/app.ts "$BUILD/$BACKEND"
cp -a ../../package.json "$BUILD/$BACKEND"
cp -a ../../tsconfig.json "$BUILD/$BACKEND"
cp -a ../app/Dockerfile app
cp -a ../backend/Dockerfile backend

# docker build --no-cache -t misinfo-app app
# docker build --no-cache -t misinfo-backend backend
docker build --no-cache -t misinfo-fetch-new-articles fetch-new-articles
