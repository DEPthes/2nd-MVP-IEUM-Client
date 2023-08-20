import Layout from '@/components/layouts/layout';
import { useRouter } from 'next/router';
import useLetterQuery from '@/hooks/queries/useLetterQuery';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { LETTERS_QUERY_KEY } from '@/hooks/queries/useLettersQuery';

export default function Letters() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const letterId = Number(router.query.id);
  const { letter, isLoading } = useLetterQuery(letterId);

  // 편지 읽음 성공 시 우체통 페이지에도 읽음 처리를 위해 캐시 무효화
  useEffect(() => {
    if (letter) {
      queryClient.invalidateQueries(LETTERS_QUERY_KEY);
    }
  }, [letter, queryClient]);

  return (
    <Layout>
      {isLoading ? (
        <div></div>
      ) : (
        <main className='flex justify-center px-24 py-40 tablet:px-32 tablet:py-56 desktop:px-64 desktop:py-64'>
          <div className='w-334 tablet:w-900 desktop:w-[1280px]'>
            <div className='flex items-center self-stretch w-full p-12 rounded-10 outline-none bg-letter_bg text-hover font-letter--title'>
              {letter?.title}
            </div>
            <div className='flex items-start self-stretch w-full min-h-440 mt-16 py-8 px-12 rounded-10 outline-none bg-letter_bg text-hover resize-none font-letter--content'>
              {letter?.contents}
            </div>
            <div className='float-right font-label--sm mt-8 text-primary'>
              &apos;{letter?.senderNickname === null ? <u>GPT</u> : <u>{letter?.senderNickname}</u>}&apos;의 편지
            </div>
            <div className='flex justify-center items-center mt-72 w-full'>
              <button
                className='w-130 py-6 mr-16 justify-center items-center border-primary rounded-10 border-1 text-tertiary bg-primary gap-4 font-label--md hover:border-hover hover:bg-hover disabled:bg-[#707070] disabled:border-[#707070]'
                type='button'
                onClick={() =>
                  router.push(
                    { pathname: `/letter/${letterId}/response`, query: { name: letter?.senderNickname } },
                    `${letterId}/response`,
                  )
                }
              >
                답장하기
              </button>
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
}
