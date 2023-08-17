import React, { useState } from 'react';

import JoinEmail from '@/components/pages/join/join-Email';
import JoinPassword from '@/components/pages/join/join-Password';

const Join = () => {
  const [page, setPage] = useState<'Email' | 'Password'>('Email');
  const [email, setEmail] = useState<string>('');

  const joinChangeHandler = (email: string) => {
    setPage('Password');
    setEmail(email);
  };
  return (
    <div>
      {page === 'Email' && <JoinEmail joinChangeHandler={joinChangeHandler} />}
      {page === 'Password' && <JoinPassword email={email} />}
    </div>
  );
};

export default Join;
