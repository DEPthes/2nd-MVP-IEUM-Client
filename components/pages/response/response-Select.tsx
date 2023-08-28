import React, { useState } from 'react';
import Layout from '../../layouts/layout';
import { ComponentType } from '../../../pages/letter/new';
import BigCheckIcon from '../../../public/icons/bigcheck.svg';
import { useMutation } from 'react-query';
import { postSend } from '@/apis/postSend';
import { postSendGptReply } from '@/apis/postSendGptReply';
import useApiError from '@/hooks/custom/useApiError';
import useAlert from '../../../recoil/alert/useAlert';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Loading from '../../../public/icons/loading2.svg';

type SendProps = {
  componentChangeHandler: (ComponentType: ComponentType, load?: LoadType) => void;
  title: string;
  contents: string;
  load?: LoadType;
  selectId: number;
};

type LoadType = {
  id: number;
  title: string;
  contents: string;
  envelopType: number;
  letterType: string;
  senderId: number;
  receiverId: number | null;
  read: boolean;
};

const ResponseSelect: React.FC<SendProps> = ({ componentChangeHandler, title, contents, load, selectId }) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const [envelopType, setEnvelopType] = useState(1);
  const [check, setCheck] = useState({
    envelope1: true,
    envelope2: false,
    envelope3: false,
    envelope4: false,
  });

  const togglePasswordHandler = (num: number) => {
    setCheck({
      envelope1: num === 1,
      envelope2: num === 2,
      envelope3: num === 3,
      envelope4: num === 4,
    });
    setEnvelopType(num);
  };

  const { handleApiError } = useApiError();

  //편지답장 특정인에게 발송하기
  const newSendMutation = useMutation(postSend);
  const newSendHandler = () => {
    newSendMutation.mutate(
      { title, contents, envelopType, originalLetterId: selectId, letterId: load?.id, letterType: load?.letterType },
      {
        onSuccess: () => {
          componentChangeHandler('Complete');
        },
        onError: handleApiError({
          500: () =>
            showAlert({
              title: (
                <div className='flex flex-col items-center'>
                  <span>편지 보내기에 실패했습니다.</span>
                  <span>편지를 다시 보낼까요?</span>
                </div>
              ),
              actions: [
                { title: '네', style: 'primary', handler: newSendHandler },
                { title: '아니요', style: 'tertiary', handler: null },
              ],
            }),
        }),
      },
    );
  };

  //편지 답장 GPT에게 발송하기
  const newSendGptReplyMutation = useMutation(postSendGptReply);
  const newSendGptHandler = () => {
    newSendGptReplyMutation.mutate(
      { title, contents, envelopType },
      {
        onSuccess: () => {
          componentChangeHandler('Complete');
        },
        onError: handleApiError({
          500: () =>
            showAlert({
              title: (
                <div className='flex flex-col items-center'>
                  <span>편지 보내기에 실패했습니다.</span>
                  <span>편지를 다시 보낼까요?</span>
                </div>
              ),
              actions: [
                { title: '네', style: 'primary', handler: newSendGptHandler },
                { title: '아니요', style: 'tertiary', handler: null },
              ],
            }),
        }),
      },
    );
  };

  return (
    <Layout onlyAccess='user'>
      <main className='flex justify-center px-24 py-40 tablet:px-32 tablet:py-56 desktop:px-64 desktop:py-64'>
        {newSendMutation.isLoading || newSendGptReplyMutation.isLoading ? (
          <div className='mt-160'>
            <div className='ml-8 font-heading--lg text-primary'>편지를 보내고 있어요!</div>
            <Loading />
          </div>
        ) : (
          <div>
            <p className='text-primary text-center font-heading--md tablet:font-heading--lg desktop:font-heading--xl'>
              편지 봉투를 선택하세요
            </p>
            <div className='mx-51 mt-62 tablet:mx-335 font-[KCC-eunyoung] leading-10 desktop:leading-16 desktop:grid desktop:grid-cols-2 desktop:gap-x-76 desktop:gap-y-96'>
              <div
                className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
                style={{ backgroundImage: `url('/imgs/envelope1.jpg')` }}
              >
                <div
                  className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                  onClick={() => togglePasswordHandler(1)}
                >
                  {check.envelope1 ? (
                    <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                      <BigCheckIcon />
                    </div>
                  ) : (
                    ''
                  )}
                  <p className='ml-22 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                  <p className='ml-22 desktop:ml-34'>편지 제목</p>
                  <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                  <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
                </div>
              </div>
              <div
                className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
                style={{ backgroundImage: `url('/imgs/envelope2.jpg')` }}
              >
                <div
                  className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                  onClick={() => togglePasswordHandler(2)}
                >
                  {check.envelope2 ? (
                    <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                      <BigCheckIcon />
                    </div>
                  ) : (
                    ''
                  )}
                  <p className='ml-22 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                  <p className='ml-22 desktop:ml-34'>편지 제목</p>
                  <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                  <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
                </div>
              </div>
              <div
                className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
                style={{ backgroundImage: `url('/imgs/envelope3.jpg')` }}
              >
                <div
                  className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                  onClick={() => togglePasswordHandler(3)}
                >
                  {check.envelope3 ? (
                    <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                      <BigCheckIcon />
                    </div>
                  ) : (
                    ''
                  )}
                  <p className='ml-22 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                  <p className='ml-22 desktop:ml-34'>편지 제목</p>
                  <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                  <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
                </div>
              </div>
              <div
                className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
                style={{ backgroundImage: `url('/imgs/envelope4.jpg')` }}
              >
                <div
                  className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                  onClick={() => togglePasswordHandler(4)}
                >
                  {check.envelope4 ? (
                    <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                      <BigCheckIcon />
                    </div>
                  ) : (
                    ''
                  )}
                  <p className='ml-22 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                  <p className='ml-22 desktop:ml-34'>편지 제목</p>
                  <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                  <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center mt-62 w-full'>
              <button
                className='w-130 py-8 justify-center items-center border-primary rounded-10 text-tertiary bg-primary gap-4 font-label--md hover:bg-hover'
                type='button'
                onClick={router.query.name ? newSendHandler : newSendGptHandler}
              >
                발송하기
              </button>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ResponseSelect;
