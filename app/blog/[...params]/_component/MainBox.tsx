import { getBlogInfoById } from '@/api/blogPageApi';
import style from './MainBox.module.scss';
const MainBox = async ({ mdId }: { mdId: number }) => {
  const blogInfo = await getBlogInfoById(mdId);
  console.log('blogInfo:', blogInfo);
  return <></>;
};

export default MainBox;
