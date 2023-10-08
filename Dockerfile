FROM node:16-alpine AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
# RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx/conf 
# COPY ./nginx.xconf /etc/nginx/nginx.conf
COPY --from=build /app/dist/employee-management/ /usr/share/nginx/html
EXPOSE 5050

CMD ["nginx", "-g", "daemon off;"]