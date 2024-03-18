import style from './page.module.scss';
import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'seaci.me | ' + getSectionDescription['/about']?.title,
  description: getSectionDescription['/about']?.description,
};
const About = () => {
  return <section className="page-dropDown"></section>;
};

export default About;
