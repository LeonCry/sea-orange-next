'use server';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import { CodeBlock } from '../blog/[id]/_component/CodeBlock';
const AboutMe = async () => {
  const fs = require('fs').promises;
  const content = await fs.readFile('app/about/about.md', 'utf8');
  return (
    <section className="overflow-auto h-full w-[70%] ml-[15%]">
      <article className="overflow-auto p-14 pt-2">
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

export default AboutMe;
