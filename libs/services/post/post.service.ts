import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../../prisma/prisma.client';
import { HTTP_STATUS } from '../../constants/http';
import PostCreateArgs = Prisma.PostCreateArgs;

export class PostService {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createPost(createPostDto: PostCreateArgs) {
    const post = await this.prismaClient.post.create(createPostDto);
    console.log(post);
    return { data: post, message: 'success', status: HTTP_STATUS.OK };
  }
}

export const createPost = async (createPostDto: PostCreateArgs) => {
  const post = await prismaClient.post.create(createPostDto);
  return { data: post, message: 'success', status: HTTP_STATUS.OK };
};

/** Todo: handle error */
const getPost = async (id: string) => {
  const post = await prismaClient.post.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      category: true,
      author: true,
      comments: true,
    },
  });

  return { data: post, message: 'success', status: HTTP_STATUS.OK };
};

export const getPosts = async () => {
  const posts = await prismaClient.post.findMany({
    include: { author: true, category: true },
  });
  return { data: posts, message: 'success', status: HTTP_STATUS.OK };
};

export const postService = {
  createPost,
  getPost,
  getPosts,
};
