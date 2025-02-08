import { Router } from "express";
import * as TaskController from './task.controller';

const router = Router();

router.get('/', TaskController.getAllTasks);

router.get('/:id', TaskController.getTaskById);

router.post('/', TaskController.createTask);

// update the task
router.patch('/:id', TaskController.updateTask);

router.delete('/:id', TaskController.deleteTask);

export default router;