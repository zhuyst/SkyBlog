FROM node:10.15.1-alpine AS build

ADD . .

VOLUME ./node_modules

RUN npm run build

FROM nginx:1.15.8-alpine

RUN rm /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx/conf.d/

COPY --from=build build/ /usr/share/nginx/html/

EXPOSE 9000
