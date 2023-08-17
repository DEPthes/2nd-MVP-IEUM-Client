import useUserQuery from '@/hooks/queries/useUserQuery';
import useAlert from '@/recoil/alert/useAlert';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function OnlyUser({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUserQuery();
  const { showAlert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      showAlert({
        title: '로그인 다시해라',
        actions: [{ title: '넵 죄송합니다.', style: 'primary', handler: () => router.replace('/login') }],
      });
    }
  }, [isError, showAlert, router]);
  return children;
}
