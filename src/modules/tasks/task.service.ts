import redis from '../../config/redis.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// TaskService.getAllTasks.ts
export const getAllTasks = async (
  userId: number,
  filters?: { categoryId?: number; completed?: boolean }
) => {
  // Строим динамическое условие where
  const whereClause: any = { userId };
  if (filters?.categoryId) {
    whereClause.categoryId = filters.categoryId;
  }
  if (typeof filters?.completed === "boolean") {
    whereClause.isCompleted = filters.completed;
  }

  // Формируем ключ для кеша, включающий фильтры
  let cacheKey = `tasks:user:${userId}`;
  if (filters) {
    cacheKey += `:category:${filters.categoryId ?? "all"}:completed:${
      filters.completed !== undefined ? filters.completed : "all"
    }`;
  }

  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const tasks = await prisma.task.findMany({
    where: whereClause,
    include: { user: true, category: true },
  });

  await redis.set(cacheKey, JSON.stringify(tasks), "EX", 300);
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
      priority: data.priority,  // Добавлено: передаем приоритет из запроса
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
