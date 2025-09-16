import '../globals.css';
import style from './index.module.scss';
import RandomSpan from '@/components/randomSpan/RandomSpan';
import { friendLink } from '@/lib/frindLink';
import Image from 'next/image';
const About = () => {
  return (
    <section className="page-dropDown grid grid-cols-3 items-center gap-10 py-10 pt-24">
      {friendLink.map((item, index) => (
        <div
          key={index}
          className={`w-[500px] shrink-0 h-48 rounded-md bg-[#365eff1e] p-2 flex gap-2 ${style.main}`}
        >
          <Image src={item.icon} width={96} height={96} alt="icon" className="w-24 h-24 rounded-full bg-blue-200 shrink-0" />
          <aside className="flex-1 w-0 rounded-md h-full bg-[#365eff12] p-4 pr-1 leading-5 overflow-hidden">
            <h1 className={`${style.name} ${style.textRev} text-2xl font-bold relative pl-[30px]`}>{item.name}</h1>
            <p
              className={`${style.announce} ${style.textRev} text-gray-500 text-[14px] relative font-light mt-2 pl-[28px] pt-[3px] `}
            >
              {item.announce}
            </p>
            <a
              href={item.github}
              className={`${style.github} ${style.textRev} block text-[14px] mt-2 relative pl-[28px] pt-[3px] underline`}
            >
              {item.github}
            </a>
            <a
              href={item.home}
              className={`${style.home} ${style.textRev} block text-[14px] mt-2 relative pl-[28px] pt-[3px] underline`}
            >
              {item.home}
            </a>
          </aside>
        </div>
      ))}
      <RandomSpan />
    </section>
  );
};

export default About;
