import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_METHOD, HTTP_STATUS } from '../../../libs/constants/http';
import { postService } from '../../../libs/services/post/post.service';

const PostIdController = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HTTP_METHOD.GET:
      const { postId } = req.query;
      console.log('ID', postId);
      if (typeof postId !== 'string') return res.status(HTTP_STATUS.BAD_REQUEST).json({ post: null });
      const post = await postService.getPost(postId);
      if (!post) return res.status(HTTP_STATUS.BAD_REQUEST).json({ post: null });
      console.log('POST', post);
      return res.status(HTTP_STATUS.OK).json(post);
    default:
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ post: null });
  }
};

export default PostIdController;
