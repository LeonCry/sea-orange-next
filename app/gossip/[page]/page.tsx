import { getCommentNum } from '@/api/gossipPageApi';
import WriteBox from './_component/WriteBox';
import { Suspense } from 'react';
import Main from './_component/MainBox';
import Loading from '@/components/loading/Loading';
export const generateStaticParams = async () => {
  const commentCount: number = await getCommentNum();
  const pages = Math.ceil(commentCount / 30);
  return Array.from({ length: pages }).map((t, i) => ({
    page: String(i + 1),
  }));
};
const page = async ({ params }: { params: { page: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Main page={params.page}>
        <WriteBox curPage={params.page} allComments={0} />
      </Main>
    </Suspense>
  );
};

export default page;
