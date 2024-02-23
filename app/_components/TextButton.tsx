'use client';

import { useRef } from 'react';
const TextButton = () => {
  return (
    <button
      onClick={() => console.log('click')}
      className="w-32 ml-96 h-10 bg-red-500 cursor-none hover:bg-green-500 box-trigger rounded"
    >
      Click me
    </button>
  );
};

export default TextButton;
