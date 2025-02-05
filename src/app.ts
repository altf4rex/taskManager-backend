// Инициализация Express, подключение middleware и маршрутов
import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import { Request, Response, NextFunction, ErrorRequestHandler  } from 'express';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Роуты
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/tasks', taskRoutes);
// app.use('/api/v1/categories', categoryRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Ghost, you copy?')
})

// Обработчик ошибок (raw one)
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
};

app.use(errorHandler);;
  
export default app;