import React, { useState } from 'react';

import JoinEmail from '@/components/pages/join/join-Email';
import JoinPassword from '@/components/pages/join/join-Password';

const Join = () => {
  const [component, setComponent] = useState('Auth');

  const joinChangeHandler = () => {
    setComponent('Email');
  };
  return (
    <div>
      {component === 'Auth' ? (
        <JoinEmail joinChangeHandler={joinChangeHandler} />
      ) : component === 'Email' ? (
        <JoinPassword />
      ) : (
        ''
      )}
    </div>
  );
};

export default Join;
