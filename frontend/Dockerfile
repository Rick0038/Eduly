#React app image
FROM node:lts-alpine as build

ENV APP_API_URL http://20.224.153.213:8080

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# nginx config
FROM nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
