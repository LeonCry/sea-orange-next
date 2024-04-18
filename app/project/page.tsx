import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
import { ProjectPageItem } from '@prisma/client';
import { groupBy } from 'lodash';
import SectionBox from '@/components/sectionBox/SectionBox';
import ItemBox from './_component/ItemBox';
import { getAllProjects } from '@/api/projectPageApi';
import { revalidatePath } from 'next/cache';
import { projectOrders } from '@/lib/getCategoryOrder';
const Project = async () => {
  const projectInfo: ProjectPageItem[] = await getAllProjects();
  projectInfo.sort((a, b) => projectOrders.indexOf(a.category) - projectOrders.indexOf(b.category));
  const category = groupBy(projectInfo, 'category');
  revalidatePath('/project');
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

export default Project;
