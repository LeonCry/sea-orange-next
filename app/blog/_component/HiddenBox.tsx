'use client';
import { useState } from 'react';
import { chakraEN } from '@/style/defineFont';
import ItemBox from './ItemBox';
const IconPark = dynamic(() => import('@/components/dynamicComponents/IconPark'));
import { BlogPageItem } from '@prisma/client';
import dynamic from 'next/dynamic';
const HiddenBox = ({
    cty,
    category,
}: {
    cty: string;
    category: BlogPageItem[];
}) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <section className='flex flex-col py-8 mb-8 border-b-2'>
            <h1 data-hover className={chakraEN.className + ' !w-[400px] self-center text-center text-2xl py-2 rounded-full flex items-center justify-center gap-4'} onClick={() => setIsShow(!isShow)}>
                <span>{cty}</span>
                <IconPark icon={isShow ? 'School' : 'GoEnd'} size={24} className="" />
            </h1>
            <article className={`flex flex-wrap justify-evenly pb-16 gap-16 enterFade ${isShow ? 'block' : 'hidden'}`}>
                {category!.map((p, i) => (
                    <ItemBox key={i} projectInfo={p} />
                ))}
            </article>
        </section>
    );
};

export default HiddenBox;
