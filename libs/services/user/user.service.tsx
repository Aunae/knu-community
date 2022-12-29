import { prismaClient } from '../../prisma/prisma.client';
import { Prisma, User } from '@prisma/client';
import { UsersResponse } from '../../api-interfaces/response/user/user.interface';
import UserCreateInput = Prisma.UserCreateInput;

export const createUser = async (createUserDto: UserCreateInput): Promise<User> => {
  const user = await prismaClient.user.create({ data: createUserDto });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const getUser = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUsers = async (): Promise<UsersResponse> => {
  const users = await prismaClient.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return { data: users, message: 'success', status: 200 };
};
