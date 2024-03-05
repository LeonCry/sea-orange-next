import style from './page.module.scss';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange.' + getSectionDescription['/project']?.title,
  description: getSectionDescription['/project']?.description,
};
const Project = () => {
  return <></>;
};

export default Project;
