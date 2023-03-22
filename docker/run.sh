#!/bin/bash
docker rm -f misinfo-$1
docker run -d --net=host --restart=always --name misinfo-$1 misinfo-$1:latest

