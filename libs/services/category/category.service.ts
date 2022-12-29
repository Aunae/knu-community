import { prismaClient } from '../../prisma/prisma.client';
import { Prisma } from '.prisma/client';
import { CategoriesResponse } from '../../api-interfaces/response/category/category.interface';
import CategoryCreateArgs = Prisma.CategoryCreateArgs;

export const createCategory = async (createCategoryDto: CategoryCreateArgs) => {
  const category = await prismaClient.category.create(createCategoryDto);
  return category;
};

export const getCategories = async (): Promise<CategoriesResponse> => {
  const categories = await prismaClient.category.findMany({
    where: {
      parent: null,
    },
    include: {
      children: {
        orderBy: [{ name: 'asc' }],
      },
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  return { data: categories, message: 'success', status: 200 };
};
