import style from './page.module.scss';
import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'Sea Orange | ' + getSectionDescription['/gossip']?.title,
  description: getSectionDescription['/gossip']?.description,
};
const Gossip = () => {
  return <section className="page-dropDown"></section>;
};

export default Gossip;
