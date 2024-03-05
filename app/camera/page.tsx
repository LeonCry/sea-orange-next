import style from './page.module.scss';
import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange | ' + getSectionDescription['/camera']?.title,
  description: getSectionDescription['/camera']?.description,
};
const Camera = () => {
  return <section className="page-dropDown"></section>;
};

export default Camera;
