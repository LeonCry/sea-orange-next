import clsx from 'clsx';
import style from './index.module.scss';
const BookClip = () => {
  return (
    <aside className=" absolute left-[15%] w-[70%] h-full z-10">
      <div className="flex w-full h-[7%]">
        <div className={clsx([style.bookTop, 'bg-red-400'])} />
        <div className={clsx([style.clip, 'w-[200px] h-full bg-red-400'])} />
      </div>
      <div className="w-full h-[92%] bg-red-400 rounded-b-2xl rounded-tr-[2rem]"></div>
    </aside>
  );
};
export default BookClip;
