'use client';
import { useMemoizedFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
const Index = () => {
  const [count, setCount] = useState(0);
  const [light, setLight] = useState(false);
  const fetchData = () => {
    console.log('data', count, light);
  };
  const initFetchData = useMemoizedFn(fetchData);
  useEffectOnce(() => {
    initFetchData();
  });
  return (
    <section>
      <button className=" border" onClick={() => setCount(count + 1)}>
        count + 1
      </button>
      <br />
      <span>{count}</span>
      <br />
      <button className=" border" onClick={() => setLight(!light)}>
        light
      </button>
      <br />
      <span>{light ? 'light' : 'dark'}</span>
      <br />
      <button className=" border" onClick={fetchData}></button>
    </section>
  );
};

export default Index;
