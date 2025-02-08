import { Router } from 'express';
import * as CategoryController from './category.controller';

const router = Router();

router.get('/', CategoryController.getAllCategories);

router.get('/:id', CategoryController.getCategoryTasksByid);

router.post('/', CategoryController.createCategory);

router.patch('/:id', CategoryController.updateCategory);

router.delete('/:id', CategoryController.deleteteCategory);

export default router;