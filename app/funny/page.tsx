import '../globals.css';
import { Metadata } from 'next';
import { groupBy } from 'lodash';
import getSectionDescription from '@/lib/getSectionDescription';
import SectionBox from '@/components/sectionBox/SectionBox';
import ItemBox from './_component/ItemBox';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import type { FunnyPageItem } from '@prisma/client';
import { revalidatePath } from 'next/cache';
export const metadata: Metadata = {
  title: 'seaci.me | ' + getSectionDescription['/funny']?.title,
  description: getSectionDescription['/funny']?.description,
};
const Funny = async () => {
  const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
  const category = groupBy(projectInfo, 'category');
  revalidatePath('/funny');
  return (
    <section className="page-dropDown">
      {Object.keys(category).map((cty, i) => (
        <SectionBox key={i} title={cty}>
          {category[cty].map((p, i) => (
            <ItemBox key={i} projectInfo={p} />
          ))}
        </SectionBox>
      ))}
      <div className="my-20" />
    </section>
  );
};

export default Funny;
