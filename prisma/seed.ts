import {
  PrismaClient,
  TwoFactorConfirmation,
  User,
  UserRole,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

/**
 * A global prisma client. It will be disconnecte dregardless of whether
 * seed script has ran successfully OR unsucessfully.
 */
const prisma = new PrismaClient();

async function main() {
  const testId = faker.string.uuid();

  const testUser: User = {
    id: testId,
    name: faker.person.firstName(),
    email: "testUser1@email.com",
    emailVerified: faker.date.recent({
      days: 100,
      refDate: "2023-07-01T00:00:00.000Z",
    }),
    image: faker.image.url(),
    password: "$2a$10$gTO7o3cdoCNUjVCNnrTeKu7aN5HMJ53ebEIoYZn6qeQIGiww2rjAu",
    role: UserRole.ADMIN,
    isTwoFactorEnabled: true,
  };

  const testTwoFactorConfirmation: TwoFactorConfirmation = {
    id: faker.string.uuid(),
    userId: testUser.id,
  };

  await prisma.user.create({
    data: {
      ...testUser,
    },
  });

  await prisma.twoFactorConfirmation.create({
    data: {
      ...testTwoFactorConfirmation,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
