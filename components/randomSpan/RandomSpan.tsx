import { uid } from 'radash';
import { memo } from 'react';
const uuid = uid(6);
const RandomSpan = memo(() => {
  return <span className="text-gray-300 text-xs fixed right-1 bottom-1">uid:{uuid}</span>;
});
RandomSpan.displayName = 'RandomSpan';
export default RandomSpan;
