import redis from '../../config/redis.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// TaskService.getAllTasks.ts
export const getAllTasks = async (
  userId: number,
  filters?: { categoryId?: number; completed?: boolean }
) => {
  const whereClause: any = { userId };
  if (filters?.categoryId) {
    whereClause.categoryId = filters.categoryId;
  }
  if (typeof filters?.completed === "boolean") {
    whereClause.isCompleted = filters.completed;
  }

  let cacheKey = `tasks:user:${userId}`;
  if (filters) {
    cacheKey += `:category:${filters.categoryId ?? "all"}:completed:${
      filters.completed !== undefined ? filters.completed : "all"
    }`;
  }

  // Попытка получить из кэша
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (err) {
    console.warn("Redis get failed:", err);
  }

  const tasks = await prisma.task.findMany({
    where: whereClause,
    include: { user: true, category: true },
  });

  // Попытка сохранить в кэш
  try {
    await redis.set(cacheKey, JSON.stringify(tasks), "EX", 300);
  } catch (err) {
    console.warn("Redis set failed:", err);
  }

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
      priority: data.priority, // Передаем приоритет из запроса
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

// Функция для инвалидирования кэша: удаляем все ключи, начинающиеся с префикса tasks:user:{userId}
export const invalidateTasksCache = async (userId: number) => {
  try {
    const pattern = `tasks:user:${userId}*`;
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (err) {
    console.warn("Redis cache invalidation failed:", err);
  }
};

