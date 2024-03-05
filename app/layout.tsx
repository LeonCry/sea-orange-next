import type { Metadata } from 'next';
import './globals.css';
import { baseEN, baseZN } from '@/style/defineFont';
import RootBar from '../components/rootBar/RootBar';
import Cursor from '@/components/cursor/Cursor';
import dynamic from 'next/dynamic';
import Header from '../components/header/Header';
import getSectionDescription from '@/lib/getSectionDescription';
import TextButton from '../components/TextButton';
//懒加载,pixi.js在服务端渲染会报错:worker is not defined
const BackView = dynamic(() => import('../components/backgroundView/BackView'), { ssr: false });
export const metadata: Metadata = {
  title: 'Sea Orange',
  description:
    'welcome to visit sea orange, a collection of several small features, some front-end demos and learning notes on a personal website! ',
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cn" className={`${baseEN.variable} ${baseZN.variable}`}>
      <body className="font-base bg-base-bg-color cursor-none h-svh">
        <Cursor />
        <RootBar />
        <Header sectionInfo={getSectionDescription} />
        {children}
        <BackView />
        <TextButton />
      </body>
    </html>
  );
}
