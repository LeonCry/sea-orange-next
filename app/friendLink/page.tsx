import '../globals.css';
import style from './index.module.scss';
import RandomSpan from '@/components/randomSpan/RandomSpan';
import { friendLink } from '@/lib/frindLink';
const About = () => {
  return (
    <section className="page-dropDown flex flex-wrap items-center gap-10 py-10 pt-24 justify-evenly">
      {friendLink.map((item, index) => (
        <div
          key={index}
          className={`w-[500px] shrink-0 h-48 rounded-md bg-[#365eff1e] p-2 flex gap-2 ${style.main}`}
        >
          <aside
            className="w-24 h-24 rounded-full bg-blue-200 shrink-0"
            style={{
              backgroundImage: `url(${item.icon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <aside className="flex-1 w-0 rounded-md h-full bg-[#365eff12] p-4 pr-1 leading-5 overflow-hidden">
            <h1 className={`${style.name} text-2xl font-bold relative pl-[30px]`}>{item.name}</h1>
            <p
              className={`${style.announce} text-gray-500 text-[14px] relative font-light mt-2 pl-[28px] pt-[3px]`}
            >
              {item.announce}
            </p>
            <a
              href={item.github}
              className={`${style.github} text-pink-500 block text-[14px] mt-2 relative pl-[28px] pt-[3px] underline`}
            >
              {item.github}
            </a>
            <a
              href={item.home}
              className={`${style.home} text-pink-500 block text-[14px] mt-2 relative pl-[28px] pt-[3px] underline`}
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
