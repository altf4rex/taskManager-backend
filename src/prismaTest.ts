import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Пример создания пользователя
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'securepassword',
      name: 'Test User',
    },
  });
  console.log('Created User:', newUser);

  // Пример получения всех пользователей
  const users = await prisma.user.findMany();
  console.log('All Users:', users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });