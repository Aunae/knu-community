import { Prisma } from '@prisma/client';

const categoryWithChildren = Prisma.validator<Prisma.CategoryArgs>()({
  include: {
    children: true,
  },
});

export type CategoryWithChildren = Prisma.CategoryGetPayload<typeof categoryWithChildren>;
