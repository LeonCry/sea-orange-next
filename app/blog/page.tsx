import '../globals.css';
import { blogOrders } from '@/lib/getCategoryOrder';
import { BlogPageItem } from '@prisma/client';
import { getAllBlogInfo } from '@/api/blogPageApi';
import { group, sort } from 'radash';
import SectionBox from '@/components/sectionBox/SectionBox';
import ItemBox from './_component/ItemBox';
import RandomSpan from '@/components/randomSpan/RandomSpan';
const Blog = async () => {
  const res: BlogPageItem[] = await getAllBlogInfo();
  const projectInfo = sort(res, (r) => blogOrders.indexOf(r.category));
  const category = group(projectInfo, (p) => p.category);
  return (
    <section className="page-dropDown">
      {Object.keys(category).map((cty, i) => (
        <SectionBox key={i} title={cty}>
          {category[cty]!.map((p, i) => (
            <ItemBox key={i} projectInfo={p} />
          ))}
        </SectionBox>
      ))}
      <div className="my-20" />
      <RandomSpan />
    </section>
  );
};

export default Blog;
