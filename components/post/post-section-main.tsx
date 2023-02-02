'use client';
import { Post } from '@prisma/client';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import PostComponent from './post-item';
import PostSectionPageNumber from './post-section-page-number';

type Props = {
  searchParams?: {
    page: string;
  };
};

const TAKE_NUM = 20;
const PostSectionMain = ({}: Props) => {
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState<number>(1);
  const [posts, setPosts] = useState<any[]>([]);
  const params = useSearchParams();
  const router = useRouter();

  const onClickPageNumber = (page: number, interval: number) => {
    router.push(`/home?page=${page}&interval=${interval}`);
    setPage(page);
  };

  const fetchPosts = async (page: number) => {
    const res = await axios
      .get('/api/post', {
        headers: {
          skip: (page - 1) * TAKE_NUM,
          take: TAKE_NUM,
        },
      })
      .then((res) => res.data);
    setPosts(res.data.posts);
    setPage(page);
    setPageLength(Math.ceil(res.data.count / TAKE_NUM));
  };

  useEffect(() => {
    const getPage = params.get('page');
    if (getPage !== null) {
      const parsedPage = +getPage;
      if (!Number.isNaN(parsedPage)) {
        fetchPosts(parsedPage);
      }
    }
    if (getPage === null) {
      fetchPosts(1);
    }
  }, [params]);
  return (
    <>
      <>
        <div className="max-w-[900px] w-full h-[760px]">
          {posts?.map((post) => (
            <PostComponent key={post.id} post={post} />
          ))}
        </div>
      </>
      <Suspense>
        <PostSectionPageNumber onClick={onClickPageNumber} params={params} currentNumber={page} lastNumber={pageLength} />
      </Suspense>
    </>
  );
};

export default PostSectionMain;
