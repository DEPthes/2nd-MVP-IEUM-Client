import ieumAxios from '@/apis/ieumAxios';
import { authToken } from '@/class/authToken';
import AlertView from '@/components/modal/alertView';
import useApiError from '@/hooks/custom/useApiError';
import '@/styles/globals.css';
import axios, { AxiosError } from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  const { handlerError } = useApiError();
  // next.js는 페이지 전환마다 _app.tsx가 렌더링되므로 queryClient가 재선언되지 않게 useState로 관리
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: 'always',
            onError: (err) => handlerError(err as AxiosError),
          },
        },
      }),
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AlertView />
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
