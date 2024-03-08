import type { Metadata } from 'next';
import './globals.css';
import { baseEN, baseZN } from '@/style/defineFont';
import RootBar from '../components/rootBar/RootBar';
import Cursor from '@/components/cursor/Cursor';
import Header from '../components/header/Header';
import BackView from '../components/backgroundView/BackView';
import getSectionDescription from '@/lib/getSectionDescription';
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
    <html lang="en-US" className={`${baseEN.variable} ${baseZN.variable}`}>
      <body className="font-base bg-base-bg-color cursor-none h-svh">
        <Cursor />
        <RootBar />
        <Header sectionInfo={getSectionDescription} />
        {children}
        <BackView />
      </body>
    </html>
  );
}
