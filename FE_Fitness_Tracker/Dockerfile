FROM node:21-alpine as builder
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.25-bullseye
COPY --from=builder /app/dist/fe-fitness-tracker /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]