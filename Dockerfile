# Используем Node 20 (slim лучше для Windows)
FROM node:23-slim

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Устанавливаем чтобы pnpm использовал глобальный .pnpm-store
RUN pnpm config set store-dir $(pnpm store path) --global

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

ENV PATH=/app/node_modules/.bin:$PATH

# Копируем проект (без node_modules)
COPY . .

# Экспонируем порт Next.js
EXPOSE 3000 6006
