FROM node:8.2.1-alpine

RUN apk add --update --no-cache protobuf-dev python make g++ krb5-dev curl bind-tools

ENV APP_DIR=/opt/app_api

# NPM package cache
COPY package.json /tmp/package.json
RUN \
    cd /tmp && \
    npm install --quiet --production

RUN \
  mkdir -p ${APP_DIR} && \
  mkdir ${APP_DIR}/log && \
  cp -a /tmp/node_modules/ ${APP_DIR}

# Application setup
COPY index.js ${APP_DIR}/index.js

WORKDIR ${APP_DIR}
CMD ["node", "."]
