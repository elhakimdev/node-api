FROM alpine:latest as mysql
MAINTAINER WangXian <xian366@126.com>
# Environment variables for docker-compose command

# Building
ENV ALPINE_VERSION=latest
ENV IMAGE_NAME=local/wangxian/alpine-mysql

# Running
ENV CONTAINER_NAME=mysql
ENV MYSQL_USER=skyhis
ENV MYSQL_PASSWORD=skyhis
ENV MYSQL_ROOT_PASSWORD=skyhis
ENV MYSQL_DATABASE=skyhis_db

ENV HOST_ADDRESS=3306

WORKDIR /app
VOLUME /app

RUN apk add --update mysql mysql-client && rm -f /var/cache/apk/*

# These lines moved to the end allow us to rebuild image quickly after only these files were modified.
COPY mysql.sh /mysql.sh
COPY mysql.cnf /etc/mysql/mysql.cnf

EXPOSE 3306
RUN mysql.sh
# CMD ["/startup.sh"]

FROM node:alpine
ENV API_URL=localhost:3030
ENV APP_PORT=3030
ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3306
ENV MYSQL_USER=skyhis
ENV MYSQL_PASSWORD=skyhis
ENV MYSQL_ROOT_PASSWORD=skyhis
ENV MYSQL_DBNAME=skyhis_db
ENV DATABASE_URL=mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DBNAME}
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
# COPY package*.json ./
RUN npm install 
RUN npx prisma db push
RUN npm run build --prod
EXPOSE 3030
CMD ["node", "dist/index.js"]