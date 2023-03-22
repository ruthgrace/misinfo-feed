#!/bin/bash
BUILD="./build"

git submodule update

rm -rf "$BUILD" && mkdir -p "$BUILD" && pushd "$BUILD"

cp ../docker-node/19/bullseye/* .
docker build --no-cache -t node-misinfo .
popd
pushd app
docker build --no-cache -t misinfo-app .
popd
pushd backend
docker build --no-cache -t misinfo-backend .


