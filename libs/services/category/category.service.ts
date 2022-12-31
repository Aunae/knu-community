import { prismaClient } from '../../prisma/prisma.client';
import { Prisma } from '.prisma/client';
import { CategoriesResponse } from '../../api-interfaces/response/category/category.interface';
import { PrismaClient } from '@prisma/client';
import CategoryCreateArgs = Prisma.CategoryCreateArgs;

export class CategoryService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  async createCategory(createCategoryDto: CategoryCreateArgs) {
    const category = await prismaClient.category.create(createCategoryDto);
    return category;
  }
}

const createCategory = async (createCategoryDto: CategoryCreateArgs) => {
  const category = await prismaClient.category.create(createCategoryDto);
  return category;
};

const getCategories = async (): Promise<CategoriesResponse> => {
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

export const categoryService = { createCategory, getCategories };
