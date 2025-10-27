'use client';
import { CreateCursorWith } from 'cursorwith-ts/core';
import { useEffectOnce } from 'react-use';
import { clickEffect, follow,hoverEffect,inverse, nativeCursor, tail } from 'cursorwith-ts/use';

const Cursor = () => {
  useEffectOnce(()=>{
    const cw = new CreateCursorWith({
      style:{
        radius:16,
        color:'white',
        borderColor:'black',
        borderWidth:6,
        shadowColor:'white',
        shadowBlur:16,
      }
    });
    cw.use(follow({
      type:'time',
    }));
    cw.use(inverse());
    cw.use(clickEffect());
    cw.use(tail({
      length:6,
      color:'rgba(255,255,255,0.5)',
    }));
    cw.use(nativeCursor({
      radius:4,
      color:'black',
      borderColor:'white',
      borderWidth:2,
    }));
    cw.use(hoverEffect({
      scope:{
        dataset:['hover'],
      },
      padding:8,
      offset:40,
      style:{
        color: 'rgba(255,255,255,1)',
        borderColor: 'rgba(255,255,255,1)',
        shadowBlur: 80,
        shadowColor: 'rgba(255,255,255,1)',
        shadowOffset: [0, 0],
      }
    }));
  });
  return <></>;
};

export default Cursor;
