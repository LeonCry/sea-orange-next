import { Suspense } from 'react';
import MainBox from './_component/MainBox';
import Loading from '@/lotties/loading/Loading';
const page = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <MainBox mdId={params.id} />
    </Suspense>
  );
};

export default page;
