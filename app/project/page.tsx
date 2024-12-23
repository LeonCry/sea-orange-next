import '../globals.css';
import '@/app/enter-fade.scss';
import { ProjectPageItem } from '@prisma/client';
import { group, sort } from 'radash';
import SectionBox from '@/components/sectionBox/SectionBox';
import ItemBox from './_component/ItemBox';
import { getAllProjects } from '@/api/projectPageApi';
import { projectOrders } from '@/lib/getCategoryOrder';
import { Suspense } from 'react';
import Loading from '@/lotties/loading/Loading';
import RandomSpan from '@/components/randomSpan/RandomSpan';
const Project = async () => {
  const res: ProjectPageItem[] = await getAllProjects();
  const projectInfo = sort(res, (r) => projectOrders.indexOf(r.category));
  const category = group(projectInfo, (p) => p.category);
  return (
    <Suspense fallback={<Loading />}>
      <section className="page-dropDown enterFade">
        {Object.keys(category).map((cty, i) => (
          <SectionBox key={i} title={cty}>
            {category[cty]!.map((p, i) => (
              <ItemBox key={i} projectInfo={p} />
            ))}
          </SectionBox>
        ))}
        <div className="my-20" />
        <RandomSpan />
      </section>
    </Suspense>
  );
};

export default Project;
