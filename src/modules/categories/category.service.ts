import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async() => {
    return await prisma.category.findMany({
        include: { tasks: true }
    })
}

export const getCategoryTasksByid = async(id: number) => {
    return await prisma.category.findUnique({
        where: { id },
        include: { tasks: true }
    })
}

export const createCategory = async(data: any) => {
    return await prisma.category.create({
      data: {
        name: data.name,
        color: data.color,
        user: { connect: { id: data.userId } },
      }
    })
}

export const updateCategory = async(id: number, data: any) => {
    return await prisma.category.update({
        where: {id},
        data: data
    });
}

export const deleteteCategory = async(id: number) => {
    return await prisma.category.delete({
        where: { id }
    });
}

