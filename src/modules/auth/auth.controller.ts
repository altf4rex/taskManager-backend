import { Request, Response } from 'express';
import * as AuthService from './auth.service';

export const register = async (req: Request, res: Response) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Registration error' });
    }
  };

export const login = async(req: Request, res: Response) => {
    try{
        const token = await AuthService.login(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        })
        res.json({ message: 'Login successful' });
    } catch(error: any) {
        res.status(401).json({ message: error.message || 'Invalid credentials' });
    }
}