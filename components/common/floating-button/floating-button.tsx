'use client';
import React from 'react';

interface Props {
  onClickHandler: () => void;
}

const FloatingButton = ({ onClickHandler }: Props) => {
  return (
    <button
      className="flex justify-center items-center fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h20 rounded-full text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300 drop-shadow-lg"
      onClick={onClickHandler}
    >
      &#9993;
    </button>
  );
};

export default FloatingButton;
