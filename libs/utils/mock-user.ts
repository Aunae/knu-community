import { prismaClient } from '../prisma/prisma.client';
import { Prisma } from '.prisma/client';
import { userService } from '../services/user/user.service';
import UserCreateInput = Prisma.UserCreateInput;

export const createMockUsers = async () => {
  const foundCount = await prismaClient.user.count();

  if (foundCount > 0) {
    return;
  }

  const dtos: UserCreateInput[] = [
    {
      name: 'j1',
      email: 'j1@google.com',
      password: 'asdf',
    },
    {
      name: 'j2',
      email: 'j2@google.com',
      password: 'asdf',
    },
    {
      name: 'j3',
      email: 'j3@google.com',
      password: 'asdf',
    },
  ];

  await Promise.all(dtos.map((dto) => userService.createUser(dto)));
};
