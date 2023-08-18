import React, { useState } from 'react';

import Header from '../components/layouts/header';
import JoinEmail from '@/components/pages/join/join-Email';
import JoinPassword from '@/components/pages/join/join-Password';
import Layout from '@/components/layouts/layout';

const Join = () => {
  const [page, setPage] = useState<'Email' | 'Password'>('Email');
  const [email, setEmail] = useState<string>('');

  const joinChangeHandler = (email: string) => {
    setPage('Password');
    setEmail(email);
  };

  return (
    <Layout onlyAccess='notUser'>
      <div className='flex flex-col items-center'>
        {page === 'Email' && <JoinEmail joinChangeHandler={joinChangeHandler} />}
        {page === 'Password' && <JoinPassword email={email} />}
      </div>
    </Layout>
  );
};

export default Join;
