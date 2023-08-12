import React, { useState } from 'react';
import PasswordEmail from '../../components/pages/password/password-Email';
import PasswordPassword from '../../components/pages/password/password-Password';

const Password = () => {
  const [component, setComponent] = useState('Auth');

  const passwordChangeHandler = () => {
    setComponent('Email');
  };
  return (
    <div>
      {component === 'Auth' ? (
        <PasswordEmail passwordChangeHandler={passwordChangeHandler} />
      ) : component === 'Email' ? (
        <PasswordPassword />
      ) : (
        ''
      )}
    </div>
  );
};

export default Password;
