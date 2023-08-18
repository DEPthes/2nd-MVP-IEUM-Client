import React from 'react';
import { useRouter } from 'next/router';
import Letter from '@/components/pages/letter/receive';
type MailboxProps = {
  letterId: number;
  nickname: string;
  title: string;
  day: string;
  envelopType: number;
  time: string;
  onMailClick: () => void;
};

const Mailbox: React.FC<MailboxProps> = ({ envelopType, nickname, title, day, time, onMailClick }) => {
  return (
    <main onClick={onMailClick}>
      <div className='font-[KCC-eunyoung] leading-13 desktop:leading-16'>
        <div
          className='flex flex-col w-[279px] h-[130.362px] px-8 py-4 rounded-10 bg-cover bg-no-repeat bg-center cursor-pointer tablet:w-[279px] tablet:h-[130.362px] desktop:w-[410px] desktop:h-[191.572px]'
          style={{ backgroundImage: `url('/imgs/envelope${envelopType}.jpg')` }}
        >
          <p className='ml-25 mt-19 desktop:ml-34 desktop:mt-25'>letter from {nickname === null ? 'GPT' : nickname}</p>
          <p className='ml-25 desktop:ml-34'>
            <strong>{title}</strong>
          </p>
          <p className='ml-200 mt-40 desktop:ml-[320px] desktop:mt-73'>{day}</p>
          <p className='ml-200 desktop:ml-[320px]'>{time}</p>
        </div>
      </div>
    </main>
  );
};

export default Mailbox;
