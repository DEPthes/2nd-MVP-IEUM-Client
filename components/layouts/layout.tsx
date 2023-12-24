import React from 'react';
import Header from './header';
import HeadMeta, { HeadMetaProps } from './headMeta';
import OnlyUser from './onlyUser';
import OnlyNotUser from './onlyNotUser';
import { useRouter } from 'next/router';

type LayoutProps = {
  onlyAccess?: 'user' | 'notUser' | 'all';
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps & HeadMetaProps> = ({ metaDescription, onlyAccess = 'all', children }) => {
  const router = useRouter();
  // 로그인 페이지인지
  const isLoginOrJoinPage = router.pathname == '/login' || router.pathname == '/join';
  return (
    <>
      <HeadMeta {...{ metaDescription }} />
      <Header onlyLogo={isLoginOrJoinPage} />
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
