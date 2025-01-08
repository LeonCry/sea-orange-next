'use client';
import BookBox from './BookBox';
import BookClip from './BookClip';
import style from './index.module.scss';
const Index = () => {
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
  return (
    <section className="w-full h-full overflow-hidden backdrop-blur">
      {books.map((book, i) => (
        <BookClip key={book.id} index={i} bookInfo={book} />
      ))}
      <BookBox innerClass={style.boxAnimation} />
    </section>
  );
};
export default Index;
