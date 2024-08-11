### STAGE 1: build ###
FROM node:20 AS build

WORKDIR /frenzelTech
COPY package*.json ./
RUN npm install -g npm@10.5.0
RUN npm install -g @angular/cli@17
RUN npm --force
COPY . .
RUN ng build

### STAGE 2: Run ###
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /frenzelTech/dist/angular-osf/browser /usr/share/nginx/html
EXPOSE 8088
ENTRYPOINT ["nginx","-g","daemon off;"]