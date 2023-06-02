#!/usr/bin/bash

docker stop misinfo-app-prod
docker rm misinfo-app-prod
docker --net=host run -e PRODUCTION=true --name misinfo-app-prod misinfo-app:latest
