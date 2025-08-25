# Используем Node 20 (slim лучше для Windows)
FROM node:20-slim

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем проект (без node_modules)
COPY . .

# Экспонируем порт Next.js
EXPOSE 3000

# Dev-команда
CMD ["pnpm", "dev"]
