import { Suspense } from 'react';

async function waitReturn(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}
const AsyncComponent = async () => {
  await waitReturn(30);
  return <div>CLSX...</div>;
};

const Page = async () => {
  return (
    <>
      <p>你好...</p>
      <Suspense fallback={<p>loading...</p>}>
        <AsyncComponent />
      </Suspense>
    </>
  );
};
export default Page;
