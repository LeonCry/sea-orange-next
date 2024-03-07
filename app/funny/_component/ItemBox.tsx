'use client';
import Link from 'next/link';
import style from './ItemBox.module.scss';
import Icon from '@icon-park/react/es/all';
import type { FunnyPageItem } from '@prisma/client';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
const ItemBox = ({ projectInfo }: { projectInfo: FunnyPageItem }) => {
  const element = useRef<any>(null);
  const isIntoView = useIntersectionObserver(element);
  return (
    <Link ref={element} href={`/funny/${projectInfo.path}`} className={`${style.itemBox} box-trigger`}>
      {isIntoView && (
        <div className="flex">
          <Icon type={projectInfo.icon} size={36} className="ml-4 self-center" />
          <div className="flex-1 ml-4 flex flex-col py-2">
            <h6>{projectInfo.name}</h6>
            <span className="leading-4 mt-1 text-sm text-gray-300 transition-all hyphens-auto">{projectInfo.description}</span>
          </div>
        </div>
      )}
    </Link>
  );
};
ItemBox.displayName = 'ItemBox';
export default ItemBox;
