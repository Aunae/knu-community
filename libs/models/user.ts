import { Prisma } from '@prisma/client';

const userWithoutPassword = Prisma.validator<Prisma.UserArgs>()({
  select: {
    name: true,
    email: true,
  },
});

export type UserWithoutPassword = Prisma.UserGetPayload<typeof userWithoutPassword>;
