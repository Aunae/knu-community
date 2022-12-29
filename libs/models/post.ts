import { Prisma } from '@prisma/client';

const postWithCategory = Prisma.validator<Prisma.PostArgs>()({
  include: {
    author: true,
    category: true,
  },
});

export type PostWithCategory = Prisma.PostGetPayload<typeof postWithCategory>;
