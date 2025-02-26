// tests/task.service.test.ts
import * as TaskService from '../../src/modules/tasks/task.service';
import { PrismaClient } from '@prisma/client';
import redis from '../../src/config/redis';

// Замокайте Prisma и redis, если необходимо:
jest.mock('../../src/config/redis');
jest.mock('@prisma/client');

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return tasks from cache if available', async () => {
    const fakeTasks = [{ id: 1, title: 'Test task' }];
    // Эмулируем, что данные уже есть в кеше
    (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(fakeTasks));

    const tasks = await TaskService.getAllTasks(123);
    expect(tasks).toEqual(fakeTasks);
  });

  // Другие тесты: проверка запроса к базе, инвалидация кеша и т.д.
});
