'use client';
import GrowTree from './GrowTree';
const BackView = () => {
  return (
    <main className="fixed top-0 w-full h-full overflow-hidden bg-base-bg-color -z-10 blur-[1px]">
      <GrowTree />
    </main>
  );
};

export default BackView;
