import { CreateCursorWith } from 'cursorwith-ts/core';
import { clickEffect, follow, hoverEffect, inverse, nativeCursor, tail } from 'cursorwith-ts/use';
let cw: CreateCursorWith | null = null;
export function createCursorWith() {
    if (cw) return cw;
    cw = new CreateCursorWith({
        style: {
            radius: 8,
            color: 'white',
            borderColor: 'black',
            borderWidth: 4,
            shadowColor: 'white',
            shadowBlur: 16,
        }
    });
    cw.use(follow({
        type: 'spring',
    }));
    cw.use(inverse());
    cw.use(clickEffect());
    cw.use(tail({
        length: 6,
        color: 'rgba(255,255,255,0.2)',
    }));
    cw.use(nativeCursor({
        radius: 2,
        color: 'black',
        borderColor: 'white',
        borderWidth: 2,
    }));
    cw.use(hoverEffect({
        scope: {
            dataset: ['hover'],
        },
        padding: 8,
        offset: 40,
        style: {
            color: 'rgba(255,255,255,1)',
            borderColor: 'rgba(255,255,255,1)',
            shadowBlur: 80,
            shadowColor: 'rgba(255,255,255,1)',
            shadowOffset: [0, 0],
        },
    }));
    return cw;
}
export function setHoverContainer(container?: HTMLElement) {
    if (!cw) createCursorWith();
    cw!.use(hoverEffect({
        scope: {
            dataset: ['hover'],
        },
        padding: 8,
        offset: 40,
        style: {
            color: 'rgba(255,255,255,1)',
            borderColor: 'rgba(255,255,255,1)',
            shadowBlur: 80,
            shadowColor: 'rgba(255,255,255,1)',
            shadowOffset: [0, 0],
        },
        container,
    }));
    return cw;
}