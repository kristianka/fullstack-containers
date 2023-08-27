FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci
EXPOSE 80
EXPOSE 3001
CMD npm run start