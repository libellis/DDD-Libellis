FROM prismaphonic/node-typescript:12.1
# base image
#FROM node:12.1.0-alpine
#
#WORKDIR /app
#
#COPY application/package.json .
#COPY application/package-lock.json .
#
#RUN npm ci
#COPY application .
#
#ENV PATH /app/node_modules/.bin:$PATH
