'use client';
import FloatingButtonWrapper from '../common/floating-button/floating-button-wrapper';
import { MdComment as CommentIcon } from 'react-icons/md';

const createComment = () => {
  console.log(`Create comment service`);
};

const CommentFloatingButton = () => {
  return (
    <FloatingButtonWrapper onClickHandler={createComment}>
      <CommentIcon />
    </FloatingButtonWrapper>
  );
};

export default CommentFloatingButton;
