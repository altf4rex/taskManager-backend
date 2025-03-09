import { Request, Response, NextFunction } from 'express';
import * as CategoryService from './category.service.js';

export const getAllCategories = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const categories = await CategoryService.getAllCategories();
        res.status(200).json(categories)
    }catch(error){
        next(error);
    }
}

export const getCategoryTasksByid = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try{
        const tasks = await CategoryService.getCategoryTasksByid(Number(id));
        if(tasks) res.status(200).json(tasks);
        else res.status(404).json({message: 'Category not found'});
    }catch(error){
        next(error);
    }
}

// CategoryController.createCategory
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Извлекаем userId из req.user (установленного в authenticateJWT)
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }
    // Объединяем данные из запроса с userId
    const data = { ...req.body, userId };
    console.log(data);
    const newCategory = await CategoryService.createCategory(data);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};


export const updateCategory = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try{
        const updatedCategory = await CategoryService.updateCategory(Number(id), req.body);
        res.status(200).json(updatedCategory);
    }catch(error){
        next(error);
    }
}

export const deleteteCategory = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try{
        await CategoryService.deleteteCategory(Number(id));
        res.status(200).send();
    }catch(error){
        next(error);
    }
}