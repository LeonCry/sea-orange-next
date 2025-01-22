import clsx from 'clsx';
import style from './index.module.scss';
import '@/app/enter-fade.scss';
const BookClip = ({
  index,
  bookInfo,
  activeIndex,
  isBookHidden,
  handleBookClipClick,
  rColor,
}: {
  index: number;
  bookInfo: any;
  activeIndex: number | undefined;
  isBookHidden: boolean;
  handleBookClipClick: (index: number, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  rColor: { bg: string; text: string };
}) => {
  const clipActiveStyle =
    activeIndex === undefined
      ? style.normal
      : activeIndex === index
      ? style[`active${index}`]
      : style.noActive;
  return (
    <aside
      onClick={(e) => handleBookClipClick(index, e)}
      data-book
      className={clsx([
        'absolute w-[70%] left-[12%] h-full z-10 transition-all duration-500 ease-in-out',
        style[`clipAni${index}`],
        clipActiveStyle,
      ])}
      style={{
        left: `${12 + index * 3}%`,
        top: `${40 - index * 12}%`,
        transform: isBookHidden ? 'translateY(100%)' : '',
        zIndex: 100 - index,
        color: rColor?.text,
      }}
    >
      <div className="flex w-full h-[7%]" data-ignore>
        <div
          className={clsx([
            style.bookTop,
            style.paperBg,
            'transition-[background-color] duration-500',
          ])}
          style={{ backgroundColor: rColor?.bg }}
        >
          <p className="h-full flex items-center gap-10 px-10">
            <span className="font-bold">PROJECT_NAME: 你好{index}</span>
            <span className="font-bold">CATEGORY: 你好{index}</span>
            <span className="ml-auto font-light text-[16px]">RECORD_TIME: 2024-01-01</span>
          </p>
        </div>
        <div
          className={clsx([
            style.clip,
            style.paperBg,
            'transition-[background-color] duration-500',
          ])}
          style={{ backgroundColor: rColor?.bg }}
        />
      </div>
      <div
        className={clsx([
          'w-full h-[92%] p-4 pb-[5%] rounded-b-2xl rounded-tr-[2rem] -mt-[1%]',
          style.paperBg,
          'transition-[background-color] duration-500',
        ])}
        style={{ backgroundColor: rColor?.bg }}
      >
        <div
          className={clsx([
            'w-full h-full relative',
            activeIndex === index ? 'enterFade overflow-auto' : 'levelFade overflow-hidden',
          ])}
        ></div>
      </div>
    </aside>
  );
};
export default BookClip;
