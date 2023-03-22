FROM node-misinfo

ENV DEBCONF_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get -y install curl \
    certbot && \
    apt-get -y dist-upgrade

RUN mkdir -p /opt/app
COPY app.ts /opt/app/
COPY package.json /opt/app/
COPY tsconfig.json /opt/app/
WORKDIR /opt/app
RUN npm install
CMD [ "npx", "ts-node-esm", "app.ts" ]


