import Link from 'next/link';
import style from './ItemBox.module.scss';
import type { FunnyPageItem } from '@prisma/client';
import dynamic from 'next/dynamic';
const IconPark = dynamic(() => import('@/components/dynamicComponents/IconPark'));
const ItemBox = ({ projectInfo }: { projectInfo: FunnyPageItem }) => {
  return (
    <Link data-hover href={`/funny/${projectInfo.path}`} className={`${style.itemBox}`}>
      <div className="flex">
        <IconPark icon={projectInfo.icon} size={36} className="ml-4 self-center" />
        <div className="flex-1 ml-4 flex flex-col py-2">
          <h6>{projectInfo.name}</h6>
          <span className="leading-4 mt-1 text-sm text-gray-300 transition-all hyphens-auto">
            {projectInfo.description}
          </span>
        </div>
      </div>
    </Link>
  );
};
ItemBox.displayName = 'ItemBox';
export default ItemBox;
