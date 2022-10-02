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
RUN apk add --update mysql mysql-client && rm -f /var/cache/apk/*
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app 
WORKDIR /home/node/app
USER node
# COPY mysql.sh /mysql.sh
# COPY mysql.cnf /etc/mysql/mysql.cnf
# COPY package*.json ./
COPY --chown=node:node . .
RUN ls -lart
RUN chmod +x mysql.sh
RUN ls -lart
RUN ./mysql.sh
RUN npm install 
RUN npx prisma db push
RUN npm run build --prod
EXPOSE 3306
EXPOSE 3030
CMD ["node", "dist/index.js"]