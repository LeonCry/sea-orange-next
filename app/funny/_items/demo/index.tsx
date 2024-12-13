'use client';
import {
  forwardRef,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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
  const ref = useRef<{ focus: () => void }>(null);
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
      <ExampleRef ref={ref} />
      <button className="border" onClick={() => ref.current?.focus()}>
        focus
      </button>
    </section>
  );
};

const ExampleRef = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current?.focus();
      },
    };
  });
  return <input ref={inputRef}></input>;
});
ExampleRef.displayName = 'ExampleRef';
export default Index;
