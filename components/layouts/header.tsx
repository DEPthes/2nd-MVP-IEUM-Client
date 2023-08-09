import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProfileIcon from '../../public/icons/profile.svg';
import Hamburger from '../hamburger';

const Header = () => {
  const router = useRouter();
  const user = true;

  return (
    <nav className='fixed w-full h-78 flex justify-between items-center px-20 z-header'>
      <Link href={'/'} className=' relative w-63 h-42'>
        <Image src={'/imgs/logo1.jpg'} alt='logo' layout='fill' objectFit='cover' />
      </Link>
      {user && (
        <div className='flex justify-center items-center gap-14'>
          <button>
            <Hamburger className='w-24' />
          </button>
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ProfileIcon width='32' height='32' />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
