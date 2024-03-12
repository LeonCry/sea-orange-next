import { Suspense } from 'react';
import MainBox from './_component/MainBox';
import Loading from '@/components/loading/Loading';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
export const generateStaticParams = async () => {
  const blogInfo: BlogPageItem[] = await getAllBlogInfo();
  return blogInfo.map((item) => ({
    id: item.id,
    name: item.path,
  }));
};
const page = async ({ params }: { params: { name: string; id: number } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <MainBox mdId={params.id} />
    </Suspense>
  );
};

export default page;
