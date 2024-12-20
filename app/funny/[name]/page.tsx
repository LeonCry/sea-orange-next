'use server';
import dynamic from 'next/dynamic';
import Modal from '../_component/Modal';
import NotFound from '@/app/not-found';
const FunnyItem = async ({ params }: { params: { name: string } }) => {
  const fs = require('fs').promises;
  const fileList = [];
  const entries = await fs.readdir('app/funny/_items', { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      fileList.push(entry.name);
    }
  }
  if (!fileList.includes(params.name)) {
    return <NotFound />;
  }
  const withoutModalList = ['democracySimulator', 'demo'];
  const DynamicComponents = dynamic(() => import(`../_items/${params.name}/index`), { ssr: false });
  return (
    <>
      {withoutModalList.includes(params.name) ? (
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
