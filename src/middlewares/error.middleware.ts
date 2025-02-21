import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger'; // Логгер, настроенный через Winston

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    // log errors with Winston
    logger.error(err.message, { stack: err.stack });

    if (res.headersSent) {
        return next(err);
      }

    res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};