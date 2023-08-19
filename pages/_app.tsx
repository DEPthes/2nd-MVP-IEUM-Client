import ieumAxios from '@/apis/ieumAxios';
import { authToken } from '@/class/authToken';
import AppQueryClientProvider from '@/components/appQueryClientProvider';
import AlertView from '@/components/modal/alertView';
import useApiError from '@/hooks/custom/useApiError';
import '@/styles/globals.css';
import axios, { AxiosError } from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppQueryClientProvider>
        <AlertView />
        <Component {...pageProps} />
      </AppQueryClientProvider>
    </RecoilRoot>
  );
}
