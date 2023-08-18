import React from 'react';
import { useRouter } from 'next/router';
import Letter from '@/pages/letter/receive';
type MailboxProps = {
  letterId: number;
  nickname: string;
  title: string;
  day: string;
  time: string;
  onMailClick: () => void;
};

const Mailbox: React.FC<MailboxProps> = ({ nickname, title, day, time, onMailClick }) => {
  return (
    <main onClick={onMailClick}>
      <div className='flex flex-col w-[410px] h-[191.572px] first-letter:justify-end items-end mt-10 px-8 py-4 bg-white border-black rounded-10 bg-cover bg-no-repeat bg-center'>
        <p className='mr-auto mt-20 flex items-stretch text-[10px] text-[#000] font-normal'>{nickname}</p>
        {/* 닉네임  */}
        <p className='flex items-stretch flex-col mr-auto mb-auto text-10 text-[#000] font-normal'>{title}</p>{' '}
        {/* 제목 */}
        <p className='text-[#000] text-10 flex items-stretch flex-col font-normal'>{day}</p> {/* 날짜 */}
        <p className='text-[#000] text-10 mb-10 flex items-stretch flex-col font-normal'>{time}</p> {/* 시간 */}
      </div>
    </main>
  );
};

export default Mailbox;
