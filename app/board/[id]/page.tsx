// 'use client';
import { ReactNode } from 'react';
import CommentFloatingButton from '../../../components/post/comment-floating-button';
import { MdAccountCircle as MockIcon, MdComment as CommentIcon, MdMoreVert as CommentOptionIcon, MdThumbUp as LikeIcon } from 'react-icons/md';
import axios from 'axios';
import Article from '../../../components/post/article';

interface Props {
  children: ReactNode;
  params: { id: string };
}

const getPost = async (id: string) => {
  const url = process.env.BASE_URL || 'http://localhost:3000';
  const queryFn = `${url}/api/post/${id}`;
  // const data = await axios.get(queryFn).then((res) => res.data);
  const data = await (await fetch(queryFn)).json();
  if (data.status === 200) return data.data;
  else return data;
};

// TODO: change to SSR
const BoardPage = async ({ params, children }: Props) => {
  const post = await getPost(params.id);

  return (
    <main>
      <Article post={post} />
    </main>
  );
};

export default BoardPage;
