#!/usr/bin/bash

docker stop misinfo-app-prod
docker rm misinfo-app-prod
docker run -e --net=host PRODUCTION=true --name misinfo-app-prod misinfo-app:latest
