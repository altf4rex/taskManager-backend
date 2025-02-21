import { Request, Response, NextFunction } from 'express';
import * as CategoryService from './category.service';

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

export const createCategory = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const newCategory = await CategoryService.createCategory(req.body);
        res.status(201).json(newCategory);
    }catch(error){
        next(error);
    }
}

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