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
      <div className='pt-78 h-screen'>
        <div className='h-full px-24 py-40 tablet:px-32 tablet:py-56 desktop:px-64 desktop:py-64'>
          {onlyAccess === 'user' && <OnlyUser>{children}</OnlyUser>}
          {onlyAccess === 'notUser' && <OnlyNotUser>{children}</OnlyNotUser>}
          {onlyAccess === 'all' && children}
        </div>
      </div>
    </>
  );
};

export default Layout;
