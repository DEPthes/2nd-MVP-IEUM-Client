import { RefObject } from 'react';

export function scrollIntoViewWithOffset<T>(
  ref: RefObject<HTMLElement>,
  { top, bottom }: { top?: number; bottom?: number },
) {
  if (top && bottom) {
    throw new Error('top과 bottom을 동시에 설정할 수 없습니다.');
  }
  if (ref.current && window) {
    const elementRect = ref.current.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const middle = absoluteElementTop - (top || 0) + (bottom || 0);
    window.scrollTo({
      top: middle,
      behavior: 'smooth',
    });
  }
}
