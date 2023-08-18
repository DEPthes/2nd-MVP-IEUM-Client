import React, { useState } from 'react';
import PasswordEmail from '../components/pages/password/password-Email';
import PasswordPassword from '../components/pages/password/password-Password';
import OnlyNotUser from '@/components/layouts/onlyNotUser';
import Layout from '@/components/layouts/layout';

const ResetPassword = () => {
  const [component, setComponent] = useState('Auth');
  const [email, setEmail] = useState<string>('');

  return (
    <Layout onlyAccess='notUser'>
      {component === 'Auth' && <PasswordEmail moveNextPage={() => setComponent('Email')} setEmail={setEmail} />}
      {component === 'Email' && <PasswordPassword email={email} />}
    </Layout>
  );
};

export default ResetPassword;
