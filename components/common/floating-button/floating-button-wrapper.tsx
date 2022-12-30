'use client';
import FloatingButton from './floating-button';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClickHandler: () => void;
}

const FloatingButtonWrapper = ({ onClickHandler, children }: Props) => {
  return <FloatingButton onClickHandler={onClickHandler}>{children}</FloatingButton>;
};

export default FloatingButtonWrapper;
