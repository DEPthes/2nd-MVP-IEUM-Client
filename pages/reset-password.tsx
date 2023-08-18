import React, { useState } from 'react';
import PasswordEmail from '../components/pages/password/password-Email';
import PasswordPassword from '../components/pages/password/password-Password';
import OnlyNotUser from '@/components/layouts/onlyNotUser';

const ResetPassword = () => {
  const [component, setComponent] = useState('Auth');
  return (
    <OnlyNotUser>
      {component === 'Auth' ? (
        <PasswordEmail moveNextPage={() => setComponent('Email')} />
      ) : component === 'Email' ? (
        <PasswordPassword />
      ) : (
        ''
      )}
    </OnlyNotUser>
  );
};

export default ResetPassword;
