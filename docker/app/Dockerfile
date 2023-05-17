FROM node-misinfo

ENV DEBCONF_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get -y install curl \
    certbot && \
    apt-get -y dist-upgrade

RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/public
RUN mkdir -p /opt/app/src
COPY public /opt/app/public
COPY src /opt/app/src
COPY package.json /opt/app/
COPY index.html /opt/app
COPY postcss.config.cjs /opt/app
COPY tailwind.config.cjs /opt/app
COPY tsconfig.json /opt/app
COPY tsconfig.node.json /opt/app
COPY vite.config.js /opt/app
WORKDIR /opt/app
RUN npm install
