import redis from '../../config/redis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async (userId: number) => {
  const cacheKey = `tasks:user:${userId}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const tasks = await prisma.task.findMany({
    where: { userId: userId },
    include: { user: true, category: true },
  });

  await redis.set(cacheKey, JSON.stringify(tasks), 'EX', 300);
  return tasks;
};

export const getTaskById = async (id: number, userId: number) => {
  return await prisma.task.findFirst({
    where: { id, userId },
    include: { user: true, category: true },
  });
};

export const createTask = async (data: any, userId: number) => {
  await invalidateTasksCache(userId);

  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      scheduledAt: new Date(data.scheduledAt),
      isDaily: data.isDaily || false,
      user: { connect: { id: userId } },
      category: { connect: { id: data.categoryId } },
    },
  });
};

export const updateTask = async (id: number, data: any, userId: number) => {
  await invalidateTasksCache(userId);

  return await prisma.task.update({
    where: { id, userId },
    data: data,
  });
};

export const deleteTask = async (id: number, userId: number) => {
  await invalidateTasksCache(userId);

  return await prisma.task.delete({
    where: { id, userId },
  });
};

export const invalidateTasksCache = async (userId: number) => {
  const cacheKey = `tasks:user:${userId}`;
  await redis.del(cacheKey);
};
