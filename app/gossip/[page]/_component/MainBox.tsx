import { getCommentInGossip, getCommentNum } from '@/api/gossipPageApi';
import { GossipPageItem } from '@prisma/client';
import CommentItem from './CommentItem';
import style from './Main.module.scss';
import { cloneElement } from 'react';
const Main = async ({ page, children }: { page: string; children: React.ReactElement }) => {
  const comments: GossipPageItem[] = await getCommentInGossip(page);
  const commentCount: number = await getCommentNum();
  const addPropChildren = cloneElement(children, { allComments: commentCount });
  return (
    <section className={`${style.main}`}>
      <div className="flex-1 w-full overflow-auto flex flex-wrap justify-evenly gap-10 relative">
        {comments.map((c, i) => (
          <CommentItem key={i} comment={c} />
        ))}
      </div>
      {addPropChildren}
    </section>
  );
};

export default Main;
