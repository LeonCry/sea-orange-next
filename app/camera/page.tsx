import style from './page.module.scss';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange.' + getSectionDescription['/camera']?.title,
  description: getSectionDescription['/camera']?.description,
};
const Camera = () => {
  return <></>;
};

export default Camera;
