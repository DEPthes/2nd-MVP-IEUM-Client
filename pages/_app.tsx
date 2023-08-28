import '@/styles/globals.css';
import AppQueryClientProvider from '@/components/appQueryClientProvider';
import AlertView from '@/components/modal/alertView';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppQueryClientProvider>
        <AlertView />
        <Component {...pageProps} />
        <Analytics />
      </AppQueryClientProvider>
    </RecoilRoot>
  );
}
