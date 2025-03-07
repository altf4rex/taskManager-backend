import { Request, Response, NextFunction } from 'express';
import * as AuthService from './auth.service.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  };

export const login = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {token, user} = await AuthService.login(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        })
        res.json({ message: 'Login successful', user });
    } catch(error: any) {
        res.status(401).json({ message: error.message || 'Invalid credentials' });
    }
}