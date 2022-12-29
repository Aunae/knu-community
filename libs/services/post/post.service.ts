import { prismaClient } from '../../prisma/prisma.client';
import { Prisma } from '.prisma/client';
import { PostResponse, PostsResponse } from '../../api-interfaces/response/post/post.response';
import { HTTP_STATUS } from '../../constants/http';
import PostCreateArgs = Prisma.PostCreateArgs;

export const createPost = async (createPostDto: PostCreateArgs): Promise<PostResponse> => {
  const post = await prismaClient.post.create(createPostDto);
  return { data: post, message: 'success', status: HTTP_STATUS.OK };
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
  return { data: posts, message: 'success', status: HTTP_STATUS.OK };
};
