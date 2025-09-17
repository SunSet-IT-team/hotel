FROM node:23-slim
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./

RUN pnpm install

COPY . .

EXPOSE 3000 6006
