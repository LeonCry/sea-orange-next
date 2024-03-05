import style from './page.module.scss';
import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange | ' + getSectionDescription['/project']?.title,
  description: getSectionDescription['/project']?.description,
};
const Project = () => {
  return <section className="page-dropDown"></section>;
};

export default Project;
