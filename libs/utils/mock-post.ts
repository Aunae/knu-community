import { prismaClient } from '../prisma/prisma.client';
import { postService } from '../services/post/post.service';
import { createMockUsers } from './mock-user';
import { userService } from '../services/user/user.service';
import { getMockCategories } from './mock-category';
import { CategoryWithChildren } from '../models/category';

export const createMockPost = async () => {
  const found = await prismaClient.post.count();
  if (found > 0) {
    return;
  }

  await createMockUsers();
  const { data: users } = await userService.getUsers();

  const { data: parentCategories } = await getMockCategories();
  let children: CategoryWithChildren[] = [];
  // const children = parentCategories.reduce((previousValue, currentValue, currentIndex) => previousValue.children.concat(currentValue.children));
  parentCategories.forEach((parent) => {
    children = [...children, ...(parent.children as CategoryWithChildren[])];
  });

  let categorySequence = 0;
  users.map((user) => {
    postService.createPost({
      data: {
        title: 'Mock title',
        description: 'mock description',
        authorId: user.id,
        categoryId: children[++categorySequence].id,
      },
    });
  });
};

export const getMockPosts = async () => {
  await createMockPost();
  return await postService.getPosts();
};
