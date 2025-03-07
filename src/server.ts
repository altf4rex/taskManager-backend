// Точка входа, настройка подключения к БД и запуск сервера
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const port = Number(process.env.PORT) || 4000;
const HOST = process.env.PORT ? '0.0.0.0' : "127.0.0.1"

app.listen(port, HOST, () => {
  console.log(`Server running at http://${HOST}:${port}`);
});