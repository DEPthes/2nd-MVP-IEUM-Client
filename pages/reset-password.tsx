import React, { useState } from 'react';
import PasswordEmail from '../components/pages/password/password-Email';
import PasswordPassword from '../components/pages/password/password-Password';
import OnlyNotUser from '@/components/layouts/onlyNotUser';
import Layout from '@/components/layouts/layout';
import AuthEmail from '@/components/authEmail';

const ResetPassword = () => {
  const [component, setComponent] = useState<'Auth' | 'Email'>('Email');
  const [email, setEmail] = useState<string>('');

  return (
    <Layout onlyAccess='notUser'>
      {component === 'Auth' && (
        <AuthEmail
          title={<h1 className='text-primary text-center font-heading--lg mb-24'>비밀번호 재설정</h1>}
          moveNextPage={() => setComponent('Email')}
          setEmail={setEmail}
        />
      )}
      {component === 'Email' && <PasswordPassword email={email} />}
    </Layout>
  );
};

export default ResetPassword;
