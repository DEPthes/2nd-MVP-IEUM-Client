import { HTMLAttributes } from 'react';
import { useMediaQuery } from 'react-responsive';

interface MediaQueryProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Desktop({ children, ...props }: MediaQueryProps) {
  return useMediaQuery({ minWidth: 1136 }) ? <div {...props}>{children}</div> : null;
}
export function Tablet({ children, ...props }: MediaQueryProps) {
  return useMediaQuery({ minWidth: 600, maxWidth: 1135 }) ? <div {...props}>{children}</div> : null;
}
export function Mobile({ children, ...props }: MediaQueryProps) {
  return useMediaQuery({ maxWidth: 599 }) ? <div {...props}>{children}</div> : null;
}

interface IeumMediaQueryProps extends HTMLAttributes<HTMLDivElement> {
  desktop?: boolean;
  tablet?: boolean;
  mobile?: boolean;
  children: React.ReactNode;
}

export function IeumMediaQuery({ desktop, tablet, mobile, children, ...props }: IeumMediaQueryProps) {
  const isDesktop = useMediaQuery({ minWidth: 1136 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1135 });
  const isMobile = useMediaQuery({ maxWidth: 599 });

  if ((desktop && isDesktop) || (tablet && isTablet) || (mobile && isMobile)) {
    return <div {...props}>{children}</div>;
  }
  return null;
}
