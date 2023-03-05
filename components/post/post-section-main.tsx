'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import PostComponent from './post-item';
import PostSectionPageNumber from './post-section-page-number';
import styles from './post-section-main.module.scss';
import LoadingComponent from '../common/loading/loading-component';

type Props = {
  searchParams?: {
    page: string;
  };
};

const TAKE_NUM = 20;
const PostSectionMain = ({}: Props) => {
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const params = useSearchParams();
  const router = useRouter();

  const onClickPageNumber = (page: number, interval: number) => {
    router.push(`/home?page=${page}&interval=${interval}`);
    setLoading(true);
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
    // console.log(res.data.posts);
    setPosts(res.data.posts);
    setPage(page);
    setPageLength(Math.ceil(res.data.count / TAKE_NUM));
    setLoading(false);
  };

  useEffect(() => {
    if (params !== null && params !== undefined) {
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
    }
  }, [params]);

  useEffect(() => {
    console.log('Loading', loading);
  }, [loading]);

  return (
    <>
      <div className={`max-w-[900px] w-full h-[760px] ${styles.contents}`}>
        {posts?.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
        <LoadingComponent loading={loading} />
      </div>
      <Suspense>
        <PostSectionPageNumber onClick={onClickPageNumber} params={params} currentNumber={page} lastNumber={pageLength} />
      </Suspense>
    </>
  );
};

export default PostSectionMain;
