import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../layouts/layout';
import CompleteImg from '../../public/imgs/complete.svg';

const ResponseComplete: React.FC = () => {
  const router = useRouter();

  return (
    <Layout onlyAccess='user'>
      <main className='px-24 py-40 tablet:px-32 tablet:py-56 desktop:px-64 desktop:py-64'>
        <div className='mt-115 text-center'>
          <div className='flex justify-center'>
            <CompleteImg />
          </div>
          <p className='mt-24 text-primary text-center font-heading--md'>발송이 완료 되었어요!</p>
          <p className='mt-4 text-primary text-center font-label--md'>받은 편지를 확인하러 우체통으로 이동해볼까요?</p>
          <button
            className='mt-30 w-342 h-50 px-12 py-8 border-primary rounded-10 text-tertiary bg-primary gap-4 font-label--md hover:bg-hover'
            type='button'
            onClick={() => router.push('/letter/all')}
          >
            우체통으로 이동하기
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default ResponseComplete;
