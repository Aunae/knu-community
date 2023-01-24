import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_METHOD, HTTP_STATUS } from '../../libs/constants/http';
import { categoryService } from '../../libs/services/category/category.service';
import { postService } from '../../libs/services/post/post.service';
import { userService } from '../../libs/services/user/user.service';

const PostController = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HTTP_METHOD.POST:
      // const { name, email, password } = req.body;
      // const hashedPassword = await hashPassword(password);
      // const user = await userService.createUser({ name, email, password: hashedPassword });
      console.log('MESSAGE', req.body);
      // return res.status(HTTP_STATUS.OK).json({ user });
      const { title, content, published, session, category } = req.body;
      const user = await userService.getUser(session.user.email);
      if (!user) return res.status(HTTP_STATUS.BAD_REQUEST).json({ post: null });
      if (title.trim() === '') return res.status(HTTP_STATUS.BAD_REQUEST).json({ post: null });
      // FIXME: fix this test code.
      const post = await postService.createPost({
        data: {
          title,
          content,
          published,
          author: {
            connect: {
              id: user.id,
            },
          },
          category: {
            connectOrCreate: {
              where: {
                id: (await categoryService.getCategories()).data[0].id,
              },
              create: {
                name: 'base',
              },
            },
          },
        },
      });
      return res.status(HTTP_STATUS.OK).json(post);
    default:
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ post: null });
  }
};

export default PostController;
