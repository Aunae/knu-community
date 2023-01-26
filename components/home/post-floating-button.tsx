'use client';
import FloatingButtonWrapper from '../common/floating-button/floating-button-wrapper';
import { MdEdit as WriteIcon } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const PostFloatingButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const createPost = () => {
    if (session) router.push('manage/newpost');
    else router.push('login');
  };
  return (
    <FloatingButtonWrapper onClickHandler={createPost}>
      <WriteIcon />
    </FloatingButtonWrapper>
  );
};

export default PostFloatingButton;
