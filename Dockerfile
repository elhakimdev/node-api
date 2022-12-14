FROM node:alpine
ENV API_URL=localhost:3030
ENV APP_PORT=3030
ENV MYSQL_HOST=host.docker.internal
ENV MYSQL_PORT=3306
ENV MYSQL_USER=skyhis
ENV MYSQL_PASSWORD=skyhis
ENV MYSQL_ROOT_PASSWORD=skyhis
ENV MYSQL_DBNAME=skyhis_db
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app 
WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
RUN npm install 
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build --prod
RUN cp .env.example .env
RUN ls -lart | cat .env
EXPOSE 3030
CMD ["npm", "run", "app:start"]




