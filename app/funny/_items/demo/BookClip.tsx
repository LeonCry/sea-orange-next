import clsx from 'clsx';
import style from './index.module.scss';
const BookClip = ({ index, bookInfo }: { index: number; bookInfo: any }) => {
  return (
    <aside
      className={clsx(['absolute w-[70%] left-[12%] h-full z-10', style[`clipAni${index}`]])}
      style={{ left: `${12 + index * 3}%`, top: `${40 - index * 12}%`, zIndex: 100 - index }}
    >
      <div className="flex w-full h-[7%]">
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
