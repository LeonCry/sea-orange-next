'use client';

import { useRef } from 'react';
const TextButton = () => {
  return (
    <button
      onClick={() => console.log('click')}
      className="w-24 ml-96 h-32 bg-red-500 cursor-none hover:bg-green-500 box-trigger rounded-2xl"
    >
      Click me
    </button>
  );
};

export default TextButton;
