import React from 'react';
import Header from './header';
import HeadMeta, { HeadMetaProps } from './headMeta';
import OnlyUser from './onlyUser';
import OnlyNotUser from './onlyNotUser';

type LayoutProps = {
  onlyAccess?: 'user' | 'notUser' | 'all';
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps & HeadMetaProps> = ({
  metaTitle,
  metaDescription,
  onlyAccess = 'all',
  children,
}) => {
  return (
    <>
      <HeadMeta {...{ metaTitle, metaDescription }} />
      <Header />
      <div className='pt-78'>
        <div className='h-full'>
          {onlyAccess === 'user' && <OnlyUser>{children}</OnlyUser>}
          {onlyAccess === 'notUser' && <OnlyNotUser>{children}</OnlyNotUser>}
          {onlyAccess === 'all' && children}
        </div>
      </div>
    </>
  );
};

export default Layout;
