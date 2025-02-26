import { Router } from 'express';
import { check } from 'express-validator';
import * as AuthController from './auth.controller.js';
import { validate } from '../../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    validate
    ], AuthController.register
);

router.post('/login', [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required'),
    validate
  ], AuthController.login);

export default router;

