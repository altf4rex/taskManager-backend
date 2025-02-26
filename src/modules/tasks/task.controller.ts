import { Request, Response, NextFunction  } from 'express';
import * as TaskService from './task.service.js';

// Get all tasks for the authenticated user
export const getAllTasks = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }
    const tasks = await TaskService.getAllTasks(Number(userId));
    res.json(tasks);
  } catch (error) {
      next(error);
  }
};

// Get a single task by its id
export const getTaskById = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const { id } = req.params; // Task id 
    const userId = req.user?.userId;
    const task = await TaskService.getTaskById(Number(id), Number(id));
    if (task?.userId !== userId) {
       res.status(403).json({ message: 'Forbidden: You do not have access to this task' });
       return
    }
    if (task) res.json(task);
    else res.status(404).json({ message: 'Task not found' });
  } catch (error) {
    next(error);
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }
    const data = req.body;
    const newTask = await TaskService.createTask(data, Number(userId));
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Update an existing task
export const updateTask = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const { id } = req.params; // Task id
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }
    const data = req.body;
    const updatedTask = await TaskService.updateTask(Number(id), data, Number(userId));
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const { id } = req.params; // Task id
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }
    await TaskService.deleteTask(Number(id), Number(userId));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
