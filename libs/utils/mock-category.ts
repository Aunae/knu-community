import { prismaClient } from '../prisma/prisma.client';
import { CategoriesResponse } from '../api-interfaces/response/category/category.interface';
import { categoryService } from '../services/category/category.service';
import { Prisma } from '.prisma/client';
import CategoryCreateInput = Prisma.CategoryCreateInput;

export const getMockCategories = async (): Promise<CategoriesResponse> => {
  await createMockCategory();
  return await categoryService.getCategories();
};

export const createMockCategory = async () => {
  const found = await prismaClient.category.count();

  if (found > 0) {
    console.log(`return`);
    return;
  }

  const dtos: CategoryCreateInput[] = [
    {
      name: `메인 게시판 ${1}`,
    },
    {
      name: `메인 게시판 ${2}`,
    },
    {
      name: `메인 게시판 ${3}`,
    },
    {
      name: `메인 게시판 ${4}`,
    },
  ];

  const categories = await Promise.all(dtos.map((dto) => categoryService.createCategory({ data: dto })));
  categories.map((category) => {
    for (let i = 1; i < 4; i++) {
      categoryService.createCategory({
        data: {
          parentId: category.id,
          name: `서브 게시판 ${i}`,
        },
      });
    }
  });
};
