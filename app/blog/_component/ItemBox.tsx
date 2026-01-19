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
        <IconPark icon={projectInfo.icon} size={36} className="pl-4 py-7" />
        <div className="flex-1 flex flex-col py-2">
          <h6 className="transition-all duration-500 absolute top-2 font-bold">{projectInfo.name}</h6>
          <ul className="absolute transition-all duration-500 mt-1 hyphens-auto text-sm">
            {projectInfo.description.split('#').map((item, index) => (
              <li className='ml-4' key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
});
ItemBox.displayName = 'ItemBox';
export default ItemBox;
