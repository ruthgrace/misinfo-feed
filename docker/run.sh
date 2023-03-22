#!/bin/bash

docker run -d --net=host --restart=always --name misinfo-$1 misinfo-$1:latest

