'use client';
import GrowTree from './GrowTree';
const BackView = () => {
  return (
    <main className=" absolute top-0 w-full h-full bg-base-bg-color -z-10 blur-[1px]">
      <GrowTree />
    </main>
  );
};

export default BackView;
