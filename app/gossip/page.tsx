import '../globals.css';
import { Metadata } from 'next';
import getSectionDescription from '@/lib/getSectionDescription';
export const metadata: Metadata = {
  title: 'seaci.me | ' + getSectionDescription['/gossip']?.title,
  description: getSectionDescription['/gossip']?.description,
};
const Gossip = () => {
  return null;
};

export default Gossip;
