# Odd numbered Node.js versions will not enter LTS status
# and should not be used for production.
# @see https://nodejs.org/en/about/releases
# @see https://hub.docker.com/_/node/tags?name=alpine
FROM node:18.13-alpine AS app_node

# Avoid "Error: Cannot find module '/usr/src/app/bash'" after `docker-compose up`
# Alpine images doesn't have bash installed out of box. You need to install it separately.
# @see https://stackoverflow.com/questions/63666064/docker-cannot-find-module-bin-bash
RUN apk update && apk add bash

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install global Angular CLI
# @see https://stackoverflow.com/questions/44525746/global-angular-cli-version-greater-than-local-version
# @see https://www.npmjs.com/package/@angular/cli
RUN npm install -g @angular/cli@^15.1.1

COPY . .

USER 1000

