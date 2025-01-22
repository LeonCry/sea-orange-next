import clsx from 'clsx';
import style from './index.module.scss';
import '@/app/enter-fade.scss';
import { BookType } from '@/app/project/page';
import Md from '@/app/blog/[id]/_component/Md';
import { useRouter } from 'next/navigation';
const BookClip = ({
  index,
  bookInfo,
  activeIndex,
  isBookHidden,
  handleBookClipClick,
  rColor,
}: {
  index: number;
  bookInfo: BookType;
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
  const router = useRouter();
  const routerGo = (url: string) => {
    router.push(url);
  };
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
        transform: isBookHidden ? `translateY(${(index + 1) * 50}%)` : '',
        zIndex: 100 - index,
        color: rColor?.text,
      }}
    >
      <div className="flex w-full h-[7%]">
        <div
          className={clsx([
            style.bookTop,
            style.paperBg,
            'transition-[background-color] duration-500',
          ])}
          style={{ backgroundColor: rColor?.bg }}
        >
          <p className="h-full flex items-center gap-10 px-10">
            <span className="font-bold">PROJECT_NAME: {bookInfo.title}</span>
            <span className="font-bold">CATEGORY: {bookInfo.category}</span>
            <span className="ml-auto font-light text-[16px]">RECORD_TIME:{bookInfo.time}</span>
          </p>
        </div>
        <div
          data-ignore
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
            'w-full h-full relative p-4 leading-[60px] text-[20px] font-[400]',
            activeIndex === index ? 'enterFade overflow-auto' : 'levelFade overflow-hidden',
          ])}
        >
          <Md blogInfo={{ content: bookInfo.description }} />
          {bookInfo.type === 'PROJECT' ? (
            activeIndex === index && <iframe src={bookInfo.url} className="w-full aspect-video" />
          ) : (
            <button
              onClick={() => routerGo('/funny/' + bookInfo.url)}
              className="mt-10 ml-[40%] px-2 py-1 border cursor-none rounded-md box-trigger"
              style={{
                backgroundColor: rColor?.text,
                color: rColor?.bg,
              }}
            >
              跳转至该项目
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
export default BookClip;
