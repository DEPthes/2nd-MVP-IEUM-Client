import useApiError from '@/hooks/custom/useApiError';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

export default function AppQueryClientProvider({ children }: { children: React.ReactNode }) {
  // next.js는 페이지 전환마다 _app.tsx가 렌더링되므로 queryClient가 재선언되지 않게 useState로 관리
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: 'always',
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
