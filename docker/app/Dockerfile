FROM node-misinfo

ENV DEBCONF_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get -y install curl \
    certbot && \
    apt-get -y dist-upgrade

RUN mkdir -p /opt/app
COPY public /opt/app
COPY src /opt/app
