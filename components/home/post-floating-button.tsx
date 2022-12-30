'use client';
import FloatingButtonWrapper from '../common/floating-button/floating-button-wrapper';
import { MdEdit as WriteIcon } from 'react-icons/md';

const createPost = () => {
  console.log(`Create post service`);
};

const PostFloatingButton = () => {
  return (
    <FloatingButtonWrapper onClickHandler={createPost}>
      <WriteIcon />
    </FloatingButtonWrapper>
  );
};

export default PostFloatingButton;
