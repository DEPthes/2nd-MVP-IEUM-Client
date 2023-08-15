import useUser from '@/hooks/queries/useUser';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUser(handleError);
  const { showAlert } = useAlert();
  const router = useRouter();
  function handleError() {
    showAlert({
      title: '로그인 다시해라',
      actions: [{ title: '넵 죄송합니다.', style: 'primary', handler: () => router.replace('/login') }],
    });
  }
  // if (isError) {
  //   console.log('hi');
  //   // alert('로그인해라');
  //
  // }
  return <>{children}</>;
}
