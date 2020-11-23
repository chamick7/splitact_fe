FROM node:14.14.0-alpine

WORKDIR /app



COPY . .
RUN npm install




CMD [ "npm","run","production" ]