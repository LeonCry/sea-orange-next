import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
import AboutMe from './AboutMe';
export const metadata: Metadata = {
  description: getSectionDescription['/about']?.description,
};
const About = () => {
  return (
    <section className="page-dropDown fix-h">
      <AboutMe />
    </section>
  );
};

export default About;
