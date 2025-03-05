import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Prisma успешно подключился к базе данных');
  } catch (error) {
    console.error('Ошибка подключения Prisma:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
