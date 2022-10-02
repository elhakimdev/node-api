FROM node:alpine
ENV API_URL
ENV APP_PORT 3030
ENV MYSQL_HOST 
ENV MYSQL_PORT 
ENV MYSQL_USER 
ENV MYSQL_PASSWORD 
ENV MYSQL_ROOT_PASSWORD 
ENV MYSQL_DBNAME
ENV DATABASE_URL mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DBNAME}
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
# COPY package*.json ./
RUN npm install 
RUN npm run build
EXPOSE 3030

CMD [ "node", "dist/app.js" ]