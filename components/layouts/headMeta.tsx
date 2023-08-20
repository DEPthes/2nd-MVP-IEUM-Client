import Head from 'next/head';
import React from 'react';

export type HeadMetaProps = {
  metaDescription?: string;
};

export default function HeadMeta({ metaDescription }: HeadMetaProps) {
  return (
    <Head>
      <title>이:음 | 랜덤 익명 편지 서비스</title>
      <link rel='icon' href='/icons/favicon.ico' />
      <meta name='description' content={metaDescription ?? '정성이 담긴 편지의 온기를 다시 느껴보세요.'} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content='이:음 | 랜덤 익명 편지 서비스' />
      <meta property='og:description' content='정성이 담긴 편지의 온기를 다시 느껴보세요.' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={'/imgs/logo2.png'} />
      <meta property='og:article:author' content='이:음 | 랜덤 익명 편지 서비스' />
    </Head>
  );
}
