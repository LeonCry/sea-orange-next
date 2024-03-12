'use client';
import Link from 'next/link';
import style from './ItemBox.module.scss';
import Icon from '@icon-park/react/es/all';
import type { BlogPageItem } from '@prisma/client';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
const ItemBox = ({ projectInfo }: { projectInfo: BlogPageItem }) => {
  const element = useRef<any>(null);
  const isIntoView = useIntersectionObserver(element);
  return (
    <Link
      ref={element}
      href={`/blog/${projectInfo.path}/${projectInfo.id}`}
      style={{ opacity: isIntoView ? 1 : 0 }}
      className={`${style.itemBox} box-trigger`}
    >
      {isIntoView && (
        <div className="flex relative">
          <Icon type={projectInfo.icon} size={36} className="p-4 py-7" />
          <div className="flex-1 ml-4 flex flex-col py-2">
            <h6 className="transition-all duration-300 absolute left-20 top-2">{projectInfo.name}</h6>
            <span className="transition-all duration-300 absolute left-20 top-8 leading-4 h-12 mt-1 text-sm text-gray-300 text-truncate line-clamp-3">
              {projectInfo.description}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
};
ItemBox.displayName = 'ItemBox';
export default ItemBox;
