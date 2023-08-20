import React, { useState } from 'react';
import PasswordPassword from '../components/pages/password/password-Password';
import Layout from '@/components/layouts/layout';
import AuthEmail from '@/components/authEmail';

const ResetPassword = () => {
  const [component, setComponent] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState<string>('');

  return (
    <Layout onlyAccess='notUser'>
      {component === 'email' && (
        <AuthEmail
          screenType='reset-password'
          title={<h1 className='text-primary text-center font-heading--lg mb-24'>비밀번호 재설정</h1>}
          moveNextPage={() => setComponent('password')}
          setEmail={setEmail}
        />
      )}
      {component === 'password' && <PasswordPassword email={email} />}
    </Layout>
  );
};

export default ResetPassword;
