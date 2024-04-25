'use client';
import { usePathname } from 'next/navigation';
import { chakraEN } from '@/style/defineFont';
import { ReactTyped } from 'react-typed';
import { memo, useEffect } from 'react';
import { AppProgressBar } from 'next-nprogress-bar';
import { getSectionDescription, type SectionType } from '@/lib/getSectionDescription';
const Header = () => {
  const pathName = usePathname();
  const secPath = '/' + pathName.split('/')[1];
  if (!secPath) return;
  let curSection: SectionType[string] | undefined = getSectionDescription[secPath];
  if (
    pathName.split('/').length > 2 &&
    (curSection.title === 'FuNnY' || curSection.title === 'bLoG')
  ) {
    curSection = undefined;
  }
  return (
    <section>
      <AppProgressBar height="2px" color="#4F46E5" options={{ showSpinner: false }} />
      {curSection && (
        <div>
          <h1 className={`text-center w-full text-3xl font-bold pb-2 ${chakraEN.className}`}>
            {curSection?.title}
          </h1>
          <div className="pb-1 border-dotted border-b-2 text-right pr-3 mb-5">
            <ReactTyped strings={[curSection?.description]} typeSpeed={30} cursorChar="_" />
          </div>
        </div>
      )}
    </section>
  );
};
Header.displayName = 'Header';
export default Header;
