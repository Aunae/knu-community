import { Prisma } from '@prisma/client';

const userWithoutPassword = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    name: true,
    email: true,
  },
});

const userWithPosts = Prisma.validator<Prisma.UserArgs>()({
  include: {
    posts: true,
  },
});

export type UserWithoutPassword = Prisma.UserGetPayload<typeof userWithoutPassword>;
export type UserWithPosts = Prisma.UserGetPayload<typeof userWithPosts>;
