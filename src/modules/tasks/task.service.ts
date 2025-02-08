import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async () => {
    return await prisma.task.findMany({
        include: {user: true, category: true},
    })
}

export const getTaskById = async (id: number) => {
    return await prisma.task.findUnique({
        where: { id },
        include: {user: true, category: true},
    })
}

export const createTask = async (data: any) => {
    return await prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          scheduledAt: new Date(data.scheduledAt),
          isDaily: data.isDaily || false,
          user: { connect: { id: data.userId } },
          category: { connect: { id: data.categoryId } },
        },
    });
};

export const updateTask = async (id: number, data: any) => {
    return await prisma.task.update({
      where: { id },
      data: data,
    });
};

export const deleteTask = async (id: number) => {
    return await prisma.task.delete({
      where: { id },
    });
  };