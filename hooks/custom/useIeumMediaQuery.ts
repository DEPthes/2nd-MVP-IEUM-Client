import useMediaQuery from './useMediaQuery';

// ieum 디자인 체계에 맞는 미디어쿼리
export default function useIeumMediaQuery() {
  const isDesktop = useMediaQuery({ minWidth: 1136 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1135.9 });
  const isMobile = useMediaQuery({ maxWidth: 599.9 });
  const isLoading = !isDesktop && !isTablet && !isMobile;

  return { isDesktop, isTablet, isMobile, isLoading };
}
