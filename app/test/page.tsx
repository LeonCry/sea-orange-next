import { Suspense } from 'react';

async function waitReturn(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}

const Page = async () => {
  return (
    <>
      <p>你好...</p>
      <div className=' w-40 h-40 box-trigger border ml-96 mt-96'></div>
    </>
  );
};
export default Page;
