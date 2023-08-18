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
  console.log(letters);
  const router = useRouter();
  function forwardletter(letterId: number) {
    router.push(`/letter/${letterId}`);
  }

  const mailBoxs = letters?.map((letter) => {
    const modifiedDate = new Date(letter.modifiedAt);
    const year = modifiedDate.getFullYear();
    const month = (modifiedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = modifiedDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year} ${month} ${day}`;

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
        envelopType={letter.envelopType}
        onMailClick={() => forwardletter(letter.letterId)}
      />
    );
  });

  return (
    <OnlyUser>
      <Layout>
        <main className='flex justify-center'>
          <div className='flex flex-col justify-center '>
            <div className='flex w-354 h-630 flex-col gap-46 items-center tablet:w-836 tablet:h-731 desktop:w-1152 desktop:h-986'>
              <div className='font-heading--md text-primary tablet:font-heading--lg desktop:font-heading--xl'>
                우체통
              </div>
              <div className='flex gap-30 items-center tablet:w-284 tablet:h-40  tablet:justify-start desktop:w-1152 desktop:h-40'>
                <button
                  onClick={() => setLetterType('unread')}
                  className={`w-130 h-40 px-8 py-4 justify-center font-label--md hover:text-tertiary gap-4 items-center border-1 border-primary rounded-10 hover:bg-primary ${
                    letterType === 'unread' ? 'text-tertiary bg-primary' : 'text-primary bg-tr'
                  }`}
                >
                  안 읽은 편지
                </button>
                <button
                  type='button'
                  onClick={() => setLetterType('read')}
                  className={`w-130 h-40 px-8 py-4 justify-center font-label--md hover:text-tertiary gap-4 items-center border-1 border-primary rounded-10 hover:bg-primary ${
                    letterType === 'read' ? 'text-tertiary bg-primary' : 'text-primary bg-tertiary'
                  }`}
                >
                  읽은 편지
                </button>
              </div>
              <div className='flex flex-col gap-24 items-center'>{mailBoxs}</div>
            </div>
          </div>
        </main>
      </Layout>
    </OnlyUser>
  );
}
