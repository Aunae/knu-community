import { prismaClient } from '../../prisma/prisma.client';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UsersResponse } from '../../api-interfaces/response/user/user.interface';
import UserCreateInput = Prisma.UserCreateInput;

export class UserService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createUser(createUserDto: UserCreateInput): Promise<User> {
    const user = await prismaClient.user.create({ data: createUserDto });
    return user;
  }
}

const createUser = async (createUserDto: UserCreateInput): Promise<User> => {
  const user = await prismaClient.user.create({ data: createUserDto });
  return user;
};

const getUserById = async (id: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const getUser = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const getUsers = async (): Promise<UsersResponse> => {
  const users = await prismaClient.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return { data: users, message: 'success', status: 200 };
};

export const userService = {
  createUser,
  getUser,
  getUserById,
  getUsers,
};
