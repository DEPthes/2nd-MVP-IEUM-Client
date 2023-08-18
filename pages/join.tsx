import React, { useState } from 'react';

import Header from '../components/layouts/header';
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
    <main>
      <Header />
      <div className='flex flex-col items-center desktop:py-64 tablet:py-56'>
        {page === 'Email' && <JoinEmail joinChangeHandler={joinChangeHandler} />}
        {page === 'Password' && <JoinPassword email={email} />}
      </div>
    </main>
  );
};

export default Join;
