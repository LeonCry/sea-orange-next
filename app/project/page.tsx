import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
import { ProjectPageItem } from '@prisma/client';
import { groupBy } from 'lodash';
import SectionBox from './_component/SectionBox';
import { getAllProjects } from '@/api/projectPageApi';
export const metadata: Metadata = {
  title: 'seaci.me | ' + getSectionDescription['/blog']?.title,
  description: getSectionDescription['/blog']?.description,
};
const Project = async () => {
  const projectInfo: ProjectPageItem[] = await getAllProjects();
  const category = groupBy(projectInfo, 'category');
  return (
    <section className="page-dropDown">
      {Object.keys(category).map((cty, i) => (
        <SectionBox key={i} projects={category[cty]} title={cty} />
      ))}
      <div className="my-20" />
    </section>
  );
};

export default Project;
