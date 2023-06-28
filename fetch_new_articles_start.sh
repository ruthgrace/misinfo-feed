#!/usr/bin/bash

docker stop misinfo-fetch-new-articles
docker rm misinfo-fetch-new-articles
docker run --net=host --name misinfo-fetch-new-articles misinfo-fetch-new-articles:production
