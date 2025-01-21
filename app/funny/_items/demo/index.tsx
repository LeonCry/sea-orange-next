'use client';
import { useState } from 'react';
import BookBox from './BookBox';
import BookClip from './BookClip';
import style from './index.module.scss';
const maxBookClip = 4;
const Index = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const books = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      color: 'red',
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      color: 'blue',
    },
    {
      id: 3,
      title: 'Book 3',
      author: 'Author 3',
      color: 'green',
    },
    {
      id: 4,
      title: 'Book 4',
      author: 'Author 4',
      color: 'yellow',
    },
  ];
  const handleBookClipClick = (index: number, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.dataset.ignore) {
      return index < maxBookClip - 1 && setActiveIndex(index);
    }
    setActiveIndex(index);
  };
  const handleClickOutside = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let target = e.target as HTMLElement;
    while (target) {
      if (target.dataset.book) {
        return;
      }
      target = target.parentElement as HTMLElement;
    }
    setActiveIndex(undefined);
  };
  return (
    <section onClick={handleClickOutside} className="w-full h-full overflow-hidden backdrop-blur">
      {books.map((book, i) => (
        <BookClip
          key={book.id}
          index={i}
          bookInfo={book}
          activeIndex={activeIndex}
          handleBookClipClick={handleBookClipClick}
        />
      ))}
      <BookBox innerClass={style.boxAnimation} activeIndex={activeIndex} />
    </section>
  );
};
export default Index;
