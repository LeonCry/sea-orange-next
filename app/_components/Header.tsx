'use client';
import { usePathname } from 'next/navigation';
const Header = ({ sectionInfo }: { sectionInfo: Record<string, any>[] }) => {
  const pathName = usePathname();
  const curSection = sectionInfo.find((item) => item.path === pathName);
  return (
    <section>
      <h1 className="text-center w-full text-3xl font-bold pb-2">{curSection?.title}</h1>
      <p className="pb-1 border-dotted border-b-2 text-right pr-3 mb-5">{curSection?.description}</p>
    </section>
  );
};

export default Header;
