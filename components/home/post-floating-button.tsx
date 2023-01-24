'use client';
import FloatingButtonWrapper from '../common/floating-button/floating-button-wrapper';
import { MdEdit as WriteIcon } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const PostFloatingButton = () => {
  const router = useRouter();
  const createPost = () => {
    router.push('manage/newpost');
  };
  return (
    <FloatingButtonWrapper onClickHandler={createPost}>
      <WriteIcon />
    </FloatingButtonWrapper>
  );
};

export default PostFloatingButton;
