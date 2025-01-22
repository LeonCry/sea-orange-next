import './prose-md.scss';
import '@/app/enter-fade.scss';
import style from './MainBox.module.scss';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import clsx from 'clsx';
const Md = ({
  blogInfo,
  importInnerClass,
}: {
  blogInfo: { content: string };
  importInnerClass?: string;
}) => {
  const { content } = blogInfo;
  return (
    <section className="overflow-auto pt-10">
      <article className={style.md}>
        <ReactMarkdown
          className={clsx([
            'prose prose-pre:bg-white prose-pre:overflow-auto prose-pre:p-0 !max-w-full enterFade',
            importInnerClass,
          ])}
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
