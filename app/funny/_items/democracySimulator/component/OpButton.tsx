import { memo } from 'react';

const OpButton = memo(
  ({ title }: { title: string }) => {
    return (
      <>
        <button className=" flex-1 cursor-none border-2 border-zinc-600 p-2 text-yellow-400 hover:bg-yellow-500 hover:text-zinc-800 hover:border-gray-200">
          {title}
        </button>
      </>
    );
  },
  (p, n) => p.title !== n.title
);
OpButton.displayName = 'OpButton';
export default OpButton;
