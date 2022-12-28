import { Prisma } from '@prisma/client';

const categoryWithChildren = Prisma.validator<Prisma.CategoryArgs>()({
  include: {
    children: true,
  },
});

export type Category = Prisma.CategoryGetPayload<typeof categoryWithChildren>;
