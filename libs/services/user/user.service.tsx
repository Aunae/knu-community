import { prismaClient } from '../../prisma/prisma.client';
import { Prisma, User } from '@prisma/client';
import UserCreateArgs = Prisma.UserCreateArgs;

export const createUser = async (createUserDto: UserCreateArgs): Promise<User> => {
  const user = await prismaClient.user.create(createUserDto);
  return user;
};

export const getUser = async (email: string) => {
  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};
