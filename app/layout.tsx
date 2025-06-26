import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import { baseEN, baseZN } from '@/style/defineFont';
import RootBar from '../components/rootBar/RootBar';
import Cursor from '@/components/cursor/Cursor';
import Header from '../components/header/Header';
import BackView from '../components/backgroundView/BackView';
export const metadata: Metadata = {
  title: 'voidis.me',
  keywords: ['voidis', 'blog', 'voidis.me', 'funny', 'camera', 'gossip', 'project'],
  description:
    'welcome to visit voidis.me, a collection of several small features, some front-end demos and learning notes on a personal website! ',
  openGraph: {
    title: 'voidis.me',
    description:
      'voidis.me is a collection of several small features, some front-end demos and learning notes on a personal website! ',
    images: [
      {
        url: '/public/images/orange.svg',
        width: 100,
        height: 100,
        alt: 'voidis.me',
        type: 'image/svg',
      },
    ],
    url: 'https://www.voidis.me',
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${baseEN.variable} ${baseZN.variable}`}>
      <body className="font-base bg-base-bg-color cursor-none h-svh overflow-hidden">
        <NuqsAdapter>
          <main className="flex flex-col-reverse h-screen z-10 relative">
            <div id="overflow-container" className="flex-1 overflow-auto">
              {children}
            </div>
            <div className="min-h-16 !shrink-0">
              <RootBar />
              <Header />
            </div>
          </main>
          <BackView />
          <Cursor />
        </NuqsAdapter>
      </body>
    </html>
  );
}
