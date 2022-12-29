import { prismaClient } from '../../prisma/prisma.client';
import { Prisma } from '.prisma/client';
import { PostsResponse } from '../../api-interfaces/response/post/post.interface';
import PostCreateArgs = Prisma.PostCreateArgs;

export const createPost = async (createPostDto: PostCreateArgs) => {
  const post = await prismaClient.post.create(createPostDto);
  return post;
};

export const getPost = async (id: string) => {
  const post = await prismaClient.post.findUnique({
    where: {
      id,
    },
  });

  return post;
};

export const getPosts = async (): Promise<PostsResponse> => {
  const posts = await prismaClient.post.findMany({
    include: { author: true, category: true },
  });
  return { data: posts, message: 'success', status: 200 };
};
