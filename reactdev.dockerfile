FROM node:14-alpine AS builder
WORKDIR /app
COPY /frontend/package.json ./
COPY /frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY /frontend/ .
