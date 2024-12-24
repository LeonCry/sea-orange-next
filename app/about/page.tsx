import '../globals.css';
import AboutMe from './AboutMe';
import RandomSpan from '@/components/randomSpan/RandomSpan';
const About = () => {
  return (
    <section className="page-dropDown fix-h">
      <AboutMe />
      <RandomSpan />
    </section>
  );
};

export default About;
