import clsx from 'clsx';
import style from './index.module.scss';
const BookBox = ({
  innerClass,
  activeIndex,
}: {
  innerClass: string;
  activeIndex: number | undefined;
}) => {
  return (
    <aside
      className={clsx([
        style.boxContainer,
        innerClass,
        'transition-all duration-500 ease-in-out top-0',
        activeIndex !== undefined && 'top-[200px]',
      ])}
    >
      <footer className="bg-[#aca69e] w-[80%] h-[30%] left-[13%] z-0 absolute bottom-[10%]"></footer>
      <footer
        className={clsx([
          'bg-[#c3bdb4] w-[5%] h-[35%] left-[9%] z-0 absolute bottom-[0%]',
          style.boxLeft,
        ])}
      ></footer>
      <footer
        className={clsx([
          'bg-[#c3bdb4] w-[5%] h-[40%] left-[89%] absolute -bottom-[5%] z-[101] ',
          style.boxRight,
        ])}
      ></footer>
      <footer className="bg-[#efe8dd] w-[80%] h-[30%] left-[10%] z-[101] absolute bottom-0"></footer>
    </aside>
  );
};
export default BookBox;
