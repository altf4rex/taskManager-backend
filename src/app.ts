import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRoutes from './modules/auth/auth.routes';
import { Request, Response, NextFunction, ErrorRequestHandler  } from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(helmet());

app.use(cors({
    origin: 'https://frontend-domain-expantion'
  }));

app.use(express.json());
app.use(cookieParser());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
  
// Роуты
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/tasks', taskRoutes);
// app.use('/api/v1/categories', categoryRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Ghost, you copy?')
})

// Error handler (raw one)
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
};

app.use(errorHandler);;
  
export default app;