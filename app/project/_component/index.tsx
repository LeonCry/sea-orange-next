'use client';
import { useEffect, useMemo, useState } from 'react';
import BookBox from './BookBox';
import BookClip from './BookClip';
import style from './index.module.scss';
import type { BookType } from '../page';
import { useEffectOnce } from 'react-use';
const maxBookClip = 4;
const randomColor = [
  { bg: '#e3b4b8', text: '#7a7374' },
  { bg: '#b598a1', text: '#381924' },
  { bg: '#c08eaf', text: '#411c35' },
  { bg: '#e2e1e4', text: '#525288' },
  { bg: '#a7a8bd', text: '#2e317c' },
  { bg: '#93b5cf', text: '#15559a' },
  { bg: '#baccd9', text: '#495c69' },
  { bg: '#b0d5df', text: '#1781b5' },
  { bg: '#c6e6e8', text: '#126e82' },
  { bg: '#57c3c2', text: '#248067' },
  { bg: '#83cbac', text: '#1a6840' },
  { bg: '#a4cab6', text: '#207f4c' },
  { bg: '#b9dec9', text: '#3c9566' },
  { bg: '#add5a2', text: '#41b349' },
  { bg: '#e2e7bf', text: '#5bae23' },
  { bg: '#e9ddb6', text: '#867018' },
  { bg: '#f7e8aa', text: '#b78d12' },
  { bg: '#f7de98', text: '#d9a40e' },
  { bg: '#f7da94', text: '#eaad1a' },
  { bg: '#f9cb8b', text: '#ff9900' },
  { bg: '#f8c387', text: '#fc8c23' },
  { bg: '#cfccc9', text: '#4a4035' },
  { bg: '#f7cdbc', text: '#fa5d19' },
];
const getRandomColor = () => {
  const shuffledArray = randomColor.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, 4);
};
const Index = ({ books }: { books: BookType[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  // 每maxBookClip(4)个成一组
  const bookArr = useMemo(() => {
    return books.reduce((acc, book, index) => {
      if (index % maxBookClip === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(book);
      return acc;
    }, [] as any[]);
  }, [books]);
  const [page, setPage] = useState(0);
  const [isBookHidden, setIsBookHidden] = useState(false);
  const currentBooks: any[] = bookArr[page];
  const handleBookClipClick = (index: number) => {
    setActiveIndex(index);
  };
  const handleClickOutside = (e: MouseEvent) => {
    let target = e.target as HTMLElement;
    while (target) {
      if (target.dataset.book) {
        return;
      }
      target = target.parentElement as HTMLElement;
    }
    setActiveIndex(undefined);
  };
  useEffectOnce(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
  const [rColor, setRColor] = useState<{ bg: string; text: string }[]>([]);
  useEffect(() => {
    setRColor([...getRandomColor()]);
  }, [page]);
  return (
    <section className="w-full h-full overflow-hidden backdrop-blur-[0px]">
      {currentBooks.map((book, i) => (
        <BookClip
          key={book.id}
          index={i}
          bookInfo={book}
          activeIndex={activeIndex}
          handleBookClipClick={handleBookClipClick}
          isBookHidden={isBookHidden}
          rColor={rColor[i]}
        />
      ))}
      <BookBox
        innerClass={style.boxAnimation}
        activeIndex={activeIndex}
        setPage={setPage}
        currentPage={page}
        maxPage={bookArr.length - 1}
        setIsBookHidden={setIsBookHidden}
      />
    </section>
  );
};
export default Index;
