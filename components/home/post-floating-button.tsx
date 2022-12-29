'use client';
import FloatingButton from '../common/floating-button/floating-button';

const createPost = () => {
  console.log(`Created post!`);
};

const PostFloatingButton = () => {
  return <FloatingButton onClickHandler={createPost} />;
};

export default PostFloatingButton;
