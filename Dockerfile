# TODO: multistage build for nuxt

FROM node:alpine AS nuxt-build

WORKDIR /usr/src

ARG baseURL

RUN export baseURL=${baseURL}

COPY package*.json ./

RUN NODE_ENV=build npm i

COPY . .

ENV ENV_SILENT=true

RUN npm run build

FROM node

RUN useradd -ms /bin/bash adonis

USER adonis

RUN mkdir /home/adonis/app

WORKDIR /home/adonis/app

COPY package*.json ./

RUN npm i

COPY . .

COPY --from=nuxt-build /usr/src/.nuxt .nuxt

EXPOSE 3000

ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "npm", "start" ]