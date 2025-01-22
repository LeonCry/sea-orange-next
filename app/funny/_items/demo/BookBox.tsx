import clsx from 'clsx';
import style from './index.module.scss';
import { DropShadowLeft, DropShadowRight } from '@icon-park/react';
import { Dispatch, SetStateAction } from 'react';
const ntTraditionalArr = ['', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const numberText = Array.from({ length: 99 }, (_, i) => i + 1).map((index) => {
  const split = index.toString().split('');
  return ntTraditionalArr[+split[0]] + (split[1]?.length ? '拾' + ntTraditionalArr[+split[1]] : '');
});
const BookBox = ({
  innerClass,
  activeIndex,
  setPage,
  maxPage,
  currentPage,
}: {
  innerClass: string;
  activeIndex: number | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
  currentPage: number;
}) => {
  const handlePage = (page: number) => {
    setPage((n: number) => {
      const newPage = n + page;
      return newPage < 0 ? 0 : newPage > maxPage ? maxPage : newPage;
    });
  };
  return (
    <aside
      className={clsx([
        style.boxContainer,
        innerClass,
        'transition-all duration-500 ease-in-out top-0',
        activeIndex !== undefined && 'top-[200px]',
      ])}
    >
      <footer
        className={clsx([
          'bg-[#aca69e] w-[80%] h-[30%] left-[13%] z-0 absolute bottom-[10%]',
          style.paperBg,
        ])}
      ></footer>
      <footer
        className={clsx([
          'bg-[#c3bdb4] w-[5%] h-[35%] left-[9%] z-0 absolute bottom-[0%]',
          style.boxLeft,
          style.paperBg,
        ])}
      ></footer>
      <footer
        className={clsx([
          'bg-[#c3bdb4] w-[5%] h-[40%] left-[89%] absolute -bottom-[5%] z-[101] ',
          style.boxRight,
          style.orangeBg,
        ])}
      ></footer>
      <footer
        className={clsx([
          'bg-[#efe8dd] w-[80%] h-[30%] left-[10%] z-[101] absolute bottom-0',
          style.paperBg,
        ])}
      >
        <div className="w-full h-full flex justify-center items-center gap-32">
          <span className="text-2xl font-bold absolute top-5 left-5">
            {numberText[currentPage]}
          </span>
          <div
            className={clsx(['w-[160px] h-[160px] absolute top-5 right-5', style.openDay])}
          ></div>
          <DropShadowLeft
            theme="outline"
            size="54"
            fill="#333"
            className=" transition-all hover:scale-110 hover:-translate-x-3"
            onClick={() => handlePage(-1)}
          />
          <DropShadowRight
            theme="outline"
            size="54"
            fill="#333"
            className="transition-all hover:scale-110 hover:translate-x-3"
            onClick={() => handlePage(1)}
          />
        </div>
      </footer>
    </aside>
  );
};
export default BookBox;
