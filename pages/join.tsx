import React, { useState } from 'react';
import JoinPassword from '@/components/pages/join/join-Password';
import Layout from '@/components/layouts/layout';
import AuthEmail from '@/components/authEmail';

const Join = () => {
  const [page, setPage] = useState<'Email' | 'Password'>('Password');
  const [email, setEmail] = useState<string>('');

  return (
    <Layout onlyAccess='notUser'>
      {page === 'Email' && (
        <AuthEmail
          title={
            <>
              <h1 className='text-primary text-center font-heading--lg mb-16'>간편가입</h1>
              <h4 className='text-primary text-center font-label--sm'>로그인 시 사용할 이메일을 입력해주세요.</h4>
              <h4 className='text-primary text-center font-label--sm mb-24'>
                이메일은 회원가입 후 변경하실 수 없으니 신중하게 입력해주세요.
              </h4>
            </>
          }
          moveNextPage={() => setPage('Password')}
          setEmail={setEmail}
        />
      )}
      {page === 'Password' && <JoinPassword email={email} />}
    </Layout>
  );
};

export default Join;
