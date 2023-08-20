import useUserQuery from '@/hooks/queries/useUserQuery';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

// letter/:id
// letter/new
// letter/all
// letter/[id]/response

// 페이지마다 접근 불가 메세지가 다름
function getErrorMsg(pathname: string) {
  ///letter/new
  if (pathname === '/letter/new' || pathname === '/letter/[id]/response') {
    return '로그인하고 편지를 작성해보세요!';
  }

  // /letter/*
  if (/^\/letter\/.*$/.test(pathname)) {
    return '로그인하고 우체통을 확인해보세요!';
  }
  return '로그인 후 이용할 수 있습니다.';
}

export default function OnlyUser({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUserQuery();
  const { showAlert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      showAlert({
        title: getErrorMsg(router.pathname),
        actions: [
          { title: '로그인하기', style: 'primary', handler: () => router.replace('/login') },
          { title: '닫기', style: 'tertiary', handler: () => router.replace('/') },
        ],
      });
    }
  }, [isError, showAlert, router]);
  return user ? children : null;
}
