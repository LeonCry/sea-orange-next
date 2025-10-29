'use server';
import '@/app/enter-fade.scss';
import '@/app/blog/[id]/_component/prose-md.scss';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import { CodeBlock } from '../blog/[id]/_component/CodeBlock';


const AboutMe = async () => {
  const fs = require('fs').promises;
  const content = await fs.readFile('app/about/about.en.md', 'utf8');
  return (
    <section className="h-full w-[70%] ml-[15%]">
      <article className="p-10 pt-2">
        <ReactMarkdown
          className=" prose prose-pre:bg-white prose-pre:p-0 !max-w-full enterFade"
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

export default AboutMe;
