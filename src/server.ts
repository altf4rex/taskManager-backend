// Точка входа, настройка подключения к БД и запуск сервера
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});