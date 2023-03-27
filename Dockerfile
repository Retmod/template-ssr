FROM node:19.1.0

WORKDIR /retmod

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build:server
RUN pnpm build:client

EXPOSE 3000

CMD [ "pnpm", "start" ]