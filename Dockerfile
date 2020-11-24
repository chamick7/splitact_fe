FROM node:14.14.0-alpine

WORKDIR /app
ENV TERM xterm


COPY . .
RUN npm install




CMD [ "npm","run","production" ]