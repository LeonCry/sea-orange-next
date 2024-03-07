'use client';
import { chakraEN } from '@/style/defineFont';
import ItemBox from './ItemBox';
import type { FunnyPageItem } from '@prisma/client';
const titleStyle = `w-full text-center text-2xl py-5 ${chakraEN.className}`;
const SectionBox = ({ projects, title }: { projects: FunnyPageItem[]; title: string }) => {
  return (
    <>
      <h1 className={titleStyle}> {title} </h1>
      <article className="flex flex-wrap justify-evenly pb-16">
        {projects.map((p, i) => (
          <ItemBox key={i} projectInfo={p} />
        ))}
      </article>
    </>
  );
};

export default SectionBox;
