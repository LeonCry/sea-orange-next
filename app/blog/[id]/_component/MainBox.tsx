import { getBlogInfoById } from '@/api/blogPageApi';
import style from './MainBox.module.scss';
import Md from './Md';
import { BlogPageItem } from '@prisma/client';
const MainBox = async ({ mdId }: { mdId: number }) => {
  const blogInfo: BlogPageItem = await getBlogInfoById(mdId);
  return (
    <section className={`${style.main} drop-animation`}>
      <Md blogInfo={blogInfo} />
    </section>
  );
};

export default MainBox;
