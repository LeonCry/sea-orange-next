'use server';
import type { FunnyPageItem } from '@prisma/client';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import dynamic from 'next/dynamic';
import Modal from '../_component/Modal';
export const generateStaticParams = async () => {
  const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
  return projectInfo.map((item) => ({
    name: item.path,
  }));
};
const FunnyItem = async ({ params }: { params: { name: string } }) => {
  const fs = require('fs').promises;
  const fileList = [];
  const entries = await fs.readdir('app/funny/_items', { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      fileList.push(entry.name);
    }
  }
  if (fileList.includes(params.name) === false) {
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
