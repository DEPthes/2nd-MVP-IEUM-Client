import { LetterType } from '@/apis/getLetters';
import Layout from '@/components/layouts/layout';
import OnlyUser from '@/components/layouts/onlyUser';
import Mailbox from '@/components/pages/letter/mailbox';
import useLettersQuery from '@/hooks/queries/useLettersQuery';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function All() {
  const [letterType, setLetterType] = useState<LetterType>('unread');
  const { letters } = useLettersQuery(letterType);
  const router = useRouter();
  function forwardletter(letterId: number) {
    router.push(`/letter/${letterId}`);
  }

  const mailBoxs = letters?.map((letter) => {
    const modifiedDate = new Date(letter.modifiedAt);
    const formattedDate = modifiedDate.toLocaleDateString();
    const formattedTime = modifiedDate
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(/^(\d+):(\d+)\s?(\w+)$/, (match, hour, minute, period) => {
        return `${period} ${hour}:${minute}`;
      });

    return (
      <Mailbox
        key={letter.letterId}
        letterId={letter.letterId}
        nickname={letter.senderNickname}
        title={letter.title}
        day={formattedDate}
        time={formattedTime}
        onMailClick={() => forwardletter(letter.letterId)}
      />
    );
  });

  return (
    <OnlyUser>
      <Layout>
        <div className='flex justify-start items-center flex-col bg-[#FFFCF7] w-354 h-630 px-24 py-40 tablet:w-836 tablet:h-731 tablet:px-32 tablet:py-56 desktop:px-64 desktop:py-64 desktop:w-1152 desktop:h-986'>
          <div className='flex w-354 h-630 flex-col gap-46 items-center tablet:w-836 tablet:h-731 desktop:w-1152 desktop:h-986'>
            <div className='font-bold text-2xl line-height: 2.5rem text-[#675149]'>우체통</div>
            <div className='flex w-354 h-40 gap-30 items-center tablet:w-284 tablet:h-40  tablet:justify-start desktop:w-1152 desktop:h-40'>
              <button
                onClick={() => setLetterType('unread')}
                className='w-114 h-32 px-8 py-4 justify-center text-[16px] text-[#675149] hover:text-[#FFFCF7] gap-4 items-center border-2 border-[#675149] rounded-10 hover:bg-[#675149] tablet:w-114 tablet:h-32 desktop:w-114 desktop:h-32'
              >
                안 읽은 편지
              </button>
              <button
                type='button'
                onClick={() => setLetterType('read')}
                className='w-130 h-40 px-8 py-4 justify-center text-[16px] text-[#675149] hover:text-[#FFFCF7] gap-4 items-center border-2 border-[#675149] rounded-10 hover:bg-[#675149] tablet:w-114 tablet:h-32 desktop:w-114 desktop:h-32'
              >
                읽음 편지
              </button>
            </div>
            <div className='flex w-1152 h-814 flex-col gap-16 items-center'>{mailBoxs}</div>
          </div>
        </div>
      </Layout>
    </OnlyUser>
  );
}
