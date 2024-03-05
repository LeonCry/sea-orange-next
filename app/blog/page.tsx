import style from './page.module.scss';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange.' + getSectionDescription['/blog']?.title,
  description: getSectionDescription['/blog']?.description,
};
const Blog = () => {
  return <></>;
};

export default Blog;
