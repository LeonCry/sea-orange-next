'use server';
import dynamic from 'next/dynamic';
import Modal from '../_component/Modal';
import NotFound from '@/app/not-found';
import { FunnyPageItem } from '@prisma/client';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import RandomSpan from '@/components/randomSpan/RandomSpan';
export const generateStaticParams = async () => {
  const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
  return projectInfo.map((item) => ({
    name: item.path,
  }));
};
const FunnyItem = async ({ params }: { params: Promise<{ name: string }> }) => {
  const fs = require('fs').promises;
  const fileList = [];
  const entries = await fs.readdir('app/funny/_items', { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      fileList.push(entry.name);
    }
  }
  const name = (await params).name;
  if (!fileList.includes(name)) {
    return <NotFound />;
  }
  const withoutModalList = ['democracySimulator', 'demo'];
  const DynamicComponents = dynamic(() => import(`../_items/${name}/index`), { ssr: true });
  return (
    <>
      <RandomSpan />
      {withoutModalList.includes(name) ? (
        <DynamicComponents />
      ) : (
        <Modal>
          <DynamicComponents />
        </Modal>
      )}
    </>
  );
};

export default FunnyItem;
