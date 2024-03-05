import style from './blog.module.scss';
import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange | ' + getSectionDescription['/blog']?.title,
  description: getSectionDescription['/blog']?.description,
};
const Blog = () => {
  return <section className="page-dropDown"></section>;
};

export default Blog;
