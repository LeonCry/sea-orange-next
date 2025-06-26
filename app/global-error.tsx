'use client';
import dynamic from 'next/dynamic';
import {Power, Refresh} from '@icon-park/react';
import './globals.css';
import Link from 'next/link';

const ErrorMark = dynamic(() => import('@/lotties/error/errorMark'));
const SearchFolder = dynamic(() => import('@/lotties/error/searchFolder'));

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="w-full h-full flex flex-col items-center justify-center gap-20">
        <SearchFolder />
        <div className="flex gap-2 items-center">
            <ErrorMark />
            <h3 className="text-xl">Something went wrong! Please try again or exit. </h3>
        </div>
        <div className="w-full h-24 relative">
            <button onClick={()=>reset()} className="absolute left-[40%] border-none group w-10 h-10 cursor-none p-2 rounded-full bg-zinc-900 transition-all duration-500 hover:bg-zinc-700 hover:w-16 hover:h-16 hover:translate-y-[-12px] hover:rotate-[360deg] flex justify-center">
                <Refresh theme="outline" size="24" fill="#FFF" className="group-hover:rotate-[-360deg] group-hover:translate-y-3 transition-all duration-700 delay-200"/>
            </button>
            <Link href="/" className="absolute right-[40%] group w-10 h-10 cursor-none p-2 rounded-full bg-zinc-900 transition-all duration-500 hover:bg-zinc-700 hover:w-16 hover:h-16 hover:translate-y-[-12px] hover:rotate-[360deg] flex justify-center">
                <Power theme="outline" size="24" fill="#FFF" className="group-hover:rotate-[-360deg] group-hover:translate-y-3 transition-all duration-700 delay-200"/>
            </Link>
        </div>
      </body>
    </html>
  );
}
