import '../globals.css';
import AboutInfo from './info';
import AboutMe from './AboutMe';
import RandomSpan from '@/components/randomSpan/RandomSpan';
import { getAllProjectsFromFunny } from '@/api/funnyPageApi';
import type { FunnyPageItem } from '@prisma/client';

const About = async () => {
  const data: FunnyPageItem[] = await getAllProjectsFromFunny();
  const infoItem = data.find((item) => item.name === '[INFO]');
  const infoPath = infoItem?.path || null;

  return (
    <section className="page-dropDown fix-h !px-4 relative">
      <AboutInfo infoPath={infoPath} />
      <AboutMe />
      <RandomSpan />
    </section>
  );
};

export default About;
