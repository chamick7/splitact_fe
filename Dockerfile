FROM node:13.3.0-alpine

WORKDIR /app
COPY . .


RUN npm install
RUN npm run build


CMD [ "npm","run","start" ]