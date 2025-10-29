import '../globals.css';
import AboutMe from './AboutMe';
import RandomSpan from '@/components/randomSpan/RandomSpan';
import LangToggle from './_component/LanguageToggle';

const About = ({ searchParams }: { searchParams?: { lang?: string } }) => {
  const lang = searchParams?.lang === 'zh' ? 'zh' : 'en'; 
  return (
    <section className="page-dropDown fix-h">
      <LangToggle />
      <AboutMe lang={lang as 'en' | 'zh'} />
      <RandomSpan />
    </section>
  );
};

export default About;
