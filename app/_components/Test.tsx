'use client';
import { useState } from 'react';
const Test = () => {
  let [count, setCount] = useState(0);

  return (
    <h1 className="h-10 w-10 ml-24 bg-red-50" onClick={() => setCount(++count)}>
      {count}
    </h1>
  );
};

export default Test;
