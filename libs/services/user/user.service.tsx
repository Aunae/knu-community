import { prismaClient } from '../../prisma/prisma.client';

export const createUser = async () => {
  const user = await prismaClient.user.create({
    data: {
      name: 'JEEE',
      email: 'jeeee@google.com',
    },
  });

  return user;
};

export const getUser = async () => {
  const user = await prismaClient.user.findFirst({
    where: {
      name: 'JEEE',
    },
    select: {
      email: true,
    },
  });

  return user;
};
