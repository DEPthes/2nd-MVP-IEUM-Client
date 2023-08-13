import { useEffect, useState } from 'react';

export default function useMediaQuery({ minWidth, maxWidth }: { minWidth?: number; maxWidth?: number }) {
  if (!minWidth && !maxWidth) {
    throw new Error('useMediaQuery() hook에 minWidth와 maxWidth 중 하나는 전달해야 합니다.');
  }
  const [matches, setMatches] = useState<boolean>();
  const minWidthString = minWidth ? `(min-width: ${minWidth}px)` : '';
  const maxWidthString = maxWidth ? `(max-width: ${maxWidth}px)` : '';
  const andString = minWidth && maxWidth ? ' and ' : '';
  const mediaQueryString = `${minWidthString}${andString}${maxWidthString}`;

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(!!mediaQueryList.matches);
    listener();
    mediaQueryList.addEventListener('change', listener); // updated from .addListener
    return () => mediaQueryList.removeEventListener('change', listener); // updated from .removeListener
  });

  return matches;
}
