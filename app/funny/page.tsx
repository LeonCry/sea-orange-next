import '../globals.css';
import { Metadata } from 'next';
import { groupBy } from 'lodash';
import getSectionDescription from '@/lib/getSectionDescription';
import SectionBox from './_component/SectionBox';
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
        <SectionBox key={i} projects={category[cty]} title={cty} />
      ))}
      <div className="my-20" />
    </section>
  );
};

export default Funny;
