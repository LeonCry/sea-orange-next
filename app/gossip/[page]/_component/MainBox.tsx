import { getCommentInGossip, getCommentNum } from '@/api/gossipPageApi';
import { GossipPageItem } from '@prisma/client';
import CommentItem from './CommentItem';
import '@/app/enter-fade.scss';
import style from './Main.module.scss';
import CursorScope from '@/components/cursor/CursorScope';
const Main = async ({
  page,
  renderItem,
}: {
  page: string;
  renderItem: (pages: string, comments: number) => React.ReactElement;
}) => {
  const comments: GossipPageItem[] = await getCommentInGossip(page);
  const commentCount: number = await getCommentNum();
  const addPropChildren = renderItem(page, commentCount);
  return (
    <CursorScope className={`${style.main}`}>
      <div className={`flex-1 w-full overflow-auto relative enterFade ${style.grid}`}>
        {comments.map((c, i) => (
          <CommentItem key={i} comment={c} />
        ))}
      </div>
      {addPropChildren}
    </CursorScope>
  );
};

export default Main;
