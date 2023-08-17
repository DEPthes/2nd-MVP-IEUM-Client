import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileIcon from '../../public/icons/profile.svg';
import Hamburger from '../hamburger';
import useIeumMediaQuery from '@/hooks/custom/useIeumMediaQuery';
import useAlert from '@/recoil/alert/useAlert';
import useUserQuery from '@/hooks/queries/useUserQuery';

const Header = () => {
  const router = useRouter();
  const { user } = useUserQuery();
  const { showAlert } = useAlert();
  const { isDesktop, isTablet, isMobile } = useIeumMediaQuery();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showProfileIconMenu, setShowProfileIconMenu] = useState(false);

  //TODO: 로그아웃
  function handleLogout() {}
  //TODO: 계정 삭제
  function handleDeleteUser() {}

  function showLogoutAlert() {
    showAlert({
      title: '로그아웃하시겠어요?',
      actions: [
        { title: '네', style: 'tertiary', handler: handleLogout },
        { title: '아니요', style: 'primary', handler: null },
      ],
    });
  }

  function handleClickProfileIcon(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (user) {
      e.stopPropagation();
      setShowHamburgerMenu(false);
      setShowProfileIconMenu((prev) => !prev);
    } else {
      router.push('/login');
    }
  }

  useEffect(() => {
    function closeIconMenus() {
      setShowHamburgerMenu(false);
      setShowProfileIconMenu(false);
    }
    document.body.addEventListener('click', closeIconMenus);
    return () => document.body.removeEventListener('click', closeIconMenus);
  });

  return (
    <nav className='fixed w-full h-78 flex justify-between items-center z-header bg-tertiary px-28 desktop:px-218'>
      {/* 헤더 왼쪽 부분 */}
      {(isMobile || isTablet) && (
        <Link href={'/'} className=' relative w-63 h-42'>
          <Image src={'/imgs/logo1.jpg'} alt='logo' layout='fill' objectFit='cover' />
        </Link>
      )}

      {isDesktop && (
        <div className='flex items-center gap-40'>
          <Link href={'/'} className=' relative w-63 h-42'>
            <Image src={'/imgs/logo1.jpg'} alt='logo' layout='fill' objectFit='cover' />
          </Link>
          <Link href={'/'} className=' font-label--md text-primary'>
            서비스 소개
          </Link>
          <Link href={'/'} className=' font-label--md text-primary'>
            사용 방법
          </Link>
          <Link href={'/letter/all'} className=' font-label--md text-primary'>
            우체통
          </Link>
          <Link href={'/letter/new'} className=' font-label--md text-primary'>
            편지 쓰기
          </Link>
        </div>
      )}

      {/* 헤더 오른쪽 부분 */}
      <div className='flex justify-center items-center gap-14'>
        {(isMobile || isTablet) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileIconMenu(false);
              setShowHamburgerMenu((prev) => !prev);
            }}
          >
            <Hamburger className='w-24' />
          </button>
        )}
        <button onClick={handleClickProfileIcon}>
          <ProfileIcon width='32' height='32' />
        </button>
        {showHamburgerMenu && (
          <div className=' absolute bg-tertiary top-78 right-71 w-71'>
            <button onClick={() => router.push('/letter/new')} className=' py-4 px-8 text-primary font-label--md'>
              편지작성
            </button>
            <button className=' py-4 px-8 text-primary font-label--md'>우체통</button>
          </div>
        )}
        {showProfileIconMenu && (
          <div className=' absolute bg-tertiary top-78 right-0 w-71'>
            <button onClick={showLogoutAlert} className=' py-4 px-8 text-primary font-label--md'>
              로그아웃
            </button>
            <button className=' py-4 px-8 text-primary font-label--md'>계정삭제</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
