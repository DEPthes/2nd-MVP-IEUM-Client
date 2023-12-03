import React, { useEffect, useState } from 'react';
import JoinPassword from '@/components/pages/join/join-Password';
import Layout from '@/components/layouts/layout';
import AuthEmail from '@/components/authEmail';
import { getNicknameFromGPT } from '@/libs/getNicknameFromGPT';

import Head from 'next/head';

const Join = () => {
  const [page, setPage] = useState<'Email' | 'Password'>('Email');
  const [email, setEmail] = useState<string>('');
  const [nicknames, setNicknames] = useState<string[]>([]);

  const moveNextPage = () => {
    setPage('Password');
  };

  const getNickname = async () => {
    const response = getNicknameFromGPT();
    setNicknames(await response);
  };

  useEffect(() => {
    getNickname();
  }, []);

  return (
    <Layout onlyAccess='notUser'>
      <Head>
        <title>이:음 | 간편가입</title>
        <meta name='description' content='정성이 담긴 편지의 온기를 느껴보세요' />
      </Head>
      {page === 'Email' && (
        <AuthEmail
          screenType='join'
          title={
            <>
              <h1 className='text-primary text-center font-heading--lg mb-16'>간편가입</h1>
              <h4 className='text-primary text-center font-label--sm'>로그인 시 사용할 이메일을 입력해주세요.</h4>
              <h4 className='text-primary text-center font-label--sm mb-24'>
                이메일은 회원가입 후 변경하실 수 없으니 신중하게 입력해주세요.
              </h4>
            </>
          }
          moveNextPage={moveNextPage}
          setEmail={setEmail}
        />
      )}
      {page === 'Password' && <JoinPassword email={email} getNicknames={nicknames} />}
    </Layout>
  );
};

export default Join;
