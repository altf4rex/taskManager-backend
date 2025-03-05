# Используем официальный Node.js образ на базе Alpine
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем остальной исходный код
COPY . .

# Генерируем Prisma Client
RUN npx prisma generate

# Компилируем TypeScript в JavaScript (создается папка dist)
RUN npm run build

# Определяем команду для запуска приложения
CMD ["npm", "start"]
