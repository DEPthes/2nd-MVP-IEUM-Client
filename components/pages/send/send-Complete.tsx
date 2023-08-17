import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../layouts/layout';
import CompleteImg from '../../../public/imgs/complete.svg';
import ProtectedLayout from '@/components/layouts/onlyUser';

const SendComplete: React.FC = () => {
  const router = useRouter();

  return (
    //<ProtectedLayout>
    <Layout>
      <main>
        <div className='mt-139 text-center'>
          <div className='flex justify-center'>
            <CompleteImg />
          </div>
          <p className='mt-24 text-primary text-center font-heading--md'>발송이 완료 되었어요!</p>
          <p className='mt-4 text-primary text-center font-label--md'>받은 편지를 확인하러 우체통으로 이동해볼까요?</p>
          <button
            className='mt-30 px-107 py-13 justify-center items-center border-primary rounded-10 text-tertiary bg-primary gap-4 font-label--md hover:text-hover'
            type='button'
            onClick={() => router.push('/letter/all')}
          >
            우체통으로 이동하기
          </button>
        </div>
      </main>
    </Layout>
    //</ProtectedLayout>
  );
};

export default SendComplete;
