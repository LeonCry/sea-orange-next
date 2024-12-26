import { getBlogInfoById } from '@/api/blogPageApi';
import style from './MainBox.module.scss';
import Md from './Md';
import { unstable_cache } from 'next/cache';
import { BlogPageItem } from '@prisma/client';
import { BlogOption } from './BlogOption';
const MainBox = async ({ mdId }: { mdId: string }) => {
  const blogInfo: BlogPageItem = await unstable_cache(
    async () => await getBlogInfoById(parseInt(mdId)),
    [mdId],
    {
      tags: ['/blog' + mdId],
    }
  )();
  return (
    <>
      <BlogOption />
      <section className={`${style.main}`}>
        <Md blogInfo={blogInfo} />
      </section>
    </>
  );
};

export default MainBox;
