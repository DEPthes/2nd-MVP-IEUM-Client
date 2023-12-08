import Head from 'next/head';
import React from 'react';

export type HeadMetaProps = {
  metaDescription?: string;
};

export default function HeadMeta({ metaDescription }: HeadMetaProps) {
  return (
    <Head>
      <title>이:음 | 랜덤 익명 편지 서비스</title>
      <link rel='icon' href={'/icons/favicon.ico'} />
      <link rel='canonical' href='https://ieum.depth-mju.co.kr' />
      <meta name='description' content={metaDescription ?? '정성이 담긴 편지의 온기를 다시 느껴보세요.'} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content='이:음 | 랜덤 익명 편지 서비스' />
      <meta property='og:description' content='정성이 담긴 편지의 온기를 다시 느껴보세요.' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={'/imgs/image.png'} />
      <meta property='og:article:author' content='이:음 | 랜덤 익명 편지 서비스' />
      <meta name='naver-site-verification' content='a3724ba507e92040a2f68997a8967b6e11d94836' />
      <meta name='google-site-verification' content='XIaRQEwciTKFV8e8Ezrgswd0vukQbHcQO6Vt2I-fwtk' />
    </Head>
  );
}
