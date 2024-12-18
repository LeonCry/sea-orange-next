import type { Metadata } from 'next';
import './globals.css';
import { baseEN, baseZN } from '@/style/defineFont';
import RootBar from '../components/rootBar/RootBar';
import Cursor from '@/components/cursor/Cursor';
import Header from '../components/header/Header';
import BackView from '../components/backgroundView/BackView';
export const metadata: Metadata = {
  title: 'seaci.me',
  keywords: ['seaci', 'blog', 'seaci.me', 'funny', 'camera', 'gossip', 'project'],
  description:
    'welcome to visit seaci.me, a collection of several small features, some front-end demos and learning notes on a personal website! ',
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${baseEN.variable} ${baseZN.variable}`}>
      <body className="font-base bg-base-bg-color cursor-none h-svh overflow-x-hidden">
        <main className="flex flex-col-reverse">
          {children}
          <div className="min-h-16">
            <RootBar />
            <Header />
          </div>
        </main>
        <BackView />
        <Cursor />
      </body>
    </html>
  );
}
