import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProfileIcon from '../../public/icons/profile.svg';
import Hamburger from '../hamburger';
import useIeumMediaQuery from '@/hooks/useIeumMediaQuery';

const Header = () => {
  const router = useRouter();
  const user = true;
  const { isDesktop, isTablet, isMobile } = useIeumMediaQuery();
  console.log(isDesktop, isTablet, isMobile);

  return (
    <nav className='fixed w-full h-78 flex justify-between items-center z-header px-28 desktop:px-218'>
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
          <Link href={'/'} className=' font-label--md text-primary'>
            우체통
          </Link>
          <Link href={'/'} className=' font-label--md text-primary'>
            편지 쓰기
          </Link>
        </div>
      )}

      {/* 헤더 오른쪽 부분 */}
      <div className='flex justify-center items-center gap-14'>
        {(isMobile || isTablet) && (
          <button>
            <Hamburger className='w-24' />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ProfileIcon width='32' height='32' />
        </button>
      </div>
    </nav>
  );
};

export default Header;
