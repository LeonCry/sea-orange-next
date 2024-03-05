import style from './page.module.scss';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange.' + getSectionDescription['/funny']?.title,
  description: getSectionDescription['/funny']?.description,
};
const Funny = () => {
  return <></>;
};

export default Funny;
