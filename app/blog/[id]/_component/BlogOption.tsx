'use client';
import style from './MainBox.module.scss';
import Link from 'next/link';
import { ReadTime } from './ReadTime';
import { useState } from 'react';
import { DoubleLeft } from '@icon-park/react';
export const BlogOption = () => {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <>
      <Link
        className={`${style.exit} hover:animate-pulse hover:border-r-[10px] hover:w-24 hover:border-[#ff4f4f] hover:text-[#ff4f4f] z-[9999] hover:bg-[#ff4f4f13] bg-gray-100 h-10 text-center absolute overflow-hidden top-24 left-4 cursor-none transition-all duration-500 py-1 w-16 rounded`}
        href={'/blog'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`${isHover ? 'translate-x-0 translate-y-0' : 'translate-x-full translate-y-[10px]'
            } absolute transition-all duration-500 text-sm w-full pt-[6px] text-center delay-100`}
        >
          EXIT
        </div>
        <div
          className={`${isHover ? '-translate-x-full translate-y-[10px]' : 'translate-x-0 translate-y-0'
            } absolute transition-all duration-500 px-8 text-center pt-[2px]  `}
        >
          <p className={isHover ? 'flex opacity-0' : style.left}>
            <DoubleLeft theme="outline" size="24" fill="#b1a8ffaa" />
            <span>EXIT</span>
          </p>
        </div>
      </Link>
      <ReadTime />
    </>
  );
};
