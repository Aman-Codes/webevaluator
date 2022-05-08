FROM node:14.15.4-slim

WORKDIR /usr/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "npm", "start" ]