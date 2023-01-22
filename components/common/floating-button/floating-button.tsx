'use client';
import { ReactNode } from 'react';
import styles from './floating-button.module.scss';

interface Props {
  onClickHandler: () => void;
  children: ReactNode;
}

const FloatingButton = ({ onClickHandler, children }: Props) => {
  return (
    <button className={styles.button} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default FloatingButton;

//flex justify-center items-center fixed z-90 bottom-10 right-10 bg-blue-600 w-20 h-20 rounded-full text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300 drop-shadow-lg
