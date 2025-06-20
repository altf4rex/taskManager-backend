import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden: Invalid token' });
      return;
    }
    // decoded содержит { userId, email, iat, exp }
    req.user = decoded;  // Устанавливаем req.user после логирования decoded
    // Если нужно логировать userId, используйте правильное название:
    next();
  });
  
};
