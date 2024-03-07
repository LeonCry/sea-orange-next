'use server';
// import style from './FunnyItem.module.scss';
import type { FunnyPageItem } from '@prisma/client';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import dynamic from 'next/dynamic';
export const generateStaticParams = async () => {
  const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
  return projectInfo.map((item) => ({
    name: item.name,
  }));
};
const FunnyItem = async ({ params }: { params: { name: string } }) => {
  const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
  if (projectInfo.findIndex((item) => item.name === params.name) === -1) {
    return <section>404 NOT FOUND</section>;
  }
  const DynamicComponents = dynamic(() => import(`../_items/${params.name}/index`), { ssr: false });
  return (
    <section>
      <DynamicComponents />;
    </section>
  );
};

export default FunnyItem;
