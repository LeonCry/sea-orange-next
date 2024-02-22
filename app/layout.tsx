import type { Metadata } from 'next';
import './globals.css';
import { baseEN, baseZN } from '@/style/defineFont';
import RootBar from './_components/RootBar';
export const metadata: Metadata = {
  title: 'Sea Orange',
  description: 'welcome to visit sea orange, a collection of several small features, some front-end demos and learning notes on a personal website! ',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cn" className={`${baseEN.variable} ${baseZN.variable}`}>
      <body className="font-base bg-base-bg-color">
        <RootBar />
        {children}
      </body>
    </html>
  );
}
