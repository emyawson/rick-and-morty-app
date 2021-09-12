FROM node:14-alpine AS builder
WORKDIR /app
COPY /frontend/package.json ./
COPY /frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY /frontend/ .
RUN yarn build

FROM nginx:1.19-alpine AS server
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html