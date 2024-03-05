import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
import SectionBox from './_component/SectionBox';
export const metadata: Metadata = {
  title: 'Sea Orange | ' + getSectionDescription['/funny']?.title,
  description: getSectionDescription['/funny']?.description,
};
const Funny = () => {
  return (
    <section className="page-dropDown">
      <SectionBox />
      <SectionBox />
      <SectionBox />
      <SectionBox />
      <div className="my-20" />
    </section>
  );
};

export default Funny;
