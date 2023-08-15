import React, { useState } from 'react';

import JoinEmail from '@/components/pages/join/join-Email';
import JoinPassword from '@/components/pages/join/join-Password';

const Join = () => {
  const [page, setPage] = useState<'Email' | 'Password'>('Email');

  const joinChangeHandler = () => {
    setPage('Password');
  };
  return (
    <div>
      {page === 'Email' && <JoinEmail joinChangeHandler={joinChangeHandler} />}
      {page === 'Password' && <JoinPassword />}
    </div>
  );
};

export default Join;
