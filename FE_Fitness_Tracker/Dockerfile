FROM nginx:1.25-bullseye
WORKDIR FE_Fitness_Tracker
COPY /dist/fe-fitness-tracker /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]