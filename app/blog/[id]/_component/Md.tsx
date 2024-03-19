'use client';
import { BlogPageItem } from '@prisma/client';
import style from './MainBox.module.scss';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
const Md = ({ blogInfo }: { blogInfo: BlogPageItem }) => {
  const { content } = blogInfo;
  return (
    <section className={style.md}>
      <ReactMarkdown
        className=" prose prose-pre:bg-white prose-pre:overflow-auto prose-pre:p-0 !max-w-full"
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm]}
        components={CodeBlock}
      >
        {content as any}
      </ReactMarkdown>
    </section>
  );
};

export default Md;
