import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Layout from '@/components/layouts/layout';
import Mailbox from '@/components/pages/letter/mailbox';
import useLettersQuery from '@/hooks/queries/useLettersQuery';
import { LetterType } from '@/apis/getLetters';
import LoadingIcon from '../../public/icons/loading2.svg';

export default function All() {
  const router = useRouter();
  const [letterType, setLetterType] = useState<LetterType>('unread');
  const {
    letters,
    isLoading: isLettersLoading,
    getNextLetters,
    getLettersIsSuccess,
    hasNextPage,
  } = useLettersQuery({ type: letterType, page: 0, size: 20 });

  const [scrollRef, inView] = useInView();

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
        onMailClick={() => router.push(`/letter/${letter.letterId}`)}
      />
    );
  });

  useEffect(() => {
    console.log(hasNextPage);
    if (inView && hasNextPage) {
      getNextLetters();
    }
  }, [inView, hasNextPage, getNextLetters]);

  return (
    <Layout onlyAccess='user'>
      <main className='flex justify-center px-24 py-40 tablet:px-32 tablet:py-56 desktop:px-64 desktop:py-64'>
        <div className='flex flex-col justify-center '>
          <div className='flex w-354 flex-col gap-46 items-center tablet:w-836 desktop:w-1152'>
            <div className='font-heading--md text-primary tablet:font-heading--lg desktop:font-heading--xl'>우체통</div>
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
            <div className='flex flex-col gap-24 items-center'>
              {letters && mailBoxs}
              {isLettersLoading && <LoadingIcon />}
              <div ref={scrollRef}></div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
