'use client';
import { Post } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import PostComponent from './post-item';
import PostSectionPageNumber from './post-section-page-number';

type Props = {
  posts: any[];
  searchParams?: {
    page: string;
  };
};
const PostSectionMain = ({ posts, ...props }: Props) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  useEffect(() => {
    const getPage = params.get('page');
    const realPage = props?.searchParams?.page;
    console.log(getPage, realPage);
    if (getPage !== null && getPage != undefined && realPage != null && realPage != undefined) {
      if (getPage !== realPage) {
        // getpage와 realPage가 다르다... 최적화때문에 router를 soft하게 이동하는 것 같은데 나중에 확인해서 해결할 것.
        // 지금은 야매로 해결해놨지만 매우 느리게 작동함.
        router.push(`${path}/?${params.toString()}`);
      }
    }
    if (getPage !== null) {
      const parsedPage = +getPage;
      if (!Number.isNaN(parsedPage)) {
        setPage(parsedPage);
      }
    }
  }, [params, page]);
  return (
    <>
      <div className="max-w-[900px] w-full">
        {posts?.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
      <Suspense>
        <PostSectionPageNumber params={params} currentNumber={page} lastNumber={27} />
      </Suspense>
    </>
  );
};

export default PostSectionMain;
