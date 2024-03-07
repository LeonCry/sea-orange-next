'use client';
import { usePathname } from 'next/navigation';
import { chakraEN } from '@/style/defineFont';
import { ReactTyped } from 'react-typed';
const Header = ({ sectionInfo }: { sectionInfo: Record<string, any> }) => {
  const pathName = usePathname();
  const curSection = sectionInfo[pathName];
  return (
    <section>
      <h1 className={`text-center w-full text-3xl font-bold pb-2 ${chakraEN.className}`}>{curSection?.title}</h1>
      <div className="pb-1 border-dotted border-b-2 text-right pr-3 mb-5">
        <ReactTyped strings={[curSection?.description]} typeSpeed={30} cursorChar="_" />
      </div>
    </section>
  );
};

export default Header;
