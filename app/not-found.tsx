"use client";
import Link from 'next/link';
import NotFound from '@/components/notFound/notFound';
import {Return} from "@icon-park/react";
const notFound = () => {
  return (
    <section className="text-2xl flex flex-col absolute top-[25%] w-full items-center gap-10">
        <NotFound />
        <Link href="/" className=" group w-10 h-10 cursor-none p-2 rounded-full bg-zinc-900 transition-all duration-500 hover:bg-zinc-700 hover:w-16 hover:h-16 hover:translate-y-[-12px] hover:rotate-[360deg] flex justify-center">
            <Return theme="outline" size="24" fill="#FFF" className="group-hover:rotate-[-360deg] group-hover:translate-y-3 transition-all duration-700 delay-200"/>
        </Link>
    </section>
  );
};

export default notFound;
