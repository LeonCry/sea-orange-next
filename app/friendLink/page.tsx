import '../globals.css';
import style from './index.module.scss';
import RandomSpan from '@/components/randomSpan/RandomSpan';
import { friendLink } from '@/lib/frindLink';
import clsx from 'clsx';
import Image from 'next/image';
const About = () => {
  return (
    <section className="page-dropDown flex flex-wrap items-center gap-10 py-10 pt-4">
      {friendLink.map((item, index) => (
        <div
          key={index}
          className={style.main}
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
      <div
        className={clsx(style.beInvited, 'group')}
      >
        WANT TO BE LINKED?
        <div className='opacity-0 group-hover:opacity-100 transition-all duration-1000 p-2 '>
          <br />
          1.fork the project:
          <br />
          https://github.com/LeonCry/sea-orange-next
          <br /><br />
          2.create a new branch:
          <br />
          friend-link-%yourname%
          <br /><br />
          3. edit the file:  /lib/frindLink.ts,
          <br />
          and add a new item like this:
          <br /><br />
          <pre>
            {`{
  name: 'yourname',
  //your github avatar
  icon: 'https://avatars.githubusercontent.com/xxx?',
  announce: 'your announce',
  github: 'https://github.com/yourname', 
  home: 'https://yourhomepage',
},`}
          </pre>
          <br />
          4.push your changes
          <br /><br />
          5.create a pull request
        </div>
        <br /><br />
        OR just email me: lbh_ldu@outlook.com
      </div>
    </section>
  );
};

export default About;
