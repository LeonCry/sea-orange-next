'use client';
import Link from 'next/link';
import style from './ItemBox.module.scss';
import Icon from '@icon-park/react/es/all';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ReactTyped } from 'react-typed';
import { useRef } from 'react';
const ItemBox = () => {
  const element = useRef<any>(null);
  const typeStarted = useIntersectionObserver(element);
  return (
    <Link ref={element} href={'/'} className={`${style.itemBox} flex box-trigger`}>
      <Icon type="Camera" size={36} className="ml-4 self-center" />
      <div className="flex-1 ml-4 flex flex-col py-2">
        <h6>Camera</h6>
        {typeStarted && (
          <ReactTyped
            className="leading-4 mt-1 text-sm text-gray-300 transition-all"
            strings={['Here you can find anything']}
            typeSpeed={40}
            showCursor={false}
          />
        )}
      </div>
    </Link>
  );
};
ItemBox.displayName = 'ItemBox';
export default ItemBox;
