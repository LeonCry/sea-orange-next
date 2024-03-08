'use server';
// import style from './FunnyItem.module.scss';
import type { FunnyPageItem } from '@prisma/client';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import dynamic from 'next/dynamic';
import Modal from '../_component/Modal';
export const generateStaticParams = async () => {
  const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
  return projectInfo.map((item) => ({
    name: item.name,
  }));
};
const FunnyItem = async ({ params }: { params: { name: string } }) => {
  const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
  if (projectInfo.findIndex((item) => item.path === params.name) === -1) {
    return <section>404 NOT FOUND</section>;
  }
  const DynamicComponents = dynamic(() => import(`../_items/${params.name}/index`), { ssr: false });
  return (
    <Modal>
      <DynamicComponents />
    </Modal>
  );
};

export default FunnyItem;
