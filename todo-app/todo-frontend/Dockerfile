FROM node:16 AS tests_stage
WORKDIR /usr/src/app
COPY . .
ENV REACT_APP_BACKEND_URL="http://localhost:8080/api"
RUN npm ci
RUN CI=true npm test

FROM node:16 AS build_stage
WORKDIR /usr/src/app
COPY --from=tests_stage /usr/src/app/ /usr/src/app/
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/
RUN npm run build

FROM nginx:1.20-alpine AS deploy_stage
COPY --from=build_stage /usr/src/app/build /usr/share/nginx/html
