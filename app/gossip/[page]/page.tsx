import { getCommentNum } from '@/api/gossipPageApi';
import WriteBox from './_component/WriteBox';
import { Suspense } from 'react';
import Main from './_component/MainBox';
import Loading from '@/lotties/loading/Loading';
import RandomSpan from '@/components/randomSpan/RandomSpan';
export const dynamic = 'force-dynamic';
export const generateStaticParams = async () => {
  const commentCount: number = await getCommentNum();
  const pages = Math.ceil(commentCount / 30);
  return Array.from({ length: pages }).map((_, i) => ({
    page: String(i + 1),
  }));
};
const page = async ({ params }: { params: Promise<{ page: string }> }) => {
  const page = (await params).page;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Main
          page={page}
          renderItem={(pages: string, comments: number) => (
            <WriteBox curPage={pages} allComments={comments} />
          )}
        />
      </Suspense>
      <RandomSpan />
    </>
  );
};

export default page;
