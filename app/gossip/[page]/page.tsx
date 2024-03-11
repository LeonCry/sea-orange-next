import { getCommentInGossip, getCommentNum } from '@/api/gossipPageApi';
import { GossipPageItem } from '@prisma/client';
import CommentItem from './_component/CommentItem';
import WriteBox from './_component/WriteBox';
import style from './page.module.scss';
export const generateStaticParams = async () => {
  const commentCount: number = await getCommentNum();
  const pages = Math.ceil(commentCount / 50);
  return Array.from({ length: pages }).map((t, i) => ({
    page: String(i + 1),
  }));
};
const page = async ({ params }: { params: { page: string } }) => {
  const comments: GossipPageItem[] = await getCommentInGossip(params.page);
  return (
    <section className={`${style.main}`}>
      <div className="flex-1 w-full overflow-auto flex flex-wrap justify-evenly gap-4">
        {comments.map((c, i) => (
          <CommentItem key={i} comment={c}></CommentItem>
        ))}
      </div>
      <WriteBox curPage={params.page} />
    </section>
  );
};

export default page;
