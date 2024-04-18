import '../globals.css';
import { blogOrders } from '@/lib/getCategoryOrder';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
import { groupBy } from 'lodash';
import SectionBox from '@/components/sectionBox/SectionBox';
import ItemBox from './_component/ItemBox';
import { revalidatePath } from 'next/cache';
const Blog = async () => {
  const projectInfo: BlogPageItem[] = await getAllBlogInfo();
  projectInfo.sort((a, b) => blogOrders.indexOf(a.category) - blogOrders.indexOf(b.category));
  const category = groupBy(projectInfo, 'category');
  revalidatePath('/blog');
  return (
    <section className="page-dropDown">
      {Object.keys(category).map((cty, i) => (
        <SectionBox key={i} title={cty}>
          {category[cty].map((p, i) => (
            <ItemBox key={i} projectInfo={p} />
          ))}
        </SectionBox>
      ))}
      <div className="my-20" />
    </section>
  );
};

export default Blog;
