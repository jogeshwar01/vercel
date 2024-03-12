FROM node:18-alpine3.18

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "dev"]