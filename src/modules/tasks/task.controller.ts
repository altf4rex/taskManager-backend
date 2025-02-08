import { Request, Response } from 'express';
import * as TaskService from './task.service';

// Получить список задач
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

// Получить задачу по id
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await TaskService.getTaskById(Number(id));
    if (task) res.json(task);
    else res.status(404).json({ message: 'Task not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task' });
  }
};

// Создать задачу
export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = await TaskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Обновить задачу
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTask = await TaskService.updateTask(Number(id), req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Удалить задачу
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await TaskService.deleteTask(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
