import { Suspense } from 'react';
import MainBox from './_component/MainBox';
import Loading from '@/lotties/loading/Loading';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
import { unstable_cacheTag as cacheTag } from 'next/cache';
export const generateStaticParams = async () => {
  const blogInfo: BlogPageItem[] = await getAllBlogInfo();
  return blogInfo.map((item) => ({
    id: item.id + '',
  }));
};
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  'use cache';
  const id = (await params).id;
  cacheTag('/blog' + id);
  return (
    <Suspense fallback={<Loading />}>
      <MainBox mdId={id} />
    </Suspense>
  );
};

export default page;
