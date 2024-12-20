import { Suspense } from 'react';
import MainBox from './_component/MainBox';
import Loading from '@/lotties/loading/Loading';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
export const generateStaticParams = async () => {
  const blogInfo: BlogPageItem[] = await getAllBlogInfo();
  return blogInfo.map((item) => ({
    id: item.id + '',
  }));
};
const page = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <MainBox mdId={params.id} />
    </Suspense>
  );
};

export default page;
