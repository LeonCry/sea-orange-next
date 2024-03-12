import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
import { groupBy } from 'lodash';
import SectionBox from './_component/SectionBox';
export const metadata: Metadata = {
  title: 'Sea Orange | ' + getSectionDescription['/blog']?.title,
  description: getSectionDescription['/blog']?.description,
};
const Blog = async () => {
  const projectInfo: BlogPageItem[] = await getAllBlogInfo();
  const category = groupBy(projectInfo, 'category');
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
