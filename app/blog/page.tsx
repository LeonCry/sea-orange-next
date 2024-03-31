import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
import { groupBy } from 'lodash';
import SectionBox from './_component/SectionBox';
import { revalidatePath } from 'next/cache';
export const metadata: Metadata = {
  title: 'seaci.me | ' + getSectionDescription['/blog']?.title,
  description: getSectionDescription['/blog']?.description,
};
const Blog = async () => {
  const projectInfo: BlogPageItem[] = await getAllBlogInfo();
  const category = groupBy(projectInfo, 'category');
  revalidatePath('/blog');
  return (
    <section className="page-dropDown">
      {Object.keys(category).map((cty, i) => (
        <SectionBox key={i} projects={category[cty]} title={cty} />
      ))}
      <div className="my-20" />
    </section>
  );
};

export default Blog;
