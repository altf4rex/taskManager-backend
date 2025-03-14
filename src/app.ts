import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRoutes from './modules/auth/auth.routes.js';
import taskRoutes from './modules/tasks/task.routes.js';
import categoryRoutes from './modules/categories/category.routes.js';
import { Request, Response, NextFunction, ErrorRequestHandler  } from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: "json" };

const app = express();

// Middleware
app.use(helmet());

app.use(cors({
    // origin: 'https://task-manager-frontend-seven-zeta.vercel.app',
    origin: 'http://localhost:3000',
    credentials: true, 
  }));

app.use(express.json());
app.use(cookieParser());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

app.use(errorHandler);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    res.send('Ghost, you copy?')
})



  
export default app;