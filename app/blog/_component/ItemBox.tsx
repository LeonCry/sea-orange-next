import dynamic from 'next/dynamic';
import Link from 'next/link';
import style from './ItemBox.module.scss';
import type { BlogPageItem } from '@prisma/client';
import { memo } from 'react';
const IconPark = dynamic(() => import('@/components/dynamicComponents/IconPark'));
const ItemBox = memo(({ projectInfo }: { projectInfo: BlogPageItem }) => {
  return (
    <Link data-hover href={`/blog/${projectInfo.id}`} className={`${style.itemBox}`}>
      <div className="flex relative">
        <IconPark icon={projectInfo.icon} size={36} className="p-4 py-7" />
        <div className="flex-1 ml-4 flex flex-col py-2">
          <h6 className="transition-all duration-500 absolute left-20 top-2">{projectInfo.name}</h6>
          <span className="absolute transition-all duration-500 leading-4 mt-1 hyphens-auto text-sm">
            {projectInfo.description}
          </span>
        </div>
      </div>
    </Link>
  );
});
ItemBox.displayName = 'ItemBox';
export default ItemBox;
