import '../globals.css';
import { FunnyPageItem, ProjectPageItem } from '@prisma/client';
import { getAllProjects } from '@/api/projectPageApi';
import ProjectPage from './_component/index';
import { Suspense } from 'react';
import Loading from '@/lotties/loading/Loading';
import RandomSpan from '@/components/randomSpan/RandomSpan';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import SuitForMobile from '@/components/SuitForMobile';
export interface BookType {
  id: string;
  icon: string;
  title: string;
  category: string;
  description: string;
  type: 'PROJECT' | 'FUNNY';
  url: string;
  time: string;
}
const Project = async () => {
  const projects: ProjectPageItem[] = await getAllProjects();
  const funnies: FunnyPageItem[] = await getAllProjectsFromFunny();
  const pBooks: BookType[] = projects.map((p) => ({
    id: 'p' + p.id,
    icon: p.icon,
    title: p.name,
    category: p.category,
    description: p.description,
    type: 'PROJECT',
    url: p.sourceUrl,
    time: p.path,
  }));
  const fBooks: BookType[] = funnies.map((f) => ({
    id: 'f' + f.id,
    icon: f.icon,
    title: f.name,
    category: f.category,
    description: f.description,
    type: 'FUNNY',
    url: f.path,
    time: f.sourceUrl,
  }));
  const books: BookType[] = [...pBooks, ...fBooks];
  return (
    <Suspense fallback={<Loading />}>
      <SuitForMobile>
        <ProjectPage books={books} />
      </SuitForMobile>
      <RandomSpan />
    </Suspense>
  );
};

export default Project;
