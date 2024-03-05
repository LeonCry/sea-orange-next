'use client';
import Link from 'next/link';
import style from './ItemBox.module.scss';
import Icon from '@icon-park/react/es/all';
import { forwardRef } from 'react';
const ItemBox = forwardRef((props, ref: any) => {
  return (
    <Link ref={ref} href={'/'} className={`${style.itemBox} flex box-trigger`}>
      <Icon type="Camera" size={36} className="ml-4 self-center" />
      <div className="flex-1 ml-4 flex flex-col py-2">
        <h6>Camera</h6>
        <span className="leading-4 mt-1 text-sm text-gray-300 transition-all">class</span>
      </div>
    </Link>
  );
});
ItemBox.displayName = 'ItemBox';
export default ItemBox;
