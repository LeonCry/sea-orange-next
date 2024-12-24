import { Suspense } from 'react';
import MainBox from './_component/MainBox';
import Loading from '@/lotties/loading/Loading';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
import RandomSpan from '@/components/randomSpan/RandomSpan';
export const generateStaticParams = async () => {
  const blogInfo: BlogPageItem[] = await getAllBlogInfo();
  return blogInfo.map((item) => ({
    id: item.id + '',
  }));
};
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MainBox mdId={id} />
      </Suspense>
      <RandomSpan />
    </>
  );
};

export default page;
