import { Prisma } from '@prisma/client';

const commentWithAuthor = Prisma.validator<Prisma.CommentArgs>()({
  include: {
    author: {
      select: {
        id: true,
        name: true,
      },
    },
  },
});
export type CommentWithAuthor = Prisma.CommentGetPayload<typeof commentWithAuthor>;
