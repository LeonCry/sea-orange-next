import style from './page.module.scss';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange.' + getSectionDescription['/about']?.title,
  description: getSectionDescription['/about']?.description,
};
const About = () => {
  return <></>;
};

export default About;
