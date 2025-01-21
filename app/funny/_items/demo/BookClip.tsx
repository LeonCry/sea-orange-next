import clsx from 'clsx';
import style from './index.module.scss';
const BookClip = ({
  index,
  bookInfo,
  activeIndex,
  handleBookClipClick,
}: {
  index: number;
  bookInfo: any;
  activeIndex: number | undefined;
  handleBookClipClick: (index: number, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
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
        'absolute w-[70%] left-[12%] h-full z-10',
        style[`clipAni${index}`],
        clipActiveStyle,
      ])}
      style={{ left: `${12 + index * 3}%`, top: `${40 - index * 12}%`, zIndex: 100 - index }}
    >
      <div className="flex w-full h-[7%]" data-ignore>
        <div className={style.bookTop} style={{ backgroundColor: bookInfo.color }} />
        <div className={style.clip} style={{ backgroundColor: bookInfo.color }} />
      </div>
      <div
        className="w-full h-[92%] rounded-b-2xl rounded-tr-[2rem]"
        style={{ backgroundColor: bookInfo.color }}
      ></div>
    </aside>
  );
};
export default BookClip;
