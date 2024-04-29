'use client';
import usePreloadImages from '@/hooks/usePreloadImages';
import { useRef, useState } from 'react';
const Index = () => {
  const [imageUrl, setImageUrl] = useState('https://s2.loli.net/2024/04/29/l1EgJNeL2qxCdAv.jpg');
  const allImages = useRef([
    'https://s2.loli.net/2024/04/29/2wWthGerapL6nYN.jpg',
    'https://s2.loli.net/2024/04/29/iJER1aKzymgtcBU.jpg',
    'https://s2.loli.net/2024/04/29/zkPYOCxmEJsyT1p.jpg',
    'https://s2.loli.net/2024/04/29/l1EgJNeL2qxCdAv.jpg',
  ]);
  const changeImageUrl = () => {
    const image = allImages.current.shift();
    if (!image) return;
    setImageUrl(image);
  };
  const { process, total } = usePreloadImages(allImages.current);
  return (
    <section>
      <button className=" absolute right-20 z-10" onClick={changeImageUrl}>
        change
      </button>
      <picture>
        <img src={imageUrl} alt="pic" />
      </picture>
      <span>
        loading: {process} / {total}
      </span>
    </section>
  );
};

export default Index;
