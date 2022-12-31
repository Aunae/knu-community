import { Prisma } from '@prisma/client';

const postWithCategory = Prisma.validator<Prisma.PostArgs>()({
  include: {
    category: true,
    author: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  },
});

export type PostWithCategory = Prisma.PostGetPayload<typeof postWithCategory>;
