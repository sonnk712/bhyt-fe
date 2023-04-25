FROM node:16 AS build

WORKDIR /opt

RUN npm install yarn

COPY package.json package-lock.json yarn.lock ./

RUN yarn install

COPY . ./

# RUN mv src/environments/environment.prod.ts src/environments/environment.ts
RUN npm run build --prod

FROM nginx

COPY default.conf /etc/nginx/config.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /opt/dist/agribank-ra-admin /usr/share/nginx/html