FROM node:alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
COPY package*.json ./
RUN npm install 
RUN npm run build
EXPOSE 3030

CMD [ "node", "dist/app.js" ]