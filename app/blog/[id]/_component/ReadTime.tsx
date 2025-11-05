'use client';

import { ReadBook } from '@icon-park/react';
import NumberFlow from '@number-flow/react';
import { useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';

export const ReadTime = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  useEffectOnce(() => {
    const timer = setInterval(() => {
      setSecond((prev) => {
        if (prev === 59) {
          setMinute((prev) => {
            if (prev === 59) {
              setHour((prev) => prev + 1);
              return 0;
            }
            return prev + 1;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  });
  const hourNumberFlow = useMemo(() => {
    return (
      <NumberFlow
        prefix={hour < 10 ? '0' : ''}
        value={hour}
        transformTiming={{ duration: 500, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }}
        continuous
        trend={1}
      />
    );
  }, [hour]);
  const minuteNumberFlow = useMemo(() => {
    return (
      <NumberFlow
        prefix={minute < 10 ? '0' : ''}
        value={minute}
        transformTiming={{ duration: 500, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }}
        continuous
        trend={1}
      />
    );
  }, [minute]);
  const secondNumberFlow = useMemo(() => {
    return (
      <NumberFlow
        prefix={second < 10 ? '0' : ''}
        value={second}
        transformTiming={{ duration: 500, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }}
        continuous
        trend={1}
      />
    );
  }, [second]);
  const readBookComponent = useMemo(() => {
    return <ReadBook className="mr-1" theme="outline" size="20" fill="#4c4f69" />;
  }, []);
  return (
    <div className="absolute z-[9999] top-24 left-32 text-black bg-[#eaeaeb99] rounded-xl px-5 py-2 flex items-center gap-1">
      {readBookComponent}
      {hourNumberFlow}
      <span>:</span>
      {minuteNumberFlow}
      <span>:</span>
      {secondNumberFlow}
    </div>
  );
};
