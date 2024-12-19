import '../globals.css';
import '@/app/enter-fade.scss';
import { group, sort } from 'radash';
import SectionBox from '@/components/sectionBox/SectionBox';
import ItemBox from './_component/ItemBox';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import type { FunnyPageItem } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { funnyOrders } from '@/lib/getCategoryOrder';
import { Suspense } from 'react';
import Loading from '@/lotties/loading/Loading';
const Funny = async () => {
  const res: FunnyPageItem[] = await getAllProjectsFromFunny();
  const projectInfo = sort(res, (r) => funnyOrders.indexOf(r.category));
  const category = group(projectInfo, (p) => p.category);
  revalidatePath('/funny');
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
      </section>
    </Suspense>
  );
};

export default Funny;
