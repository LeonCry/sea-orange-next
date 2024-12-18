import type { ProjectPageItem } from '@prisma/client';
import Image from 'next/image';
const ItemBox = ({ projectInfo }: { projectInfo: ProjectPageItem }) => {
  return (
    <a
      className="outline-none border block w-[500px] h-[300px] relative cursor-none rounded-2xl box-trigger"
      target="_blank"
      href={projectInfo.sourceUrl}
    >
      <div className="relative flex flex-col transition-all w-full h-full duration-200 opacity-80 bg-[#c5c5c511] hover:opacity-100 hover:bg-[#8881] rounded-2xl overflow-hidden">
        <div className="w-[100px] h-[100px] shrink-0 relative ml-[200px] my-4">
          <Image
            src={projectInfo.icon}
            alt="image"
            fill
            priority
            className="rounded-2xl"
            sizes="100"
          />
        </div>
        <div className="flex p-3 flex-col overflow-auto border-t rounded-3xl">
          <h2 className="text-center">{projectInfo.name}</h2>
          <div className="hyphens-auto text-sm w-full overflow-auto">{projectInfo.description}</div>
        </div>
      </div>
    </a>
  );
};
export default ItemBox;
