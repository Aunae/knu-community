/**
 * Todo: split test
 * */

import { Context, createMockContext, MockContext } from './utils/context';
import { PostService } from '../../services/post/post.service';
import { prismaClient } from '../prisma.client';
import { UserService } from '../../services/user/user.service';
import { CategoryService } from '../../services/category/category.service';

let mockCtx: MockContext;
let ctx: Context;

let postService: PostService;
let userService: UserService;
let categoryService: CategoryService;

beforeEach(() => {
  /** Todo: replace to mock client */
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  userService = new UserService(prismaClient);
  postService = new PostService(prismaClient);
  categoryService = new CategoryService(prismaClient);
});

afterEach(() => {
  /**
   * Todo: Clear test db
   * */
});

test('should create new user ', async () => {
  const user = {
    id: 'mock-user-id',
    email: 'mock-email@email.com',
    name: 'mock-username',
    password: 'mock-password',
  };

  const createdUser = await userService.createUser({
    id: 'mock-user-id',
    email: 'mock-email@email.com',
    name: 'mock-username',
    password: 'mock-password',
  });

  await expect(user.name).toEqual('mock-username');
});

test('should create new post ', async () => {
  const given = {
    id: 'mock-post-id',
    title: 'mock-title',
    content: 'mock post content',
    authorId: 'mock-user-id',
    categoryId: 'mock-category-id',
    published: true,
  };

  const createdPost = await postService.createPost({
    data: {
      title: 'mock-title',
      content: 'mock post content',
      authorId: 'mock-user-id',
      categoryId: 'mock-category-id',
      published: true,
    },
  });

  await expect(given.title).toEqual(createdPost.data.title);
});

test('should create new category', async () => {
  const given = {
    id: 'mock-category-id',
    name: 'mock category',
  };

  const createdCategory = await categoryService.createCategory({
    data: {
      id: 'mock-category-id',
      name: 'mock category',
    },
  });

  console.log(createdCategory);
  await expect(given.name).toEqual('mock category');
});
