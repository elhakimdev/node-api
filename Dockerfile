# FROM mysql:latest as base
# EXPOSE 3306
# RUN docker-entrypoint.sh /bin/true

# FROM node:alpine as nodejs
# ENV API_URL=172.17.0.1:3030
# ENV APP_PORT=3030
# ENV MYSQL_HOST=172.17.0.1
# ENV MYSQL_PORT=3306
# ENV MYSQL_USER=skyhis
# ENV MYSQL_PASSWORD=skyhis
# ENV MYSQL_ROOT_PASSWORD=skyhis
# ENV MYSQL_DBNAME=skyhis_db
# ENV DATABASE_URL=mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DBNAME}
# # RUN apk add --update mysql mysql-client && rm -f /var/cache/apk/*
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app 
# WORKDIR /home/node/app
# # VOLUME /home/node/app
# USER node
# # COPY mysql.sh /mysql.sh
# # COPY mysql.cnf /etc/mysql/mysql.cnf
# # COPY package*.json ./
# COPY --chown=node:node . .
# # RUN ls -lart
# # RUN chmod +x mysql.sh && chmod -R 777 .
# # RUN ls -lart
# # RUN ./mysql.sh
# RUN npm install 
# RUN npx prisma db push
# RUN npm run build --prod
# EXPOSE 3030
# CMD ["node", "dist/index.js"]

FROM ubuntu:latest
RUN apt update -y && apt upgrade -y 
RUN apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install nodejs
RUN node -v 
RUN npm -v
# RUN apt install -y mysql-server
# RUN mysql --version
ENV API_URL=localhost:3030
ENV APP_PORT=3030
ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3306
ENV MYSQL_USER=skyhis
ENV MYSQL_PASSWORD=skyhis
ENV MYSQL_ROOT_PASSWORD=skyhis
ENV MYSQL_DBNAME=skyhis_db
ENV DATABASE_URL=mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DBNAME}
RUN mkdir -p /home/node/app 
WORKDIR /home/node/app
COPY . .
# ADD bind_0.cnf /etc/mysql/conf.d/bind_0.cnf
RUN ls -lart
# RUN chmod +x mysql-startup.sh && chmod -R 777 .
# RUN lsof
# setup our entry point
RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf
ADD mysql-startup.sh /mysql-startup.sh
RUN chmod 755 /*.sh
# ENTRYPOINT ["/mysql-startup.sh"]
# RUN ./mysql-startup.sh
# RUN npm install 
# RUN npx prisma generate
# RUN npx prisma db push
# RUN npm run build --prod
EXPOSE 3030
# CMD ["node", "dist/index.js"]
CMD ["/bin/bash", "/mysql-startup.sh"]





