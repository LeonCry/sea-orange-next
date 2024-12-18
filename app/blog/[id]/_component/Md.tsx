import { BlogPageItem } from '@prisma/client';
import './prose-md.scss';
import '@/app/enter-fade.scss';
import style from './MainBox.module.scss';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
const Md = ({ blogInfo }: { blogInfo: BlogPageItem }) => {
  const { content } = blogInfo;
  return (
    <section className="overflow-auto">
      <article className={style.md}>
        <ReactMarkdown
          className="prose prose-pre:bg-white prose-pre:overflow-auto prose-pre:p-0 !max-w-full enterFade"
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[gfm]}
          components={CodeBlock}
        >
          {content}
        </ReactMarkdown>
      </article>
    </section>
  );
};

export default Md;
