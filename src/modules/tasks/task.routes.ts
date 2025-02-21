import { Router } from "express";
import * as TaskController from './task.controller';
import {authenticateJWT} from '../../middlewares/auth.middleware'

const router = Router();

router.get('/', authenticateJWT, TaskController.getAllTasks);

router.get('/:id', authenticateJWT, TaskController.getTaskById);

router.post('/', authenticateJWT, TaskController.createTask);

// update the task
router.patch('/:id', authenticateJWT, TaskController.updateTask);

router.delete('/:id', authenticateJWT, TaskController.deleteTask);

export default router;