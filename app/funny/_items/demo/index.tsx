'use client';

import BookBox from './BookBox';
import BookClip from './BookClip';

const Index = () => {
  return (
    <section className="w-full h-full overflow-hidden backdrop-blur">
      <BookClip />
      <BookBox />
    </section>
  );
};
export default Index;
