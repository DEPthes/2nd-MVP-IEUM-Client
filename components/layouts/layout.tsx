import React from 'react';
import Header from './header';
import HeadMeta, { HeadMetaProps } from './headMeta';
import OnlyUser from './onlyUser';

interface Props extends HeadMetaProps {
  onlyUser?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ metaTitle, metaDescription, onlyUser, children }) => {
  return (
    <>
      <HeadMeta {...{ metaTitle, metaDescription }} />
      <Header />
      <div className='pt-78 min-h-screen'>
        <div className='px-24 py-40 tablet:px-32 tablet:py-56 desktop:px-64 desktop:py-64'>
          {/* {onlyUser ? <OnlyUser>{children}</OnlyUser> : children} */}
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
