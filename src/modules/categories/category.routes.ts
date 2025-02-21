import { Router } from 'express';
import * as CategoryController from './category.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, CategoryController.getAllCategories);

router.get('/:id', authenticateJWT, CategoryController.getCategoryTasksByid);

router.post('/', authenticateJWT, CategoryController.createCategory);

router.patch('/:id', authenticateJWT, CategoryController.updateCategory);

router.delete('/:id',authenticateJWT, CategoryController.deleteteCategory);

export default router;