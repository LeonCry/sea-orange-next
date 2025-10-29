import '../globals.css';
import AboutMe from './AboutMe';
import RandomSpan from '@/components/randomSpan/RandomSpan';

const About = ({ searchParams }: { searchParams?: { lang?: string } }) => {
  const lang = searchParams?.lang === 'zh' ? 'zh' : 'en'; 
  return (
    <section className="page-dropDown fix-h">
      <AboutMe />
      <RandomSpan />
    </section>
  );
};

export default About;
