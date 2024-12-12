'use client';
import { useDeferredValue, useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';
const Index = () => {
  const [count, setCount] = useState(0);
  const [light, setLight] = useState(false);
  const oldCount = useDeferredValue(count);
  const fetchData = () => {
    console.log('data', count, light);
  };
  useEffect(() => {
    let i = 0;
    console.log('finish');
  }, [count]);
  return (
    <section>
      <button className="border" onClick={() => setCount(count + 1)}>
        count + 1
      </button>
      <br />
      <span>count:{count}</span>
      <br />
      <span>oldCount:{oldCount}</span>
      <br />
      <button className="border" onClick={() => setLight(!light)}>
        light
      </button>
      <br />
      <span>{light ? 'light' : 'dark'}</span>
      <br />
      <button className="border" onClick={fetchData}></button>
    </section>
  );
};

export default Index;
