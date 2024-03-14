'use client';
import { BlogPageItem } from '@prisma/client';
import 'github-markdown-css';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { insertMd } from '@/api/blogPageApi';
const Md = ({ blogInfo }: { blogInfo: BlogPageItem }) => {
  const { name, category, content } = blogInfo;
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const markdownContent = e.target!.result;
      console.log('markdownContent', markdownContent);
      const data = {
        name: 'test',
        description: 'ttteeesssttt',
        icon: 'Game',
        path: 'test',
        sorted: 1,
        isShow: true,
        category: 'TEST',
        file: 'none',
        content: markdownContent,
      };
      insertMd(data as BlogPageItem);
    };
    reader.readAsText(file);
  };
  return (
    <section>
      <input type="file" onChange={handleChange}></input>
      <ReactMarkdown className="prose" rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]}>
        {content}
      </ReactMarkdown>
    </section>
  );
};

export default Md;
