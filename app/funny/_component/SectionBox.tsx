import { chakraEN } from '@/style/defineFont';
import ItemBox from './ItemBox';
const titleStyle = `w-full text-center text-2xl py-5 ${chakraEN.className}`;
const SectionBox = () => {
  return (
    <>
      <h1 className={titleStyle}> current focusing </h1>
      <article className="flex flex-wrap justify-evenly pb-16">
        <ItemBox />
        <ItemBox />
        <ItemBox />
        <ItemBox />
        <ItemBox />
      </article>
    </>
  );
};

export default SectionBox;
