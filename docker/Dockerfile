FROM debian:bullseye

ENV DEBCONF_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get -y install git \
    build-essential \
    curl \
    certbot && \
    apt-get -y dist-upgrade

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get -y update && \
  apt-get -y install nodejs npm && \
  apt-get clean && \
  apt-get autoremove

