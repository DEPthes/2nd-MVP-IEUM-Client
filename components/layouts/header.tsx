import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileIcon from '../../public/icons/profile.svg';
import Hamburger from '../hamburger';
import useIeumMediaQuery from '@/hooks/custom/useIeumMediaQuery';
import useAlert from '@/recoil/alert/useAlert';
import useUserQuery, { USER_QUERY_KEY } from '@/hooks/queries/useUserQuery';
import { useMutation, useQueryClient } from 'react-query';
import { logout } from '@/apis/logout';
import { deleteUser } from '@/apis/deleteUser';
import { iconMenuDisabledUrls } from '@/libs/iconMenuDisabledUrls';
import { authToken } from '@/class/authToken';

function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isError } = useUserQuery();
  const logoutMutation = useMutation(logout);
  const deleteUserMutation = useMutation(deleteUser);
  const { showAlert } = useAlert();
  const { isDesktop, isTablet, isMobile, isLoading: beforeMount } = useIeumMediaQuery();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showProfileIconMenu, setShowProfileIconMenu] = useState(false);

  // 아이콘 메뉴 활성화 여부
  const isIconMenuAbled = !iconMenuDisabledUrls.includes(router.pathname);
  // 로그아웃
  function handleLogout() {
    // 도메인 연결 전까지는 refreshToken이 작동하지 않으므로 logout 요청 보내지 않고 새로고침만
    // logoutMutation.mutate(undefined, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(USER_QUERY_KEY);
    //     authToken.deleteToken();
    //     if (router.pathname === '/') {
    //       window.location.reload();
    //     } else {
    //       window.location.href = '/';
    //     }
    //   },
    // });
    queryClient.invalidateQueries(USER_QUERY_KEY);
    authToken.deleteToken();
    window.location.href = '/';
  }
  // 계정 삭제
  function handleDeleteUser() {
    deleteUserMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries(USER_QUERY_KEY);
        authToken.deleteToken();
        window.location.href = '/';
      },
    });
  }

  function showLogoutAlert() {
    showAlert({
      title: '로그아웃하시겠어요?',
      actions: [
        { title: '네', style: 'tertiary', handler: handleLogout },
        { title: '아니요', style: 'primary', handler: null },
      ],
    });
  }

  function showDeleteUserAlert() {
    showAlert({
      title: (
        <div className='flex flex-col items-center'>
          <span>모든 편지 기록이 삭제돼요.</span>
          <span>정말로 계정을 삭제하시겠어요?</span>
        </div>
      ),
      actions: [
        { title: '네', style: 'tertiary', handler: handleDeleteUser },
        { title: '아니요', style: 'primary', handler: null },
      ],
    });
  }

  // 상단 햄버거 아이콘 눌렀을 때
  function handleClickHamburgerIcon(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (isIconMenuAbled) {
      setShowProfileIconMenu(false);
      setShowHamburgerMenu((prev) => !prev);
    }
  }

  // 상단 사람 아이콘 눌렀을 때
  function handleClickProfileIcon(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!isIconMenuAbled) return;
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
      {(isMobile || isTablet || beforeMount) && (
        <Link href={'/'}>
          <Image src={'/imgs/logo1.png'} alt='logo' width={63} height={42} priority />
        </Link>
      )}

      {isDesktop && (
        <div className='flex items-center gap-40'>
          <Link href={'/'}>
            <Image src={'/imgs/logo1.png'} alt='logo' width={63} height={42} priority />
          </Link>
          <Link href={{ pathname: '/', hash: 'section1' }} className=' font-label--md text-primary'>
            서비스 소개
          </Link>
          <Link href={{ pathname: '/', hash: 'section2' }} className=' font-label--md text-primary'>
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
          <button onClick={handleClickHamburgerIcon} className={isIconMenuAbled ? 'cursor-pointer' : 'cursor-default'}>
            <Hamburger className='w-24' />
          </button>
        )}
        <button onClick={handleClickProfileIcon} className={isIconMenuAbled ? 'cursor-pointer' : 'cursor-default'}>
          <ProfileIcon width='32' height='32' />
        </button>
        {showHamburgerMenu && (
          <div className=' absolute bg-tertiary flex flex-col top-78 right-71 '>
            <Link href={'/letter/new'} className=' py-4 px-8 text-primary font-label--md'>
              편지작성
            </Link>
            <Link href={'/letter/all'} className=' py-4 px-8 text-primary font-label--md'>
              우체통
            </Link>
          </div>
        )}
        {showProfileIconMenu && (
          <div className=' absolute bg-tertiary flex flex-col top-78 right-4 desktop:right-194'>
            <button onClick={showLogoutAlert} className=' py-4 px-8 text-primary font-label--md'>
              로그아웃
            </button>
            <button onClick={showDeleteUserAlert} className=' py-4 px-8 text-primary font-label--md'>
              계정삭제
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
