import { BlogPageItem } from '@prisma/client';
import style from './MainBox.module.scss';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import Link from 'next/link';
import { LinkLeft } from '@icon-park/react';
const Md = ({ blogInfo }: { blogInfo: BlogPageItem }) => {
  const { content } = blogInfo;
  return (
    <section className=" overflow-auto">
      <Link
        className=" absolute top-0 left-0 cursor-none transition-all duration-300 hover:rotate-[375deg]"
        href={'/blog'}
      >
        <LinkLeft theme="outline" size="20" fill="#000000" />
      </Link>
      <article className={style.md}>
        <ReactMarkdown
          className=" prose prose-pre:bg-white prose-pre:overflow-auto prose-pre:p-0 !max-w-full"
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[gfm]}
          components={CodeBlock}
        >
          {content as any}
        </ReactMarkdown>
      </article>
    </section>
  );
};

export default Md;
