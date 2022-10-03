FROM mysql:latest
ENV API_URL=host.docker.internal:3030
ENV APP_PORT=3030
ENV MYSQL_HOST=host.docker.internal
ENV MYSQL_PORT=3306
ENV MYSQL_USER=skyhis
ENV MYSQL_PASSWORD=skyhis
ENV MYSQL_ROOT_PASSWORD=skyhis
ENV MYSQL_DBNAME=skyhis_db
EXPOSE 3306 33060
# CMD ["mysqld"]
# # install node js
FROM node:alpine as nodejs
ENV API_URL=host.docker.internal:3030
ENV APP_PORT=3030
ENV MYSQL_HOST=host.docker.internal
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
RUN npm install 
# RUN npm run build --prod
# RUn npx prisma generate
# RUN npx prisma db push
EXPOSE 3306 33060
EXPOSE 3030
# CMD ["node", "dist/index.js"]
CMD echo mysqld; echo npm run build --prod; echo npx prisma generate; echo npx prisma db push; echo node dist/index.js;




