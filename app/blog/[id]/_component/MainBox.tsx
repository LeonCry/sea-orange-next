import { getBlogInfoById } from '@/api/blogPageApi';
import style from './MainBox.module.scss';
import Md from './Md';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { BlogPageItem } from '@prisma/client';
import { ReadTime } from './ReadTime';
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
      <Link
        className={`${style.exit} z-[9999] absolute top-2 left-4 cursor-none transition-all duration-500 px-2 py-2 w-24 text-center rounded box-trigger`}
        href={'/blog'}
      >
        EXIT
      </Link>
      <ReadTime />
      <section className={`${style.main}`}>
        <Md blogInfo={blogInfo} />
      </section>
    </>
  );
};

export default MainBox;
