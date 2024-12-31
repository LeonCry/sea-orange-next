import { chakraEN } from '@/style/defineFont';
import { memo } from 'react';
import '@/app/enter-fade.scss';
const titleStyle = `w-full text-center text-2xl py-5 ${chakraEN.className}`;
const SectionBox = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
      <>
        <h1 className={titleStyle}> {title} </h1>
        <article className="flex flex-wrap justify-evenly pb-16 gap-16 enterFade ">
          {children}
        </article>
      </>
    );
  },
  (p, n) => {
    return p.title === n.title;
  }
);
SectionBox.displayName = 'SectionBox';
export default SectionBox;
