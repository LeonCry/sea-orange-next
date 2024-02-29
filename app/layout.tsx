import type { Metadata } from 'next';
import './globals.css';
import { baseEN, baseZN } from '@/style/defineFont';
import RootBar from './_components/RootBar';
import Cursor from '@/components/cursor/Cursor';
import dynamic from 'next/dynamic';
//懒加载,pixi.js在服务端渲染会报错:worker is not defined
const BackView = dynamic(() => import('./_background/BackView'), { ssr: false });
export const metadata: Metadata = {
  title: 'Sea Orange',
  description:
    'welcome to visit sea orange, a collection of several small features, some front-end demos and learning notes on a personal website! ',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cn" className={`${baseEN.variable} ${baseZN.variable}`}>
      <body className="font-base bg-base-bg-color cursor-none h-svh">
        <Cursor />
        <RootBar />
        {children}
        <BackView />
      </body>
    </html>
  );
}
